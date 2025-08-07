const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    application_id: { type: mongoose.Types.ObjectId },
    // categoryType: { type: String },
    title: { type: String },
    // cv: { type: String },
    thumbnail: { type: String }, //IMG
    description: {type:String},
    colorCode:{type:String},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_categories', categorySchema);