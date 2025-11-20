import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appointmentAPI } from '../services/api';
import { Calendar, MapPin, Clock, FileText, Eye, AlertCircle } from 'lucide-react';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, scheduled, completed, cancelled

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getMyAppointments();
      setAppointments(response.data.appointments);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Appointments
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your healthcare appointments
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        {[
          { value: 'all', label: 'All Appointments' },
          { value: 'scheduled', label: 'Scheduled' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' }
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === item.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No appointments found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filter === 'all' 
              ? "You haven't booked any appointments yet."
              : `No ${filter} appointments found.`}
          </p>
          <Link
            to="/book-appointment"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Book an Appointment
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} getStatusColor={getStatusColor} />
          ))}
        </div>
      )}
    </div>
  );
};

const AppointmentCard = ({ appointment, getStatusColor }) => {
  const appointmentDate = new Date(appointment.appointmentDate);
  const isUpcoming = appointmentDate > new Date() && appointment.status === 'scheduled';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${isUpcoming ? 'border-l-4 border-primary-600' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {appointment.hospitalId?.name || 'Hospital'}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
            {isUpcoming && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-semibold">
                Upcoming
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">
              {appointmentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-5 h-5" />
            <span className="text-sm">{appointment.appointmentTime}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">
              {appointment.hospitalId?.address?.city}, {appointment.hospitalId?.address?.state}
            </span>
          </div>
          {appointment.doctorId && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <FileText className="w-5 h-5" />
              <span className="text-sm">
                Dr. {appointment.doctorId.name} ({appointment.doctorId.specialization})
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Symptoms:</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.symptoms}</p>
      </div>

      {appointment.status === 'completed' && appointment.prescription && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                Prescription Available
              </p>
              <p className="text-xs text-green-700 dark:text-green-400">
                Your consultation has been completed and prescription is ready to view.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        {appointment.status === 'completed' ? (
          <Link
            to={`/consultation/${appointment._id}`}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            <Eye className="w-4 h-4" />
            <span>View Consultation</span>
          </Link>
        ) : appointment.status === 'scheduled' && (
          <>
            <Link
              to={`/consultation/${appointment._id}`}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </Link>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to cancel this appointment?')) {
                  // Handle cancellation
                  appointmentAPI.cancel(appointment._id).then(() => {
                    window.location.reload();
                  });
                }
              }}
              className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
