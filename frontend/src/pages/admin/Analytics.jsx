import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Hotel,
  Star,
  Download
} from 'lucide-react';

const Analytics = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Business insights and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <DollarSign className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={16} />
              <span className="font-medium">+12.5%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">₹1.2M</div>
          <div className="text-gray-600 dark:text-gray-400">Total Revenue</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Hotel className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={16} />
              <span className="font-medium">+8.2%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">245</div>
          <div className="text-gray-600 dark:text-gray-400">Total Bookings</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={16} />
              <span className="font-medium">+15.3%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">1,847</div>
          <div className="text-gray-600 dark:text-gray-400">New Users</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Star className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={16} />
              <span className="font-medium">+2.1%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">4.8</div>
          <div className="text-gray-600 dark:text-gray-400">Avg. Rating</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Revenue Overview</h3>
            <BarChart3 className="text-blue-600" />
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 65, 80, 60, 90, 75, 85].map((height, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                  style={{ height: `${height}%` }}
                />
                <div className="text-xs text-gray-500 mt-2">Day {index + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Bookings Trend</h3>
            <Calendar className="text-green-600" />
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[30, 45, 60, 50, 70, 65, 55, 75, 80, 65, 85, 90].map((height, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg"
                  style={{ height: `${height}%` }}
                />
                <div className="text-xs text-gray-500 mt-2">M{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Hotels */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-lg font-bold mb-6">Top Performing Hotels</h3>
        <div className="space-y-4">
          {[
            { name: 'Taj Mahal Palace', bookings: 245, revenue: '₹2.4M', rating: 4.8 },
            { name: 'The Oberoi', bookings: 198, revenue: '₹1.9M', rating: 4.7 },
            { name: 'ITC Grand Chola', bookings: 176, revenue: '₹1.6M', rating: 4.6 },
            { name: 'Leela Palace', bookings: 154, revenue: '₹1.4M', rating: 4.8 },
            { name: 'JW Marriott', bookings: 132, revenue: '₹1.2M', rating: 4.5 }
          ].map((hotel, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Hotel className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold">{hotel.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{hotel.bookings} bookings</span>
                    <span>•</span>
                    <span>{hotel.revenue} revenue</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold">{hotel.rating}</span>
                </div>
                <div className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
                  +12%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;