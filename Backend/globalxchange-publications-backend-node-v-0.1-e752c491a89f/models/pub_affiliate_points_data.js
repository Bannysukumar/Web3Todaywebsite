const mongoose  = require('mongoose');

const pubaffiliatepointsSchema = new mongoose.Schema({
    email: { type: String },
    points: { type: Number, default: 0 },
    publication_id: { type: String },
    userEmail: { type: String },
    message: { type: String },
    dds: { type: String },
    is_registered: { type: Boolean },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_affiliate_points_data', pubaffiliatepointsSchema);