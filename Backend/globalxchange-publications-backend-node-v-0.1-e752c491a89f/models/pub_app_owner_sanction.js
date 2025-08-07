const mongoose = require('mongoose');

const appOwnerSanctionSchema = new mongoose.Schema({
    application_id: { type: mongoose.Types.ObjectId }, //fxa_app_id or publisher _id 
    oldUser_email: { type: String },
    newUser_email: { type: String },
    type: { type: String, enum:['publication', 'publisher'] },
    comment: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_app_owner_sanction', appOwnerSanctionSchema);