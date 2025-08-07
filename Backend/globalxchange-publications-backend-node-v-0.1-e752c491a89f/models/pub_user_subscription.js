const mongoose = require('mongoose');

const userSubscription = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    article_subscription: {type: Boolean, default: false},
    video_subscription: {type: Boolean, default: false},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_subscription', userSubscription);