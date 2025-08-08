const express = require('express');
const router = express.Router();
const Health = require('../models/Health');
const auth = require('../middleware/authMiddleware');

// ✅ Add health data
router.post('/', auth, async (req, res) => {
  try {
    const { weight, bloodPressure, bloodSugar, date } = req.body;

    if (!weight || !bloodPressure || !bloodSugar) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const entry = new Health({
      userId: req.user.id,
      weight,
      bloodPressure,
      bloodSugar,
      date: date || new Date()
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error('❌ Error saving health data:', err.message);
    res.status(500).json({ error: 'Failed to save health data' });
  }
});

// ✅ Get all user data
router.get('/', auth, async (req, res) => {
  try {
    const data = await Health.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
