import React, { useState } from 'react';
import { 
  Star, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye,
  Trash2,
  Flag,
  Calendar
} from 'lucide-react';

const ReviewsAdmin = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const reviews = [
    {
      id: 1,
      user: 'John Doe',
      hotel: 'Taj Mahal Palace',
      rating: 5,
      comment: 'Excellent service!',
      date: '2024-01-15',
      status: 'approved',
      verified: true
    },
    // Add more reviews...
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and moderate user reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="text-2xl font-bold text-blue-600">2450</div>
          <div className="text-gray-600 dark:text-gray-400">Total Reviews</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="text-2xl font-bold text-green-600">2300</div>
          <div className="text-gray-600 dark:text-gray-400">Approved</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="text-2xl font-bold text-amber-600">100</div>
          <div className="text-gray-600 dark:text-gray-400">Pending</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="text-2xl font-bold text-red-600">50</div>
          <div className="text-gray-600 dark:text-gray-400">Flagged</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 border rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="all">All Reviews</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="5-stars">5 Stars</option>
              <option value="1-2-stars">1-2 Stars</option>
            </select>
            
            <button className="px-4 py-2.5 border rounded-lg flex items-center gap-2">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Review</th>
                <th className="py-3 px-4 text-left">Hotel</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {reviews.map(review => (
                <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium mb-1">{review.user}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {review.comment}
                      </p>
                      {review.verified && (
                        <div className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full mt-1">
                          <CheckCircle size={10} />
                          Verified Stay
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium">{review.hotel}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="font-bold ml-2">{review.rating}.0</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span>{review.date}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      review.status === 'approved' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : review.status === 'flagged'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {review.status === 'approved' ? <CheckCircle size={12} /> : 
                       review.status === 'flagged' ? <Flag size={12} /> : 
                       <XCircle size={12} />}
                      <span className="capitalize">{review.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Approve">
                        <CheckCircle size={16} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Flag">
                        <Flag size={16} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAdmin;