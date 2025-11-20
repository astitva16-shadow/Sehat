import express from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../models/Appointment.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Validation rules
const appointmentValidation = [
  body('patientName').trim().notEmpty(),
  body('patientAge').isInt({ min: 1, max: 120 }),
  body('patientGender').isIn(['male', 'female', 'other']),
  body('patientPhone').notEmpty(),
  body('patientEmail').isEmail(),
  body('hospitalId').notEmpty(),
  body('symptoms').notEmpty(),
  body('appointmentDate').isISO8601(),
  body('appointmentTime').notEmpty()
];

// Create appointment
router.post('/', authMiddleware, appointmentValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const appointment = new Appointment({
      ...req.body,
      patientId: req.userId
    });

    await appointment.save();
    await appointment.populate('hospitalId');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ success: false, message: 'Error creating appointment' });
  }
});

// Get user's appointments
router.get('/my-appointments', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    if (req.userRole === 'patient') {
      query.patientId = req.userId;
    } else if (req.userRole === 'doctor') {
      query.doctorId = req.userId;
    }

    const appointments = await Appointment.find(query)
      .populate('hospitalId')
      .populate('doctorId', 'name specialization')
      .sort({ appointmentDate: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ success: false, message: 'Error fetching appointments' });
  }
});

// Get single appointment
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('hospitalId')
      .populate('doctorId', 'name specialization');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Check authorization
    if (appointment.patientId.toString() !== req.userId && 
        appointment.doctorId?.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ success: false, message: 'Error fetching appointment' });
  }
});

// Update appointment (for doctors to add prescription)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Only doctors can update prescriptions
    if (req.userRole !== 'doctor') {
      return res.status(403).json({ success: false, message: 'Only doctors can update prescriptions' });
    }

    const { prescription, consultation, status } = req.body;

    if (prescription) appointment.prescription = prescription;
    if (consultation) appointment.consultation = consultation;
    if (status) appointment.status = status;

    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ success: false, message: 'Error updating appointment' });
  }
});

// Cancel appointment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.patientId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ success: false, message: 'Error cancelling appointment' });
  }
});

export default router;
