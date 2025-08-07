const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
});

const videoSchema = new mongoose.Schema({
    categoryType: [{ type: mongoose.Types.ObjectId }],
    navbar_id: [{ type: mongoose.Types.ObjectId }],
    application_id: { type: mongoose.Types.ObjectId },
    user_id: { type: mongoose.Types.ObjectId },
    email: { type: String },
    title: { type: String },
    desc: { type: String },
    image: { type: String },
    video: { type: String },
    action_link: { type: String },
    action: { type: String },
    metatags:[{ type: String }],
    keywords: [{ type: String }],
    joinTags: { type: String },
    joinKeywords: { type: String },
    altTag: { type: String }, 
    link_name: { type: String },
    custom_url: { type: String },
    // attachment: [{ type: String }],
    attachment: {
        tag1: tagSchema,
        tag2: tagSchema,
    },
    country: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_video', videoSchema);