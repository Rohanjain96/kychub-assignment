import React, { createContext, useState, useCallback } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [ids, setIds] = useState([]);

    const addId = useCallback((id) => {
        setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }, []);

    const removeId = useCallback((id) => {
        setIds((prev) => prev.filter((item) => item !== id));
    }, []);

    return (
        <ProductsContext.Provider value={{ ids, addId, removeId }}>
            {children}
        </ProductsContext.Provider>
    );
};