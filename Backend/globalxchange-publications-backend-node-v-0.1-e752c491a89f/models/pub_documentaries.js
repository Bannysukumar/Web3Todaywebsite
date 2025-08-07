const mongoose = require('mongoose');



const documentarySchema = new mongoose.Schema({
    publisher_id: { type: mongoose.Types.ObjectId },
    application_id: { type: mongoose.Types.ObjectId },
    user_id: { type: mongoose.Types.ObjectId },
    email: { type: String },
    title: { type: String },
    desc: { type: String },
    icon: { type: String },
    videoLink: { type: String },
    coverPhoto: { type: String },
    navbar_id: [{ type: String }],
    categoryType: [{ type: mongoose.Types.ObjectId }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_documentaries', documentarySchema);