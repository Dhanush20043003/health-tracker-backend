const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  bloodSugar: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Health', healthSchema);
