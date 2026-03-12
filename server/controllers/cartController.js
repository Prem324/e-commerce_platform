const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get logged in user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.json({ items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [{
                    product: productId,
                    quantity: quantity,
                    price: product.price,
                    title: product.title,
                    image: product.images[0]?.url || ''
                }]
            });
        } else {
            const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

            if (itemIndex > -1) {
                // Update quantity carefully
                const newQuantity = cart.items[itemIndex].quantity + quantity;
                if (newQuantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    cart.items[itemIndex].quantity = newQuantity;
                }
            } else if (quantity > 0) {
                cart.items.push({
                    product: productId,
                    quantity: quantity,
                    price: product.price,
                    title: product.title,
                    image: product.images[0]?.url || ''
                });
            }
        }

        const updatedCart = await cart.save();
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.items = cart.items.filter(item => item.product.toString() !== req.params.id);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart
};
