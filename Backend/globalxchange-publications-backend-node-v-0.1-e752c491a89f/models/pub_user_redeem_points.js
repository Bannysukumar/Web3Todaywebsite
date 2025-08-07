const mongoose = require('mongoose');

const pubUserRedeemPointsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    converted_points: { type: Number },
    converted_balance: { type: Number },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_redeem_points', pubUserRedeemPointsSchema);