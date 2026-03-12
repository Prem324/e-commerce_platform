const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;

        const query = {};
        
        // Keyword Search (Title or Description)
        if (req.query.keyword && req.query.keyword.trim() !== '') {
            query.$or = [
                { title: { $regex: req.query.keyword.trim(), $options: 'i' } },
                { description: { $regex: req.query.keyword.trim(), $options: 'i' } }
            ];
        }

        // Category Filter
        if (req.query.category && req.query.category.trim() !== '' && req.query.category !== 'All') {
            query.category = { $regex: `^${req.query.category.trim()}$`, $options: 'i' };
        }

        // Price Filter
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice && req.query.minPrice.trim() !== '') {
                query.price.$gte = Number(req.query.minPrice);
            }
            if (req.query.maxPrice && req.query.maxPrice.trim() !== '') {
                query.price.$lte = Number(req.query.maxPrice);
            }
        }

        const count = await Product.countDocuments({ ...query });
        const products = await Product.find({ ...query })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .lean();

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { title, price, description, image, category, stock } = req.body;

        const product = new Product({
            title: title || 'New Artifact',
            price: price || 0,
            user: req.user._id,
            images: [{ url: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' }],
            category: category || 'General',
            stock: stock || 0,
            ratings: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
            numReviews: Math.floor(Math.random() * 100) + 10,
            description: description || 'No detailed description available.',
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { title, price, description, images, image, category, stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.title = title || product.title;
            product.price = price || product.price;
            product.description = description || product.description;
            
            if (images) {
                product.images = images;
            } else if (image) {
                product.images = [{ url: image }];
            }
            product.category = category || product.category;
            product.stock = stock || product.stock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get unique categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    getCategories,
};
