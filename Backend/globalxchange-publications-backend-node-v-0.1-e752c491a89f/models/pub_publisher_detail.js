const mongoose = require('mongoose');

const pubPublisherDetailSchema = new mongoose.Schema({
    bos_user_id: { type: mongoose.Types.ObjectId }, // application user id from bos
    bos_profile_id: { type: String },
    name: { type: String },
    user_name: { type: String },
    email: { type: String },
    profile_pic: { type: String },
    cover_pic: { type: String },
    description: { type: String },
    website: { type: String },
    social_media:[{type: Object}],
    country: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_publisher_detail', pubPublisherDetailSchema);