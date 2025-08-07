const mongoose = require('mongoose');

const globalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    points: { type: Number },
    daily_points: { type: Number },
    per_minute_article_points: { type: Number },
    article_read_points: { type: Number },
    article_bonus_points: { type: Number },
    per_minute_video_points: { type: Number },
    video_read_points: { type: Number },
    video_bonus_points: { type: Number },
    article_answer_points: { type: Number },
    video_answer_points: { type: Number },
    global_rank: { type: Number },
    status: { type: String, default: 'active' }
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_global_rank', globalSchema);
    