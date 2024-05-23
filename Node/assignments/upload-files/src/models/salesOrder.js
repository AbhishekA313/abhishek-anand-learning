const mongoose = require('mongoose');
const validator = require('validator');

const salesOrderSchema = new mongoose.Schema({
    increment_id: {
        type: Number,
        required: true
    },
    item_ids: [{
        id: {
            type: String,
            required: true
        }
    }],
    customer_email: {
        type: String,
        unique: true,
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
    billing_address: {
        type: String,
        required: true,
        trim: true
    },
    shipping_address: {
        type: String,
        required: true,
        trim: true
    },
    grandTotal: {
        type: mongoose.Decimal128,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

salesOrderSchema.methods.toJSON = function () {
    const salesOrder = this;
    const salesOrderObject = salesOrder.toObject();

    salesOrderObject.grandTotal = salesOrderObject.grandTotal.toString();

    delete salesOrderObject.__v;

    return salesOrderObject;
}

const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

module.exports = SalesOrder;