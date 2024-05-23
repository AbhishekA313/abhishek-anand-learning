const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true
    },
    include_in_menu: {
        type: Number,
        required: true,
        default: 0
    },
    is_active: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

categorySchema.methods.toJSON = function () {
    const category = this;
    const categoryObject = category.toObject();

    delete categoryObject.__v;
    
    return categoryObject;
}

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;