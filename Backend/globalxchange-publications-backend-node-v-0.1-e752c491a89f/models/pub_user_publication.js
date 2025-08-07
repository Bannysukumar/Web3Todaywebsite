const mongoose = require('mongoose');

const userPublicationSchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId},
    publication_ids:[{type:mongoose.Schema.Types.ObjectId}],
    email:{type:String},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

}, {
    timestamps: true
})

module.exports = mongoose.model('pub_user_publication', userPublicationSchema);