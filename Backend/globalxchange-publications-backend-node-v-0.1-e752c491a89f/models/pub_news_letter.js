const mongoose = require('mongoose');

const newsLetterSchema = new mongoose.Schema({
    publication_id: { type: mongoose.Types.ObjectId },
    email: { type: String },
    nameOfNewsLetter: { type: String },
    icon: { type: String },
    description: { type: String },
    colourCode: { type: String },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
    type: { type: String, enum: ['free', 'paid'], default: 'free' },
    currency: { type: String },
    billingFrequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
    costPerFrequency: { type: Number },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
    timestamps: true
});

module.exports = mongoose.model('pub_news_letter', newsLetterSchema);