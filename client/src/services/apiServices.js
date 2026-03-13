import API from './api';

export const productService = {
    getProducts: (keyword = '', page = 1, category = '', minPrice = '', maxPrice = '', sort = '') => 
        API.get(`/products?keyword=${keyword}&pageNumber=${page}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`),
    
    getCategories: () =>
        API.get('/products/categories'),
    
    getProductById: (id) => 
        API.get(`/products/${id}`),
    
    createProduct: (productData) => 
        API.post('/products', productData),
    
    updateProduct: (id, productData) => 
        API.put(`/products/${id}`, productData),
    
    deleteProduct: (id) => 
        API.delete(`/products/${id}`),
};

export const cartService = {
    getCart: () => 
        API.get('/cart'),
    
    addToCart: (productId, quantity) => 
        API.post('/cart', { productId, quantity }),
    
    removeFromCart: (productId) => 
        API.delete(`/cart/${productId}`),
};

export const orderService = {
    createOrder: (orderData) => 
        API.post('/orders', orderData),
    
    getMyOrders: () => 
        API.get('/orders/myorders'),
    
    getOrderById: (id) => 
        API.get(`/orders/${id}`),
};
