const mongoose = require('mongoose');

const userBonusSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    date: { type: String },
    points: { type: Number },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_bonus', userBonusSchema);