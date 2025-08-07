const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
});

const articleSchema = new mongoose.Schema({
    categoryType: [{ type: mongoose.Types.ObjectId }],
    navbar_id: [{ type: mongoose.Types.ObjectId }],
    application_id: { type: mongoose.Types.ObjectId },
    user_id: { type: mongoose.Types.ObjectId },
    email: { type: String },
    title: { type: String },
    link_name: { type: String },
    desc: { type: String },
    icon: { type: String },
    media: { type: String },
    article: { type: String },
    article_media: [{ type: String }],
    altTag: { type: String },
    metatags:[{ type: String }],
    joinTags: { type: String },
    keywords: [{ type: String }],
    joinKeywords: { type: String },
    custom_url: { type: String },
    // attachment: [{ type: String }],
    attachment: {
        tag1: tagSchema,
        tag2: tagSchema,
    },
    action_link: { type: String },
    action: { type: String },
    country: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_article', articleSchema);