import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hospitalAPI } from '../services/api';
import { AlertCircle, Phone, MapPin, Navigation, Activity } from 'lucide-react';

const Emergency = () => {
  const [emergencyHospitals, setEmergencyHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchEmergencyHospitals(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          fetchAllEmergencyHospitals();
        }
      );
    } else {
      fetchAllEmergencyHospitals();
    }
  };

  const fetchEmergencyHospitals = async (lat, lng) => {
    try {
      const response = await hospitalAPI.getEmergency(lat, lng);
      setEmergencyHospitals(response.data.hospitals);
    } catch (err) {
      console.error('Error fetching emergency hospitals:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEmergencyHospitals = async () => {
    try {
      const response = await hospitalAPI.getAll({ emergency: true });
      setEmergencyHospitals(response.data.hospitals);
    } catch (err) {
      console.error('Error fetching emergency hospitals:', err);
    } finally {
      setLoading(false);
    }
  };

  const emergencyNumbers = [
    { name: 'National Emergency', number: '112', description: 'All emergencies' },
    { name: 'Ambulance', number: '108', description: 'Medical emergencies' },
    { name: 'Police', number: '100', description: 'Law enforcement' },
    { name: 'Fire Service', number: '101', description: 'Fire emergencies' }
  ];

  return (
    <div className="min-h-screen bg-red-50 dark:bg-gray-900">
      {/* Emergency Header */}
      <div className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 animate-pulse">
            <AlertCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Emergency Help</h1>
          <p className="text-xl text-white/90 mb-6">
            Immediate medical assistance and emergency services
          </p>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">⚠️ WHEN TO CALL EMERGENCY SERVICES</p>
            <ul className="text-sm text-left space-y-1">
              <li>• Severe chest pain or difficulty breathing</li>
              <li>• Unconsciousness or severe bleeding</li>
              <li>• Suspected heart attack or stroke</li>
              <li>• Severe injuries from accidents</li>
              <li>• Any life-threatening situation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Emergency Numbers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-2 text-red-600" />
            Emergency Helpline Numbers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyNumbers.map((item, index) => (
              <a
                key={index}
                href={`tel:${item.number}`}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-red-200 dark:border-red-800"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full mb-3 mx-auto">
                  <Phone className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-1">
                  {item.name}
                </h3>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 text-center mb-2">
                  {item.number}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6">
            <Activity className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2">First Aid Tips</h3>
            <p className="text-sm text-white/90 mb-4">
              Stay calm. Check breathing. Stop severe bleeding. Call for help immediately.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6">
            <MapPin className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Share Location</h3>
            <p className="text-sm text-white/90 mb-4">
              Enable location services to help emergency services find you quickly.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
            <AlertCircle className="w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
            <p className="text-sm text-white/90 mb-4">
              Keep your phone charged and accessible at all times during emergencies.
            </p>
          </div>
        </div>

        {/* Nearby Emergency Hospitals */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-red-600" />
            Nearest Emergency Hospitals
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Finding emergency hospitals...</p>
            </div>
          ) : emergencyHospitals.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No emergency hospitals found. Please call emergency services.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-600"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {hospital.name}
                    </h3>
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full">
                      24/7 Emergency
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        {hospital.address.street}, {hospital.address.city}
                      </p>
                    </div>

                    {hospital.distance && (
                      <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                        <Navigation className="w-5 h-5" />
                        <p className="text-sm font-bold">{hospital.distance} km away</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={`tel:${hospital.phone}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Now</span>
                    </a>
                    <Link
                      to={`/hospitals`}
                      className="flex items-center justify-center px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Important Instructions */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Important Emergency Instructions
          </h3>
          <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-400">
            <li>1. <strong>Stay Calm:</strong> Take deep breaths and assess the situation</li>
            <li>2. <strong>Call for Help:</strong> Dial emergency services immediately if needed</li>
            <li>3. <strong>Provide Information:</strong> Clearly state your location and the nature of emergency</li>
            <li>4. <strong>Follow Instructions:</strong> Listen carefully to the dispatcher's guidance</li>
            <li>5. <strong>Do Not Move:</strong> Unless in immediate danger, stay at your location</li>
            <li>6. <strong>Keep Phone Accessible:</strong> Emergency services may need to contact you</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
