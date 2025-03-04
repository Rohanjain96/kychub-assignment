import React from 'react';
import { Modal } from 'antd';
import ProductList from '../pages/product-list';

const AddProductModal = ({ open, onClose }) => {

    return (
        <Modal
            centered
            width='70vw'
            title="Add Product"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <ProductList />
        </Modal>
    );
};

export default AddProductModal;
