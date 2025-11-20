import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hospital from './models/Hospital.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const hospitals = [
  {
    name: 'Apollo Hospital',
    address: {
      street: 'Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033'
    },
    location: {
      type: 'Point',
      coordinates: [78.4089, 17.4326]
    },
    phone: '+91-40-2360-7777',
    email: 'info@apollohyd.com',
    emergencyAvailable: true,
    specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Pediatrics'],
    rating: 4.5,
    timing: { open: '00:00', close: '23:59' }
  },
  {
    name: 'Fortis Hospital',
    address: {
      street: 'Bannerghatta Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560076'
    },
    location: {
      type: 'Point',
      coordinates: [77.6093, 12.8996]
    },
    phone: '+91-80-6621-4444',
    email: 'contact@fortisbangalore.com',
    emergencyAvailable: true,
    specialties: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics'],
    rating: 4.3,
    timing: { open: '00:00', close: '23:59' }
  },
  {
    name: 'Max Super Specialty Hospital',
    address: {
      street: 'Saket',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110017'
    },
    location: {
      type: 'Point',
      coordinates: [77.2177, 28.5244]
    },
    phone: '+91-11-2651-5050',
    email: 'info@maxhealthcare.com',
    emergencyAvailable: true,
    specialties: ['Cardiology', 'Neurosurgery', 'Gastroenterology', 'Urology'],
    rating: 4.6,
    timing: { open: '00:00', close: '23:59' }
  },
  {
    name: 'Lilavati Hospital',
    address: {
      street: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    location: {
      type: 'Point',
      coordinates: [72.8347, 19.0596]
    },
    phone: '+91-22-2640-0000',
    email: 'info@lilavatihospital.com',
    emergencyAvailable: true,
    specialties: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'General Medicine'],
    rating: 4.4,
    timing: { open: '00:00', close: '23:59' }
  },
  {
    name: 'Medanta - The Medicity',
    address: {
      street: 'Sector 38',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001'
    },
    location: {
      type: 'Point',
      coordinates: [77.0688, 28.4353]
    },
    phone: '+91-124-4141-414',
    email: 'info@medanta.org',
    emergencyAvailable: true,
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Gastroenterology'],
    rating: 4.7,
    timing: { open: '00:00', close: '23:59' }
  },
  {
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    address: {
      street: 'Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053'
    },
    location: {
      type: 'Point',
      coordinates: [72.8263, 19.1368]
    },
    phone: '+91-22-6907-7777',
    email: 'info@kokilabenhospital.com',
    emergencyAvailable: true,
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Transplant'],
    rating: 4.5,
    timing: { open: '00:00', close: '23:59' }
  },
  {
    name: 'Manipal Hospital',
    address: {
      street: 'HAL Airport Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560017'
    },
    location: {
      type: 'Point',
      coordinates: [77.6412, 12.9571]
    },
    phone: '+91-80-2502-4444',
    email: 'info@manipalhospitals.com',
    emergencyAvailable: true,
    specialties: ['General Medicine', 'Pediatrics', 'Orthopedics', 'Dermatology'],
    rating: 4.2,
    timing: { open: '06:00', close: '22:00' }
  },
  {
    name: 'AIIMS - All India Institute of Medical Sciences',
    address: {
      street: 'Ansari Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110029'
    },
    location: {
      type: 'Point',
      coordinates: [77.2090, 28.5672]
    },
    phone: '+91-11-2658-8500',
    email: 'info@aiims.edu',
    emergencyAvailable: true,
    specialties: ['All Specialties'],
    rating: 4.8,
    timing: { open: '00:00', close: '23:59' }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Hospital.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed hospitals
    await Hospital.insertMany(hospitals);
    console.log('🏥 Seeded hospitals');

    // Create sample users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const samplePatient = new User({
      name: 'John Doe',
      email: 'patient@example.com',
      password: hashedPassword,
      phone: '+91-9876543210',
      age: 30,
      gender: 'male',
      role: 'patient'
    });

    const sampleDoctor = new User({
      name: 'Dr. Sarah Smith',
      email: 'doctor@example.com',
      password: hashedPassword,
      phone: '+91-9876543211',
      age: 40,
      gender: 'female',
      role: 'doctor',
      specialization: 'Cardiology',
      hospitalId: (await Hospital.findOne({ name: 'Apollo Hospital' }))._id
    });

    await samplePatient.save();
    await sampleDoctor.save();
    console.log('👥 Seeded users');
    console.log('\n📧 Sample Login Credentials:');
    console.log('Patient: patient@example.com / password123');
    console.log('Doctor: doctor@example.com / password123');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
