import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes - use relative paths
import authRoutes from '../backend/routes/auth.js';
import hospitalRoutes from '../backend/routes/hospitals.js';
import appointmentRoutes from '../backend/routes/appointments.js';
import symptomRoutes from '../backend/routes/symptoms.js';

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// MongoDB connection handler
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  
  try {
    mongoose.set('bufferCommands', false);
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    cachedDb = db;
    console.log('✅ MongoDB Connected');
    return db;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/symptoms', symptomRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Sehat App API is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: err.message 
  });
});

// Serverless handler
export default async (req, res) => {
  try {
    await connectDB();
    app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
