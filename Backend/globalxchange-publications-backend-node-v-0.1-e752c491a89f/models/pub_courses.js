const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    publication_id: { type: mongoose.Types.ObjectId },
    category: [{ type: mongoose.Types.ObjectId }],
    navbar: [{ type: mongoose.Types.ObjectId }],
    profile_pic: { type: String },
    tagline: { type: String },
    language: { type: String },
    what_you_will_learn: [{ type: Object }],
    requirements: { type: String },
    description: { type: String },
    audience: { type: String },
    preview_video: { type: String },
    subscription: { type: String, enum: ['free', 'paid'], default: 'free' },
    cost: { type: Number },
    currency: { type: String },
    teacherName: { type: String },
    teacherBio: { type: String },
    teacherImage: { type: String },
    ai_learning_assistant: { type: String, enum: ['free', 'paid'], default: 'free' },
    classroom_chat: { type: String, enum: ['free', 'paid'], default: 'free' },
    live_group_lessons: { type: String, enum: ['free', 'paid'], default: 'free' },
    one_on_one_lessons: { type: String, enum: ['free', 'paid'], default: 'free' },
    number_of_tests: { type: Number },
    number_of_downloads: { type: Number },
    certificate: { type: String, enum: ['free', 'paid'], default: 'free' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_courses', coursesSchema);