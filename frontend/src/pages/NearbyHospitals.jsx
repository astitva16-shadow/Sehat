import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { hospitalAPI } from '../services/api';
import { MapPin, Phone, Navigation, Star, Clock, List, Map as MapIcon } from 'lucide-react';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [locationPermission, setLocationPermission] = useState('prompt');

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocationPermission('granted');
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationPermission('denied');
          setError('Location access denied. Showing all hospitals.');
          fetchAllHospitals();
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      fetchAllHospitals();
    }
  };

  const fetchNearbyHospitals = async (lat, lng) => {
    try {
      const response = await hospitalAPI.getNearby(lat, lng, 50); // 50km radius
      setHospitals(response.data.hospitals);
      setError('');
    } catch (err) {
      setError('Failed to fetch hospitals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllHospitals = async () => {
    try {
      const response = await hospitalAPI.getAll();
      setHospitals(response.data.hospitals);
      setError('');
    } catch (err) {
      setError('Failed to fetch hospitals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Nearby Hospitals
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find healthcare facilities near you
        </p>
      </div>

      {/* Location status */}
      {error && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">{error}</p>
        </div>
      )}

      {locationPermission === 'granted' && userLocation && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-300">
            Showing hospitals near your location ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
          </p>
        </div>
      )}

      {/* View toggle */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            viewMode === 'list'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          <List className="w-5 h-5" />
          <span>List View</span>
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            viewMode === 'map'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          <MapIcon className="w-5 h-5" />
          <span>Map View</span>
        </button>
      </div>

      {/* Map View */}
      {viewMode === 'map' && userLocation && (
        <div className="mb-8 h-96 rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* User location marker */}
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>Your Location</Popup>
            </Marker>

            {/* Hospital markers */}
            {hospitals.map((hospital) => (
              <Marker
                key={hospital._id}
                position={[
                  hospital.location.coordinates[1],
                  hospital.location.coordinates[0]
                ]}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{hospital.name}</h3>
                    <p className="text-sm text-gray-600">{hospital.address.city}</p>
                    {hospital.distance && (
                      <p className="text-sm text-primary-600">{hospital.distance} km away</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* List View */}
      <div className="grid md:grid-cols-2 gap-6">
        {hospitals.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No hospitals found in your area</p>
          </div>
        ) : (
          hospitals.map((hospital) => (
            <HospitalCard key={hospital._id} hospital={hospital} />
          ))
        )}
      </div>
    </div>
  );
};

const HospitalCard = ({ hospital }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {hospital.name}
          </h3>
          {hospital.emergencyAvailable && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              Emergency Available
            </span>
          )}
        </div>
        {hospital.rating > 0 && (
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-900 dark:text-white">{hospital.rating}</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
          <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            {hospital.address.street}, {hospital.address.city}, {hospital.address.state} - {hospital.address.pincode}
          </p>
        </div>
        
        {hospital.distance && (
          <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
            <Navigation className="w-5 h-5" />
            <p className="text-sm font-medium">{hospital.distance} km away</p>
          </div>
        )}

        {hospital.timing && (
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-5 h-5" />
            <p className="text-sm">
              {hospital.timing.open === '00:00' && hospital.timing.close === '23:59'
                ? 'Open 24/7'
                : `${hospital.timing.open} - ${hospital.timing.close}`}
            </p>
          </div>
        )}
      </div>

      {hospital.specialties && hospital.specialties.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
            {hospital.specialties.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{hospital.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <a
          href={`tel:${hospital.phone}`}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Phone className="w-4 h-4" />
          <span>Call Hospital</span>
        </a>
        <Link
          to={`/book-appointment?hospital=${hospital._id}`}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default NearbyHospitals;
