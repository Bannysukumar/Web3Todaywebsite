const mongoose = require('mongoose');

const pubPublicationDetailSchema = new mongoose.Schema({
    fxa_app_id: { type: mongoose.Types.ObjectId }, // application user id from bos
    name: { type: String },
    app_code: { type: Array },
    email: { type: String },
    profile_pic: { type: String },
    cover_pic: { type: String },
    description: { type: String },
    website: { type: String },
    social_media: [{ type: String }],
    usertypes: [{ type: String }],
    rewardPoints: { type: String }, //user types who can access
    videoRewardPoints: { type: String },
    dailyLogin: { type: String },
    articleRead: { type: String },
    videoRead: { type: String },
    fiveArticleRead: { type: String },
    fiveVideoRead: { type: String },
    country: { type: String },
    signUpBonus: { type: String },
    articleQuestionPoints: { type: String },
    videoQuestionPoints: { type: String },
    ddsLevel: [{ type: String }],
    payoutCurrency: { type: String },
    payoutConversionRate: { type: String },
    primaryColor: { type: String },
    secondaryColor: { type: String },
    textColor: { type: String },
    fullColoredLogo: { type: String },
    font: { type: String },
    trendingnavbarid: {type:String},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_publication_detail', pubPublicationDetailSchema);