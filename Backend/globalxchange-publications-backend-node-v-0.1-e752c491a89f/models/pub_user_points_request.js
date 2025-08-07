const mongoose = require('mongoose');

const globalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId },
    publication_id: { type: mongoose.Types.ObjectId },
    points_requested: { type: Number },
    balance_requested: { type: Number },
    paymentdetails: {type:String},
    status: { type: String, default: 'active' },
    is_approved: { type: String, default: 'pending' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_points_request', globalSchema);
    