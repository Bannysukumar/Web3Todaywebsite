const mongoose = require('mongoose');

const webinarSchema = new mongoose.Schema({
    publication_id: { type: mongoose.Types.ObjectId },
    email: { type: String },
    image: { type: String },
    title: { type: String },
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    description: { type: String },
    registrationLink: { type: String },
    costStructure: { type: String, enum: ['free', 'paid'], default: 'free' },
    cost: { type: Number },
    currency: { type: String },
    recordingStatus: { type: String, enum: [true, false], default: false },
    hostName: { type: String },
    hostImage: { type: String },
    hostBio: { type: String },
    category: [{ type: mongoose.Types.ObjectId }],
    navbar: [{ type: mongoose.Types.ObjectId }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_webinars', webinarSchema);