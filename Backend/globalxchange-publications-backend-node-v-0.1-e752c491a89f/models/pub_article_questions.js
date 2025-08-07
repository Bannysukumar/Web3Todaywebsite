const mongoose = require('mongoose');

const articleQuestionSchema = new mongoose.Schema({
    article_id: { type: mongoose.Types.ObjectId },
    question: { type: String },
    options: [{
        option: { type: String },
        is_correct: { type: Boolean, default: false }
    }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_article_questions', articleQuestionSchema);