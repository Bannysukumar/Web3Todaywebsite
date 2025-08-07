const mongoose = require('mongoose');

const navbarSchema = new mongoose.Schema({
    application_id: { type: mongoose.Types.ObjectId },
    user_id: { type: mongoose.Types.ObjectId },
    email: { type: String },
    navTitle: { type: String },
    desc: { type: String },
    icon: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_navbar', navbarSchema);