import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const EmergencyButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/emergency')}
      className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 animate-pulse"
      aria-label="Emergency help"
    >
      <AlertCircle className="w-6 h-6" />
    </button>
  );
};

export default EmergencyButton;
