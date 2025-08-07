const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String },
    country: { type: String },
    gender: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    email: { type: String },
    phone: { type: String },
    website: { type: String },
    description: { type: String },
    bio: { type: String },
    current_company: { type: String },
    current_job_title: { type: String },
    current_job_category: { type: String },
    currently_affiliated_company: [{ type: String }],
    previous_affiliated_company: [{ type: String }],
    profile_pic: { type: String },
    cover_pic: { type: String },
    publication_id: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_person_founder_detail', personSchema);