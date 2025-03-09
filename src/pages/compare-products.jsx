import { Button, Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../constants/url";
import { ProductsContext } from "../contexts/product-context";
import AddProductModal from "../components/add-product-modal";

const CompareProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { ids, removeId } = useContext(ProductsContext);

    const onClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productPromises = ids.map((id) =>
                    fetch(`${API_URL}/${id}`).then((res) => res.json())
                );
                const products = await Promise.all(productPromises);
                setProducts(products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [ids]);

    const columns = [
        {
            title: "Attribute",
            dataIndex: "attribute",
            key: "attribute",
            render: (text) => <strong>{text}</strong>,
        },
        ...products.map((product, index) => ({
            title: `Product ${index + 1}`,
            dataIndex: `product${index}`,
            key: `product${index}`,
            render: (value, record) => {
                if (record.attribute === "Action") {
                    return (
                        <Button onClick={() => removeId(product.id)} type="primary">
                            Remove
                        </Button>
                    );
                }
                return value;
            },
        })),
        ...(ids.length === 1
            ? [
                {
                    title: "Add More",
                    key: "addMore",
                    render: (_, record, index) => {
                        if (index === 0) {
                            return {
                                children: (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "16px",
                                            height: "100%",
                                        }}
                                    >
                                        <p>Add one or more products to compare</p>
                                        <Button
                                            onClick={() => setOpenModal(true)}
                                            type="primary"
                                        >
                                            Add More
                                        </Button>
                                    </div>
                                ),
                                props: { rowSpan: 4 },
                            };
                        }
                        return { props: { rowSpan: 0 } };
                    },
                },
            ]
            : []),
    ];

    const dataSource = [
        {
            key: "name",
            attribute: "Name",
            ...products.reduce((acc, product, index) => {
                acc[`product${index}`] = product.title;
                return acc;
            }, {}),
        },
        {
            key: "price",
            attribute: "Price",
            ...products.reduce((acc, product, index) => {
                acc[`product${index}`] = `$${product.price}`;
                return acc;
            }, {}),
        },
        {
            key: "category",
            attribute: "Category",
            ...products.reduce((acc, product, index) => {
                acc[`product${index}`] = product.category;
                return acc;
            }, {}),
        },
        {
            key: "action",
            attribute: "Action",
            ...products.reduce((acc, product, index) => {
                acc[`product${index}`] = "Action";
                return acc;
            }, {}),
        },
    ];

    return (
        <>
            {ids.length === 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        gap: "24px",
                    }}
                >
                    <p>Please add products to compare</p>
                    <Button
                        variant="filled"
                        color="primary"
                        onClick={() => setOpenModal(true)}
                    >
                        Add Products
                    </Button>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            marginBottom: "24px",
                        }}
                    >
                        <Button onClick={() => setOpenModal(true)} type="primary">
                            Add More
                        </Button>
                    </div>
                    <Spin spinning={loading}>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                            bordered
                            rowKey="key"
                        />
                    </Spin>
                </div>
            )}
            <AddProductModal open={openModal} onClose={onClose} />
        </>
    );
};

export default CompareProductTable;
