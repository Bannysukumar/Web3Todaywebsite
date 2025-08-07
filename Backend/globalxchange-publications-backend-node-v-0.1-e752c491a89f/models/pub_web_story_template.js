const mongoose = require('mongoose');

const webStoryTemplateSchema = new mongoose.Schema({
    application_id: { type: mongoose.Types.ObjectId },
    name: { type: String },
    icon : { type: String },
    desc : { type: String },
    email: { type: String },
    link: { type: String },
    status : { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_web_story_template', webStoryTemplateSchema);