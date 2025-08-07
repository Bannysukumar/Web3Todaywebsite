const mongoose = require('mongoose');

const publisherCourseSchema = new mongoose.Schema({
    email: { type: String },
    course_id: { type: mongoose.Types.ObjectId },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_course', publisherCourseSchema);