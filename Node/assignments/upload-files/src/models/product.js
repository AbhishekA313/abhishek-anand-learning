const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
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
    availability: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: mongoose.Decimal128,
        required: true,
        default: 0
    },
    inventory: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('QTY must be a positive number.');
            }
        }
    },
    product_image: {
        type: Buffer
    }
}, {
    timestamps: true
});

productSchema.methods.toJSON = function () {
    const product = this;
    const productObject = product.toObject();

    productObject.price = productObject.price.toString();

    delete productObject.__v;

    return productObject;
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;