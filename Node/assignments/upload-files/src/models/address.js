const mongoose = require('mongoose');
const validator = require('validator');

const addressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        validate(value) {
            if (value.length < 10) {
                throw new Error('Entered mobile number is invalid.');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.');
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

addressSchema.methods.toJSON = function () {
    const address = this;
    const addressObject = address.toObject();

    delete addressObject.__v;
    
    return addressObject;
}

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;