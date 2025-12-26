import React, { useState } from 'react';
import { 
  Star, 
  Filter, 
  ThumbsUp, 
  MessageCircle, 
  Calendar, 
  ChevronDown,
  TrendingUp,
  Award,
  Shield,
  CheckCircle
} from 'lucide-react';
import ReviewModal from './ReviewModal';

const Reviews = () => {
  const [filter, setFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  const reviews = [
    {
      id: 1,
      user: { name: 'Rajesh Kumar', avatar: 'RK', verified: true },
      rating: 5,
      title: 'Excellent stay with amazing service!',
      comment: 'The staff was incredibly helpful, rooms were clean and comfortable. The breakfast buffet had great variety. Would definitely stay again!',
      date: '2 weeks ago',
      helpful: 24,
      replies: 2,
      photos: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32'],
      categories: {
        cleanliness: 5,
        service: 5,
        location: 4,
        value: 5
      }
    },
    {
      id: 2,
      user: { name: 'Priya Sharma', avatar: 'PS', verified: true },
      rating: 4,
      title: 'Great location and comfortable rooms',
      comment: 'Perfect location for exploring the city. Rooms were spacious and clean. The pool area could use some maintenance.',
      date: '1 month ago',
      helpful: 12,
      replies: 1,
      categories: {
        cleanliness: 4,
        service: 4,
        location: 5,
        value: 4
      }
    }
  ];

  const stats = {
    averageRating: 4.8,
    totalReviews: 2450,
    ratingBreakdown: [
      { stars: 5, count: 1800, percentage: 73 },
      { stars: 4, count: 400, percentage: 16 },
      { stars: 3, count: 150, percentage: 6 },
      { stars: 2, count: 70, percentage: 3 },
      { stars: 1, count: 30, percentage: 2 }
    ],
    categoryAverages: {
      cleanliness: 4.7,
      service: 4.8,
      location: 4.6,
      value: 4.5
    }
  };

  const getStarRating = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Guest Reviews</h1>
                <p className="text-blue-100">What our guests say about their stay</p>
              </div>
              
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Write a Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Stats */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Average Rating */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-5xl font-bold mb-2">{stats.averageRating}</div>
                  <div className="flex justify-center mb-3">
                    {getStarRating(Math.floor(stats.averageRating))}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stats.totalReviews.toLocaleString()} reviews
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold mb-4">Rating Breakdown</h3>
                  <div className="space-y-3">
                    {stats.ratingBreakdown.map(item => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-16">
                          <span className="text-sm">{item.stars}</span>
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-400"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm w-12 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Averages */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold mb-4">Category Averages</h3>
                  <div className="space-y-4">
                    {Object.entries(stats.categoryAverages).map(([category, rating]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="capitalize">{category}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < rating ? 'fill-blue-400 text-blue-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Filter size={20} />
                    <span className="font-medium">Filter by:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {['all', '5-stars', '4-stars', '3-stars', 'with-photos', 'recent'].map(f => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg capitalize ${
                          filter === f 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {f.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold">
                            {review.user.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{review.user.name}</h3>
                              {review.user.verified && (
                                <div className="flex items-center gap-1 text-sm text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                                  <CheckCircle size={12} />
                                  Verified Stay
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar size={12} />
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1 justify-end">
                            {getStarRating(review.rating)}
                          </div>
                          <span className="text-lg font-bold">{review.rating}.0</span>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="mb-4">
                        <h4 className="text-xl font-bold mb-2">{review.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>

                      {/* Category Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        {Object.entries(review.categories).map(([category, rating]) => (
                          <div key={category} className="text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{category}</div>
                            <div className="flex items-center justify-center gap-1 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    className={i < rating ? 'fill-blue-400 text-blue-400' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                              <span className="font-bold ml-1">{rating}.0</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Photos */}
                      {review.photos && (
                        <div className="flex gap-2 mb-4">
                          {review.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt=""
                              className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-90"
                            />
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:hover:text-white">
                            <ThumbsUp size={16} />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:hover:text-white">
                            <MessageCircle size={16} />
                            <span>Reply ({review.replies})</span>
                          </button>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Read More
                        </button>
                      </div>
                    </div>

                    {/* Hotel Response (if any) */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 border-t">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <Award className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold">Hotel Management Response</h4>
                            <span className="text-sm text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                              Official
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            Thank you for your wonderful review! We're delighted to hear you enjoyed your stay and look forward to welcoming you back soon.
                          </p>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Responded 1 day ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map(page => (
                    <button
                      key={page}
                      className={`w-10 h-10 rounded-lg ${
                        page === 1 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        hotel={{ name: 'Sample Hotel' }}
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={(review) => {
          console.log('Review submitted:', review);
          // Handle review submission
        }}
      />
    </div>
  );
};

export default Reviews;