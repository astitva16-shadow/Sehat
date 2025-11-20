import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NearbyHospitals from './pages/NearbyHospitals';
import SymptomChecker from './pages/SymptomChecker';
import AppointmentBooking from './pages/AppointmentBooking';
import MyAppointments from './pages/MyAppointments';
import ConsultationView from './pages/ConsultationView';
import Emergency from './pages/Emergency';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="hospitals" element={<NearbyHospitals />} />
              <Route path="symptom-checker" element={<SymptomChecker />} />
              <Route path="emergency" element={<Emergency />} />
              
              {/* Protected Routes */}
              <Route path="book-appointment" element={
                <ProtectedRoute>
                  <AppointmentBooking />
                </ProtectedRoute>
              } />
              <Route path="my-appointments" element={
                <ProtectedRoute>
                  <MyAppointments />
                </ProtectedRoute>
              } />
              <Route path="consultation/:id" element={
                <ProtectedRoute>
                  <ConsultationView />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
