const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    userEmail: { type: String },
    authorEmail: { type: String }, 
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_follow_authors', followSchema);