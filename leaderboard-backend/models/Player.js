const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 },
});

module.exports = mongoose.model('Player', PlayerSchema);