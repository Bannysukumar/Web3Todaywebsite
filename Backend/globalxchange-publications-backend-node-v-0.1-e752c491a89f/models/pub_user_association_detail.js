const mongoose = require('mongoose');

const userAssociationDetailSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId }, //user id
    association_relation: { type: String }, //how they are assoicated with each other
    association_entity: { type: String }, //collection
    entity_id: { type: mongoose.Types.ObjectId }, //record id
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_association_detail', userAssociationDetailSchema);