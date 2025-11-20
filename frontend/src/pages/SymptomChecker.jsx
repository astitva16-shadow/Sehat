import React, { useState } from 'react';
import { symptomAPI } from '../services/api';
import { Stethoscope, AlertTriangle, Heart, Apple, Home as HomeIcon, AlertCircle } from 'lucide-react';

const SymptomChecker = () => {
  const [formData, setFormData] = useState({
    symptoms: '',
    age: '',
    gender: 'male',
    existingConditions: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await symptomAPI.check({
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined
      });
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getConcernColor = (level) => {
    switch (level) {
      case 'Severe':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'Moderate':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      default:
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
          <Stethoscope className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Symptom Checker
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get instant health insights based on your symptoms
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-1">
            Important Disclaimer
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            This tool provides general information only and is NOT a substitute for professional medical advice. 
            Always consult a qualified healthcare professional for proper diagnosis and treatment.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Describe Your Symptoms *
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              rows="4"
              required
              value={formData.symptoms}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              placeholder="E.g., I have a fever, headache, and body pain for the past 2 days..."
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Be as specific as possible about your symptoms, duration, and severity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Age (Optional)
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="25"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="existingConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Existing Medical Conditions (Optional)
            </label>
            <input
              id="existingConditions"
              name="existingConditions"
              type="text"
              value={formData.existingConditions}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="E.g., Diabetes, Hypertension"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Emergency Warning */}
          {analysis.urgency === 'emergency' && (
            <div className="p-6 bg-red-600 text-white rounded-xl shadow-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">MEDICAL EMERGENCY</h3>
                  <p className="text-lg mb-4">{analysis.message}</p>
                  <div className="flex space-x-3">
                    <a
                      href="tel:112"
                      className="px-4 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Call 112
                    </a>
                    <a
                      href="tel:108"
                      className="px-4 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                      Call 108
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Concern Level */}
          <div className={`p-6 border-2 rounded-xl ${getConcernColor(analysis.concernLevel)}`}>
            <h3 className="text-lg font-semibold mb-2">Concern Level: {analysis.concernLevel}</h3>
            {analysis.urgency === 'prompt' && (
              <p className="text-sm">We recommend consulting a doctor soon.</p>
            )}
          </div>

          {/* Possible Conditions */}
          {analysis.possibleConditions && analysis.possibleConditions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Possible Conditions
                </h3>
              </div>
              <ul className="space-y-2">
                {analysis.possibleConditions.map((condition, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Home Care Tips */}
          {analysis.homeCare && analysis.homeCare.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <HomeIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Home Care Tips
                </h3>
              </div>
              <ul className="space-y-2">
                {analysis.homeCare.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-secondary-600 dark:text-secondary-400 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Diet Tips */}
          {analysis.dietTips && analysis.dietTips.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Apple className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Diet Recommendations
                </h3>
              </div>
              <ul className="space-y-2">
                {analysis.dietTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 dark:text-green-400 mt-1">🍎</span>
                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Specialty */}
          {analysis.suggestedSpecialty && (
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Recommended Specialist</h3>
              <p className="text-xl font-bold mb-4">{analysis.suggestedSpecialty}</p>
              <a
                href="/book-appointment"
                className="inline-block px-6 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Book Appointment
              </a>
            </div>
          )}

          {/* Disclaimer */}
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              {analysis.disclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
