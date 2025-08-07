const mongoose = require('mongoose');

const StoryTemplate = new mongoose.Schema({
    web_story_id: { type: mongoose.Types.ObjectId },
    name: { type: String },
    image: { type: String },
    desc: { type: String },
    link_to_article: { type: String },
    video_link:{type:String},
    email : { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_stories', StoryTemplate);