const mongoose = require('mongoose');

const JewelrySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create a compound index for better query performance
JewelrySchema.index({ name: 'text', description: 'text', category: 'text' });

// Static method to find the next available ID
JewelrySchema.statics.getNextId = async function() {
    const maxItem = await this.findOne().sort('-id');
    return maxItem ? maxItem.id + 1 : 1;
};

module.exports = mongoose.model('Jewelry', JewelrySchema);
