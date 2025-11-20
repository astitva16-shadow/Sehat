import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb+srv://sehat-admin:%40Astitvay2276@astitva.2fdfrn7.mongodb.net/?retryWrites=true&w=majority&appName=Astitva';

const hospitals = [
  { name: 'Apollo Hospitals', address: 'Jubilee Hills, Hyderabad, Telangana', phone: '+91 40 2360 7777', email: 'info@apollohyd.com', location: { type: 'Point', coordinates: [78.4089, 17.4349] }, specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology'], emergency: true, rating: 4.5 },
  { name: 'Fortis Hospital', address: 'Bannerghatta Road, Bangalore, Karnataka', phone: '+91 80 6621 4444', email: 'info@fortisbangalore.com', location: { type: 'Point', coordinates: [77.6046, 12.9010] }, specialties: ['Cardiology', 'Nephrology', 'Gastroenterology'], emergency: true, rating: 4.3 },
  { name: 'Max Super Speciality Hospital', address: 'Saket, New Delhi', phone: '+91 11 2651 5050', email: 'info@maxhealthcare.com', location: { type: 'Point', coordinates: [77.2167, 28.5244] }, specialties: ['Oncology', 'Cardiology', 'Neurosurgery', 'Orthopedics'], emergency: true, rating: 4.6 },
  { name: 'Lilavati Hospital', address: 'Bandra West, Mumbai, Maharashtra', phone: '+91 22 2640 0000', email: 'info@lilavatihospital.com', location: { type: 'Point', coordinates: [72.8311, 19.0544] }, specialties: ['Cardiology', 'Neurology', 'Pediatrics', 'Obstetrics'], emergency: true, rating: 4.4 },
  { name: 'Medanta - The Medicity', address: 'Sector 38, Gurugram, Haryana', phone: '+91 124 4141 414', email: 'info@medanta.org', location: { type: 'Point', coordinates: [77.0688, 28.4294] }, specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Transplant'], emergency: true, rating: 4.7 },
  { name: 'AIIMS Delhi', address: 'Ansari Nagar, New Delhi', phone: '+91 11 2659 3235', email: 'director@aiims.edu', location: { type: 'Point', coordinates: [77.2090, 28.5672] }, specialties: ['General Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Ophthalmology'], emergency: true, rating: 4.8 },
  { name: 'Kokilaben Dhirubhai Ambani Hospital', address: 'Andheri West, Mumbai, Maharashtra', phone: '+91 22 4269 6969', email: 'info@kokilabenhospital.com', location: { type: 'Point', coordinates: [72.8347, 19.1334] }, specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Gastroenterology'], emergency: true, rating: 4.5 },
  { name: 'Narayana Health', address: 'Bommasandra, Bangalore, Karnataka', phone: '+91 80 7122 2222', email: 'info@narayanahealth.org', location: { type: 'Point', coordinates: [77.7456, 12.8064] }, specialties: ['Cardiology', 'Neurosurgery', 'Orthopedics', 'Pediatrics'], emergency: true, rating: 4.4 }
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db('sehat');
    
    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('hospitals').deleteMany({});
    console.log('🗑️  Cleared existing data');
    
    // Insert hospitals
    await db.collection('hospitals').insertMany(hospitals);
    console.log('🏥 Seeded hospitals');
    
    // Insert users with hashed passwords
    const hashedPassword = await bcrypt.hash('password123', 10);
    await db.collection('users').insertMany([
      { name: 'Demo Patient', email: 'patient@example.com', password: hashedPassword, phone: '+91 98765 43210', age: 28, gender: 'male', role: 'patient' },
      { name: 'Dr. Demo Doctor', email: 'doctor@example.com', password: hashedPassword, phone: '+91 98765 43211', age: 35, gender: 'female', role: 'doctor', specialization: 'Cardiology' }
    ]);
    console.log('👥 Seeded users');
    
    // Create geospatial index
    await db.collection('hospitals').createIndex({ location: '2dsphere' });
    console.log('📍 Created geospatial index');
    
    console.log('\n📧 Sample Login Credentials:');
    console.log('Patient: patient@example.com / password123');
    console.log('Doctor: doctor@example.com / password123');
    console.log('\n✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
  }
}

seedDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
