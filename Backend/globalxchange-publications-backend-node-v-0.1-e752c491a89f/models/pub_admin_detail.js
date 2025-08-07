const mongoose = require('mongoose');

const pubadminSchema = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    reffer_by_email: { type: String },
    access_level: { type: String, enum: ['superadmin', 'productadmin'], default: 'superadmin'},
    product_name: { type: String }, //name of the product or project they want access
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_admin_detail', pubadminSchema);