const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less then 1.'],
                default: 1
            },
            price: Number,
            title: String,
            image: String
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
