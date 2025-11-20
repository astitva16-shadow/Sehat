import mongoose from 'mongoose';
import User from '../backend/models/User.js';
import Hospital from '../backend/models/Hospital.js';

const hospitals = [
  {
    name: 'Apollo Hospitals',
    address: 'Jubilee Hills, Hyderabad, Telangana',
    phone: '+91 40 2360 7777',
    email: 'info@apollohyd.com',
    location: { type: 'Point', coordinates: [78.4089, 17.4349] },
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology'],
    emergency: true,
    rating: 4.5
  },
  {
    name: 'Fortis Hospital',
    address: 'Bannerghatta Road, Bangalore, Karnataka',
    phone: '+91 80 6621 4444',
    email: 'info@fortisbangalore.com',
    location: { type: 'Point', coordinates: [77.6046, 12.9010] },
    specialties: ['Cardiology', 'Nephrology', 'Gastroenterology'],
    emergency: true,
    rating: 4.3
  },
  {
    name: 'Max Super Speciality Hospital',
    address: 'Saket, New Delhi',
    phone: '+91 11 2651 5050',
    email: 'info@maxhealthcare.com',
    location: { type: 'Point', coordinates: [77.2167, 28.5244] },
    specialties: ['Oncology', 'Cardiology', 'Neurosurgery', 'Orthopedics'],
    emergency: true,
    rating: 4.6
  },
  {
    name: 'Lilavati Hospital',
    address: 'Bandra West, Mumbai, Maharashtra',
    phone: '+91 22 2640 0000',
    email: 'info@lilavatihospital.com',
    location: { type: 'Point', coordinates: [72.8311, 19.0544] },
    specialties: ['Cardiology', 'Neurology', 'Pediatrics', 'Obstetrics'],
    emergency: true,
    rating: 4.4
  },
  {
    name: 'Medanta - The Medicity',
    address: 'Sector 38, Gurugram, Haryana',
    phone: '+91 124 4141 414',
    email: 'info@medanta.org',
    location: { type: 'Point', coordinates: [77.0688, 28.4294] },
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Transplant'],
    emergency: true,
    rating: 4.7
  },
  {
    name: 'AIIMS Delhi',
    address: 'Ansari Nagar, New Delhi',
    phone: '+91 11 2659 3235',
    email: 'director@aiims.edu',
    location: { type: 'Point', coordinates: [77.2090, 28.5672] },
    specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Ophthalmology'],
    emergency: true,
    rating: 4.8
  },
  {
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    address: 'Andheri West, Mumbai, Maharashtra',
    phone: '+91 22 4269 6969',
    email: 'info@kokilabenhospital.com',
    location: { type: 'Point', coordinates: [72.8347, 19.1334] },
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Gastroenterology'],
    emergency: true,
    rating: 4.5
  },
  {
    name: 'Narayana Health',
    address: 'Bommasandra, Bangalore, Karnataka',
    phone: '+91 80 7122 2222',
    email: 'info@narayanahealth.org',
    location: { type: 'Point', coordinates: [77.7456, 12.8064] },
    specialties: ['Cardiology', 'Neurosurgery', 'Orthopedics', 'Pediatrics'],
    emergency: true,
    rating: 4.4
  }
];

const users = [
  {
    name: 'Demo Patient',
    email: 'patient@example.com',
    password: 'password123',
    phone: '+91 98765 43210',
    age: 28,
    gender: 'male',
    role: 'patient'
  },
  {
    name: 'Dr. Demo Doctor',
    email: 'doctor@example.com',
    password: 'password123',
    phone: '+91 98765 43211',
    age: 35,
    gender: 'female',
    role: 'doctor',
    specialization: 'Cardiology'
  }
];

export default async (req, res) => {
  try {
    // Connect to MongoDB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
      });
    }

    // Clear existing data
    await User.deleteMany({});
    await Hospital.deleteMany({});

    // Insert data
    await Hospital.insertMany(hospitals);
    await User.insertMany(users);

    res.json({
      success: true,
      message: 'Database seeded successfully!',
      credentials: {
        patient: 'patient@example.com / password123',
        doctor: 'doctor@example.com / password123'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
