import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 mb-8">
          <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Home size={20} />
            Go to Homepage
          </button>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600">Hotels</div>
            <div className="text-gray-600 dark:text-gray-400">Browse Stays</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-green-600">Bookings</div>
            <div className="text-gray-600 dark:text-gray-400">Manage Trips</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-amber-600">Menu</div>
            <div className="text-gray-600 dark:text-gray-400">Food & Drinks</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-purple-600">Contact</div>
            <div className="text-gray-600 dark:text-gray-400">Get Help</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;