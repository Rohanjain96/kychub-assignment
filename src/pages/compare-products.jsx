import { Button, Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../constants/url";
import { ProductsContext } from "../contexts/product-context";
import AddProductModal from "../components/addProductModal";
const CompareProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const { ids } = useContext(ProductsContext)

    const onClose = () => {
        setOpenModal(false);
    }
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
            title: "Details",
            dataIndex: "details",
            key: "details",
            render: () => (
                <div>
                    <p style={{
                        paddingBlock: '16px'
                    }}>
                        <strong>Name</strong>
                    </p>
                    <p style={{
                        paddingBlock: '16px'
                    }}>
                        <strong>Price</strong>
                    </p>
                    <p style={{
                        paddingBlock: '16px'
                    }}>
                        <strong>Category</strong>
                    </p>
                </div>
            ),
        },
        ...products.map((product, index) => ({
            title: `Product ${index + 1}`,
            dataIndex: `product${index}`,
            key: `product${index}`,
            render: () => (
                <div>

                    <p style={{
                        paddingBlock: '16px'
                    }}>{product.title}</p> <p style={{
                        paddingBlock: '16px'
                    }}>${product.price}</p>
                    <p style={{
                        paddingBlock: '16px'
                    }}>{product.category}</p>
                </div>
            ),
        })),
        ...(ids.length === 1
            ? [
                {
                    title: "",
                    key: "addMore",
                    render: () => (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: '24px'
                            }}
                        >

                            <p>Add one or more products to compare</p>
                            <Button onClick={() => setOpenModal(true)} type="primary">Add Product</Button>
                        </div>
                    ),
                },
            ]
            : []),
    ];
    const dataSource = [
        {
            key: "1",
            details: "",
            ...products.reduce((acc, product, index) => {
                acc[`product${index}`] = product;
                return acc;
            }, {}),
        },
    ];
    return (

        <>
            {
                ids.length === 0 ? <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    gap: '24px'
                }}>

                    <p>Please add products to compare</p> <Button variant="filled" color='primary' onClick={() => setOpenModal(true)}>Add Products</Button>
                </div> :
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: '24px' }}>
                            <Button onClick={() => setOpenModal(true)} type="primary">Add Product</Button>
                        </div>
                        <Spin spinning={loading}>

                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                pagination={false}
                                bordered
                            />
                        </Spin>
                    </div>
            }
            <AddProductModal open={openModal} onClose={onClose} />
        </>
    );
};
export default CompareProductTable;
