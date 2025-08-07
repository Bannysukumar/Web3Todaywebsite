const mongoose = require("mongoose");

const userSavedDataSchema = new mongoose.Schema({
    user_id: [{ type: String }],
    publication_id: [{ type: String }],
    article_id: [{ type: String }],
    video_id:[{ type: String }],
    webstory_id: [{ type: String }],
    company_id: [{ type: String }],
    casestudy_id: [{ type: String }],
    stories_id: [{ type: String }],
    documentary_id: [{ type: String }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_saved_data', userSavedDataSchema);