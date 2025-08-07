const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    cover_pic: { type: String },
    media: [{ type: String }],
    description: { type: String },
    organized_by: { type: String },
    start_date: { type: String },
    end_date: { type: String },
    duration: { type: String },
    website: { type: String },
    social_media: [{ type: String }],
    country: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_event_detail', eventSchema);