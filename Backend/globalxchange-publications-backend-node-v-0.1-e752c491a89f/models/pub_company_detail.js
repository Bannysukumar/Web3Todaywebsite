const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String },
    country: { type: String },
    sector: { type: String },
    publication_id: { type: String },
    industry: { type: String },
    founders:[{ type: Object }],
    investors:[{ type: Object }],
    email: { type: String },
    profile_pic: { type: String },
    cover_pic: { type: String },
    short_desc: { type: String },
    description: { type: String },
    website: { type: String },
    social_media: [{ type: Object }],
    number_of_offices: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_company_detail', companySchema);