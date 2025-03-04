import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../constants/url";
import { Button, message, Table } from "antd";
import { ProductsContext } from "../contexts/product-context";

const ProductList = () => {
    const [messageApi] = message.useMessage();
    const [allProducts, setAllProducts] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [sorter, setSorter] = useState({ field: null, order: null });
    const { ids, addId, removeId } = useContext(ProductsContext);

    const fetchProducts = async (
        page = 1,
        pageSize = 10,
        sortField = null,
        sortOrder = null
    ) => {
        setLoading(true);
        try {
            const sortParam =
                sortField && sortOrder ? `&sortBy=${sortField}&order=${sortOrder}` : "";
            const { data } = await axios.get(
                `${API_URL}?limit=${pageSize}&skip=${(page - 1) * pageSize}${sortParam}`
            );
            setAllProducts(data.products);
            setPagination((prev) => ({
                ...prev,
                current: page,
                pageSize: pageSize,
                total: data.total,
            }));
        } catch (error) {
            console.error(error);
            messageApi.open({
                type: "error",
                content: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        const sortField = sorter.field;
        const sortOrder =
            sorter.order === "ascend"
                ? "asc"
                : sorter.order === "descend"
                    ? "desc"
                    : null;
        const { current, pageSize } = pagination;

        fetchProducts(current, pageSize, sortField, sortOrder);

        setPagination(pagination);
        setSorter({ field: sortField, order: sortOrder });
    };

    const columns = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Price", dataIndex: "price", key: "price", sorter: true },
        {
            title: "Discount Percentage",
            dataIndex: "discountPercentage",
            key: "discountPercentage",
            sorter: true,
        },
        { title: "Brand", dataIndex: "brand", key: "brand" },
        { title: "Category", dataIndex: "category", key: "category" },
        {
            title: "Image",
            dataIndex: "images",
            key: "images",
            render: (image) => (
                <img
                    src={image[0]}
                    alt="product"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                const isAdded = ids.includes(record.id);
                return (
                    <Button
                        variant="filled"
                        color="primary"
                        disabled={!isAdded && ids.length === 4}
                        onClick={() => {
                            if (isAdded) {
                                removeId(record.id);
                            } else {
                                addId(record.id);
                            }
                        }}
                    >
                        {isAdded ? 'Remove' : 'Compare'}
                    </Button>
                );
            }
        }
    ];

    useEffect(() => {
        fetchProducts(
            pagination.current,
            pagination.pageSize,
            sorter.field,
            sorter.order
        );
    }, []);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                overflowY: "auto",
                minHeight: "100%",
                padding: "24px",
                marginBottom: '48px'
            }}
        >
            <Table
                columns={columns}
                dataSource={allProducts}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                rowKey="id"
            />
        </div>
    );
};

export default ProductList;
