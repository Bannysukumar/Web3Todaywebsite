const mongoose = require('mongoose');

const pubaffiliateSchema = new mongoose.Schema({
    userEmail: { type: String },
    uplines:[{email:{type:String},name:{type:String}}],
    publication_id: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_affiliate_data', pubaffiliateSchema);