# Sehat App - Health Consultation & Appointment Booking Platform

A modern, full-stack health consultation and appointment booking web application built with React, Node.js, Express, and MongoDB.

![Sehat App](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### For Patients
- **Smart Symptom Checker** - Get instant health insights based on symptoms with diet and lifestyle recommendations
- **Find Nearby Hospitals** - Location-based hospital search with map integration
- **Book Appointments** - Easy appointment scheduling with doctors
- **Emergency Services** - Quick access to emergency helplines and nearby emergency hospitals
- **View Consultations** - Access prescriptions, diet recommendations, and consultation history
- **Download Reports** - Download consultation summaries for personal records

### For Doctors
- **Manage Appointments** - View scheduled patient appointments
- **Add Prescriptions** - Prescribe medicines with dosage and schedule
- **Patient Management** - Access patient history and consultation notes

### General Features
- **User Authentication** - Secure JWT-based authentication for patients and doctors
- **Responsive Design** - Mobile-first, works seamlessly on all devices
- **Dark Mode** - Easy on the eyes with dark theme support
- **Real-time Location** - Browser geolocation integration for nearby hospitals
- **Interactive Maps** - Leaflet maps showing hospital locations
- **Clean UI/UX** - Modern, intuitive interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **Vite** - Lightning-fast build tool
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet** - Interactive maps
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Request validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PBL
```

### 2. Install Dependencies

#### Install all dependencies (frontend + backend)
```bash
npm run install:all
```

Or install separately:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment Variables

#### Backend Configuration
Create a `.env` file in the `backend` directory (or rename `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sehat-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a strong, random string in production!

### 4. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If installed as a service, MongoDB starts automatically
# Or run manually:
mongod
```

**macOS:**
```bash
brew services start mongodb-community
# Or run manually:
mongod --config /usr/local/etc/mongod.conf
```

**Linux:**
```bash
sudo systemctl start mongod
# Or run manually:
mongod
```

### 5. Seed the Database

Populate the database with sample hospitals and users:

```bash
cd backend
node seed.js
```

This will create:
- 8 sample hospitals with locations
- 2 demo user accounts:
  - **Patient:** `patient@example.com` / `password123`
  - **Doctor:** `doctor@example.com` / `password123`

### 6. Run the Application

#### Option 1: Run Both Servers Concurrently

From the root directory:
```bash
# Run backend
npm run dev:backend

# In another terminal, run frontend
npm run dev:frontend
```

#### Option 2: Run Separately

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### 7. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🔑 Demo Credentials

### Patient Account
- **Email:** patient@example.com
- **Password:** password123

### Doctor Account
- **Email:** doctor@example.com
- **Password:** password123

## 📱 Application Structure

```
PBL/
├── backend/
│   ├── models/
│   │   ├── User.js           # User model (patients & doctors)
│   │   ├── Hospital.js       # Hospital model with geolocation
│   │   └── Appointment.js    # Appointment model with prescriptions
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── hospitals.js     # Hospital CRUD operations
│   │   ├── appointments.js  # Appointment management
│   │   └── symptoms.js      # Symptom checker logic
│   ├── server.js            # Express server setup
│   ├── seed.js              # Database seeding script
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── EmergencyButton.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── NearbyHospitals.jsx
│   │   │   ├── SymptomChecker.jsx
│   │   │   ├── AppointmentBooking.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   ├── ConsultationView.jsx
│   │   │   └── Emergency.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Authentication state
│   │   │   └── ThemeContext.jsx   # Dark mode state
│   │   ├── services/
│   │   │   └── api.js             # API client & endpoints
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── package.json
└── README.md
```

## 🎯 Key Features Implementation

### 1. Location-Based Hospital Search
- Uses browser's Geolocation API
- MongoDB geospatial queries for nearby hospitals
- Calculates distance using Haversine formula
- Interactive map view with Leaflet

### 2. Symptom Checker
- Rule-based symptom analysis
- Provides:
  - Concern level (Mild/Moderate/Severe)
  - Possible conditions
  - Home care tips
  - Diet recommendations
  - Suggested medical specialty
- Emergency detection for critical symptoms

### 3. Appointment System
- Complete booking workflow
- Date and time selection
- Hospital and symptom input
- Confirmation with appointment ID
- View all appointments (scheduled/completed/cancelled)

### 4. Consultation & Prescriptions
- Detailed consultation view
- Prescribed medicines with dosage
- Diet and lifestyle recommendations
- Download consultation summary
- Follow-up tracking

### 5. Emergency Services
- Quick access emergency button (floating)
- Emergency helpline numbers (112, 108, etc.)
- Nearby emergency hospitals
- First aid tips

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes on frontend
- Server-side request validation
- CORS configuration
- Environment variable management

## 🎨 UI/UX Highlights

- **Color Scheme:** Calming health-related colors (blue/green)
- **Responsive:** Mobile-first design, works on all screen sizes
- **Dark Mode:** System preference and manual toggle
- **Icons:** Consistent use of Lucide icons
- **Loading States:** Smooth loading indicators
- **Error Handling:** User-friendly error messages
- **Accessibility:** Semantic HTML and ARIA labels

## 🧪 Testing the Application

### Test Symptom Checker
Try these symptoms:
- "fever and cough" - Moderate concern
- "chest pain" - Emergency alert
- "stomach ache and nausea" - Diet recommendations
- "headache and body pain" - Home care tips

### Test Appointments
1. Login as patient
2. Go to "Book Appointment"
3. Fill in details
4. View in "My Appointments"

### Test Emergency Features
1. Click red emergency button (bottom-right)
2. View emergency helplines
3. See nearby emergency hospitals

## 📦 Build for Production

### Frontend Build
```bash
cd frontend
npm run build
# Creates optimized build in 'dist' folder
```

### Backend Production
```bash
cd backend
# Set NODE_ENV=production in .env
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Hospitals
- `GET /api/hospitals` - Get all hospitals
- `GET /api/hospitals?lat={lat}&lng={lng}` - Get nearby hospitals
- `GET /api/hospitals?emergency=true` - Get emergency hospitals
- `GET /api/hospitals/:id` - Get hospital by ID

### Appointments
- `POST /api/appointments` - Create appointment (protected)
- `GET /api/appointments/my-appointments` - Get user's appointments (protected)
- `GET /api/appointments/:id` - Get appointment details (protected)
- `PUT /api/appointments/:id` - Update appointment (doctor only)
- `DELETE /api/appointments/:id` - Cancel appointment (protected)

### Symptoms
- `POST /api/symptoms/check` - Check symptoms and get recommendations

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
sudo systemctl status mongod  # Linux
brew services list            # macOS

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/sehat-app
```

### Port Already in Use
```bash
# Change port in backend/.env
PORT=5001

# Or kill process using the port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Future Enhancements

- [ ] Real-time chat between doctor and patient
- [ ] Video consultation integration
- [ ] Payment gateway for appointments
- [ ] Medicine delivery integration
- [ ] Health records storage with encryption
- [ ] Push notifications for appointments
- [ ] Multi-language support
- [ ] Advanced symptom checker with ML
- [ ] Doctor ratings and reviews
- [ ] Insurance integration

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for better healthcare access**

*Sehat App - Your Smart Health Companion*
