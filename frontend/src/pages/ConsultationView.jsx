import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../services/api';
import { 
  FileText, Calendar, User, Phone, Mail, MapPin, 
  Pill, Clock, Apple, Activity, Download, ArrowLeft 
} from 'lucide-react';

const ConsultationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const fetchAppointment = async () => {
    try {
      const response = await appointmentAPI.getById(id);
      setAppointment(response.data.appointment);
    } catch (err) {
      setError('Failed to load appointment details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadSummary = () => {
    if (!appointment) return;

    const summary = `
SEHAT APP - CONSULTATION SUMMARY
=================================

Appointment ID: ${appointment._id}
Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}
Time: ${appointment.appointmentTime}

PATIENT INFORMATION
-------------------
Name: ${appointment.patientName}
Age: ${appointment.patientAge} years
Gender: ${appointment.patientGender}
Phone: ${appointment.patientPhone}
Email: ${appointment.patientEmail}

HOSPITAL DETAILS
----------------
Hospital: ${appointment.hospitalId?.name}
Address: ${appointment.hospitalId?.address?.street}, ${appointment.hospitalId?.address?.city}
Phone: ${appointment.hospitalId?.phone}

CONSULTATION DETAILS
--------------------
Symptoms: ${appointment.symptoms}

${appointment.consultation?.diagnosis ? `Diagnosis: ${appointment.consultation.diagnosis}` : ''}
${appointment.consultation?.doctorNotes ? `Doctor's Notes: ${appointment.consultation.doctorNotes}` : ''}

${appointment.prescription?.medicines?.length > 0 ? `
PRESCRIPTION
------------
${appointment.prescription.medicines.map((med, i) => `
${i + 1}. ${med.name}
   Dosage: ${med.dosage}
   Schedule: ${med.schedule}
   Duration: ${med.duration}
`).join('\n')}
` : ''}

${appointment.prescription?.dietRecommendations ? `
DIET RECOMMENDATIONS
--------------------
${appointment.prescription.dietRecommendations}
` : ''}

${appointment.prescription?.lifestyleAdvice ? `
LIFESTYLE ADVICE
----------------
${appointment.prescription.lifestyleAdvice}
` : ''}

${appointment.consultation?.followUpDate ? `
Follow-up Date: ${new Date(appointment.consultation.followUpDate).toLocaleDateString()}
` : ''}

---
Generated on: ${new Date().toLocaleString()}
This is a computer-generated document from Sehat App.
    `.trim();

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consultation-${appointment._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading consultation details...</p>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
          <p className="text-red-600 dark:text-red-400">{error || 'Appointment not found'}</p>
          <button
            onClick={() => navigate('/my-appointments')}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  const appointmentDate = new Date(appointment.appointmentDate);
  const isPast = appointmentDate < new Date();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/my-appointments')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Appointments</span>
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Consultation Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Appointment ID: {appointment._id}
            </p>
          </div>
          
          {appointment.status === 'completed' && (
            <button
              onClick={downloadSummary}
              className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Download Summary</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointment Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary-600" />
              Appointment Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date & Time</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {appointmentDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.appointmentTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  appointment.status === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : appointment.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-primary-600" />
              Symptoms & Reason for Visit
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{appointment.symptoms}</p>
          </div>

          {/* Diagnosis & Consultation */}
          {appointment.consultation && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-primary-600" />
                Diagnosis & Consultation
              </h2>
              {appointment.consultation.diagnosis && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Diagnosis</p>
                  <p className="text-gray-900 dark:text-white">{appointment.consultation.diagnosis}</p>
                </div>
              )}
              {appointment.consultation.doctorNotes && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Doctor's Notes</p>
                  <p className="text-gray-700 dark:text-gray-300">{appointment.consultation.doctorNotes}</p>
                </div>
              )}
              {appointment.consultation.followUpDate && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Follow-up Date:</strong> {new Date(appointment.consultation.followUpDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Prescription */}
          {appointment.prescription && appointment.prescription.medicines?.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Pill className="w-6 h-6 mr-2 text-primary-600" />
                Prescribed Medicines
              </h2>
              <div className="space-y-4">
                {appointment.prescription.medicines.map((medicine, index) => (
                  <div key={index} className="border-l-4 border-primary-500 bg-gray-50 dark:bg-gray-700/50 rounded-r-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {index + 1}. {medicine.name}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Dosage</p>
                        <p className="font-medium text-gray-900 dark:text-white">{medicine.dosage}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Schedule</p>
                        <p className="font-medium text-gray-900 dark:text-white">{medicine.schedule}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Duration</p>
                        <p className="font-medium text-gray-900 dark:text-white">{medicine.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diet Recommendations */}
          {appointment.prescription?.dietRecommendations && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Apple className="w-6 h-6 mr-2 text-green-600" />
                Diet Recommendations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {appointment.prescription.dietRecommendations}
              </p>
            </div>
          )}

          {/* Lifestyle Advice */}
          {appointment.prescription?.lifestyleAdvice && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-secondary-600" />
                Lifestyle Advice
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {appointment.prescription.lifestyleAdvice}
              </p>
            </div>
          )}

          {/* Notes */}
          {appointment.prescription?.notes && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Additional Notes</h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                {appointment.prescription.notes}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Patient Details
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{appointment.patientName}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Age / Gender</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {appointment.patientAge} years / {appointment.patientGender}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-gray-700 dark:text-gray-300">{appointment.patientPhone}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-700 dark:text-gray-300 break-all">{appointment.patientEmail}</p>
              </div>
            </div>
          </div>

          {/* Hospital Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary-600" />
              Hospital Details
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {appointment.hospitalId?.name}
                </p>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <p>{appointment.hospitalId?.address?.street}</p>
                <p>{appointment.hospitalId?.address?.city}, {appointment.hospitalId?.address?.state}</p>
                <p>{appointment.hospitalId?.address?.pincode}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <a 
                  href={`tel:${appointment.hospitalId?.phone}`}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  {appointment.hospitalId?.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          {appointment.doctorId && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Doctor Details
              </h2>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-900 dark:text-white">
                  Dr. {appointment.doctorId.name}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {appointment.doctorId.specialization}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationView;
