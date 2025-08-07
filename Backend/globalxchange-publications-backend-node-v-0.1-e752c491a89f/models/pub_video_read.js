const mongoose = require('mongoose');

const videoReadSchema = new mongoose.Schema({
    video_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    user_id: { type: mongoose.Types.ObjectId },
    date: { type: String },
    email: { type: String },
    readCount: { type: Number, default: 0},
    readStats: { type: String },
    points: { type: Number, default: 0 },
    status: { type: String, default: 'active' }
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_video_read', videoReadSchema);