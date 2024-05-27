const mongoose = require('mongoose');
const validator = require('validator');

const cartSchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    item_qty: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: mongoose.Decimal128,
        required: true,
        default: 0
    },
    customer_email: {
        type: String,
        unique: false,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.');
            }
        }
    },
    customer_firstname: {
        type: String,
        required: true,
        trim: true
    },
    customer_lastname: {
        type: String,
        required: true,
        trim: true
    },
    order_placed: {
        type: Number,
        required: true,
        default: 0
    },
    order_increment_id: {
        type: Number,
        required: true,
        default: 0
    },
    item_image: {
        type: Buffer
    }
}, {
    timestamps: true
});

cartSchema.methods.toJSON = function () {
    const cart = this;
    const cartObject = cart.toObject();

    cartObject.price = cartObject.price.toString();

    delete cartObject.__v;

    return cartObject;
}

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;