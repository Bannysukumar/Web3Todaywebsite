const mongoose = require('mongoose');

const pubfieldDetailSchema = new mongoose.Schema({
    group_id: { type: String },
    app_code: { type: String },
    key_group: { type: String },
    field_key: { type: String },
    name: { type: String, unique: true },
    description: { type: String },
    field_type: { type: String, enum: ['array', 'number', 'string', 'object', 'boolean'], default: 'string' },
    sub_type: { type: String },
    field_icon: { type: String },
    collection_name: { type: String },
    created_by: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_field_data', pubfieldDetailSchema);