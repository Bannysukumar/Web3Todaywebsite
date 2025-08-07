const mongoose = require('mongoose');

const userDailyPointsSchema = new mongoose.Schema({
    email: { type: String },
    user_id: { type: String},
    date: { type: String },
    publication_id: { type: String },
    points: { type: Number},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_daily_points', userDailyPointsSchema);