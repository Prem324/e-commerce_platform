import { useState, useEffect } from 'react';
import { productService } from '../services/apiServices';

export const useProducts = (keyword = '', page = 1, category = '', minPrice = '', maxPrice = '') => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await productService.getProducts(keyword, page, category, minPrice, maxPrice);
                setProducts(data.products);
                setPages(data.pages);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [keyword, page, category, minPrice, maxPrice]);

    return { products, loading, pages, error };
};
