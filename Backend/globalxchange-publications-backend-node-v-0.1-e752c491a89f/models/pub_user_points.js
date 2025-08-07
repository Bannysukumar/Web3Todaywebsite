const mongoose = require('mongoose');

const userPointsSchema = new mongoose.Schema({
    user_id: { type: String },
    total_points: { type: Number },
    total_articles_data: [{ type: Object }],
    application_id: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_points', userPointsSchema);
