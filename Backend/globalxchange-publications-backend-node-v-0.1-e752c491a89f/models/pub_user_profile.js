const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    email: { type: String },
    profile_pic: { type: String },
    cover_pic: { type: String },
    age:{type:String},
    school:{type:String},
    bio:{type:String},
    address:{type:String},
    country:{type:String},
    countryIcon:{type:String},
    unique_user_id:{type:String},
    publication:{type:String},
    user_type:{type:String},
    publication_id:{type:String},
    phoneNumber:{type:String},
    socialMedia:[{type:Object}],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_user_profile', userSchema);