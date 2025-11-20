import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Stethoscope, AlertCircle, Heart, Shield, Clock } from 'lucide-react';

const Home = () => {
  const specialties = [
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Orthopedist',
    'Neurologist',
    'Gastroenterologist',
    'ENT Specialist'
  ];

  const features = [
    {
      icon: Heart,
      title: 'Expert Care',
      description: 'Connect with certified doctors and healthcare professionals'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Round-the-clock emergency services and support'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and completely confidential'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Smart Health Companion
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Book appointments, consult with doctors, and get personalized health guidance - all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/hospitals"
                className="flex items-center space-x-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                <span>Find Nearby Hospitals</span>
              </Link>
              <Link
                to="/book-appointment"
                className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg font-semibold hover:bg-white/20 transition"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>
              <Link
                to="/emergency"
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Emergency Help</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition dark:bg-gray-700/50"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Stethoscope}
              title="Symptom Checker"
              description="Get instant health insights based on your symptoms"
              link="/symptom-checker"
              color="blue"
            />
            <ServiceCard
              icon={MapPin}
              title="Find Hospitals"
              description="Locate nearby hospitals and healthcare facilities"
              link="/hospitals"
              color="green"
            />
            <ServiceCard
              icon={Calendar}
              title="Book Appointment"
              description="Schedule consultations with top doctors"
              link="/book-appointment"
              color="purple"
            />
            <ServiceCard
              icon={Heart}
              title="Health Records"
              description="Access your medical history and prescriptions"
              link="/my-appointments"
              color="red"
            />
            <ServiceCard
              icon={AlertCircle}
              title="Emergency Services"
              description="Quick access to emergency medical help"
              link="/emergency"
              color="orange"
            />
            <ServiceCard
              icon={Shield}
              title="Health Tips"
              description="Get personalized diet and lifestyle recommendations"
              link="/symptom-checker"
              color="teal"
            />
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Medical Specialties
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center hover:shadow-md transition cursor-pointer"
              >
                <p className="font-medium text-gray-800 dark:text-gray-200">{specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of users who trust Sehat App for their healthcare needs
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, link, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
    orange: 'from-orange-500 to-orange-600',
    teal: 'from-teal-500 to-teal-600'
  };

  return (
    <Link
      to={link}
      className="block p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Link>
  );
};

export default Home;
