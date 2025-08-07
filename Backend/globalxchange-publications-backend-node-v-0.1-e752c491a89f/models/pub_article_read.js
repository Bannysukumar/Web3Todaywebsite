const mongoose = require('mongoose');

const articleReadSchema = new mongoose.Schema({
    article_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    user_id: { type: mongoose.Types.ObjectId },
    date: { type: String },
    email: { type: String },
    readCount: { type: Number, default: 0},
    points: { type: Number, default: 0 },
    readStats: { type: String },
    status: { type: String, default: 'active' }
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_article_read', articleReadSchema);