const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    section_id: { type: mongoose.Types.ObjectId },
    name: { type: String },
    description: { type: String },
    image: { type: String },
    video_link: { type: String },
    video_length: { type: String },
    video_order: { type: Number },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_videos_section', videoSchema);