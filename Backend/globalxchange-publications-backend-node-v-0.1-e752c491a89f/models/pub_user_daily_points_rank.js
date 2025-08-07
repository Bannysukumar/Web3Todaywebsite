const mongoose = require('mongoose');

const dailyPointsRankSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    points: { type: Number },
    daily_points_rank: { type: Number },
    status: { type: String, default: 'active' }
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_daily_points_rank', dailyPointsRankSchema);
