const mongoose = require('mongoose');

const fxaAppPublisherSchema = new mongoose.Schema({
    bos_user_id: [{ type: mongoose.Types.ObjectId }],// user id for user details
    fxa_app_id: { type: mongoose.Types.ObjectId }, // application user id from bos
    publishers:[{ type: mongoose.Types.ObjectId }],//_id of a publishers profile
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_app_publisher', fxaAppPublisherSchema);