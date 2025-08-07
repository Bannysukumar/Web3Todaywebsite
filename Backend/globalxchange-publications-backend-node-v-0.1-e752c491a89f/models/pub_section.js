const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    course_id: { type: mongoose.Types.ObjectId },
    section_name: { type: String },
    section_description: { type: String },
    section_order: { type: Number },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_section', sectionSchema);