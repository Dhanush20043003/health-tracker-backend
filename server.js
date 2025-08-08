// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse incoming JSON requests

// Debug connection issues (Optional)
mongoose.set('strictQuery', true); // Optional, avoids deprecation warnings
// mongoose.set('debug', true); // Uncomment to log MongoDB operations

// Routes
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  // Start the server only if DB connects
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Exit the server if DB fails
});
