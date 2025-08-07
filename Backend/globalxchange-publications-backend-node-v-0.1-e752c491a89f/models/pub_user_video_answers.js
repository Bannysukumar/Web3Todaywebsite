const mongoose = require('mongoose');

const userVideoAnswerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    question_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    answer: { type: String },
    points: { type: Number, default: 0 },
    is_correct: { type: Boolean, default: false},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_video_answers', userVideoAnswerSchema);