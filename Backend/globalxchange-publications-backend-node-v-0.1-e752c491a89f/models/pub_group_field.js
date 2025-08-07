const mongoose = require('mongoose');

const pubGroupfieldDetailSchema = new mongoose.Schema({
    group_id: { type: String },
    app_code: { type: String },
    group_for: { type: String },
    name: { type: String },
    description: { type: String },
    group_icon: { type: String },
    collection_name: { type: String },
    created_by: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_group_field', pubGroupfieldDetailSchema);