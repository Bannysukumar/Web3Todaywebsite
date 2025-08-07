const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    user_id: { type: String },
    video_id: { type: String },
    publication_id: { type: String },
    scroll: { type: String },
    duration: { type: Number, default: 0 },
    startTimeStamp: { type: String },
    track_status: { type: String, enum: ['active', 'pause','stop'], default: 'active' },
    points: { type: Number, default: 0 },
    minutes_read: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_course_video_track', trackSchema);