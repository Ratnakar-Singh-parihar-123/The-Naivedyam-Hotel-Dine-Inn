import React, { useState } from 'react';
import { X, Star, Camera, Smile, Frown, Meh } from 'lucide-react';

const ReviewModal = ({ hotel, isOpen, onClose, onSubmit }) => {
  const [review, setReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    cleanliness: 5,
    service: 5,
    location: 5,
    value: 5,
    images: []
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(review);
      setSubmitting(false);
      onClose();
    }, 1500);
  };

  const handleRatingClick = (rating) => {
    setReview(prev => ({ ...prev, rating }));
  };

  const getEmoji = (rating) => {
    if (rating >= 4) return <Smile className="text-green-600" />;
    if (rating >= 3) return <Meh className="text-amber-600" />;
    return <Frown className="text-red-600" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Write a Review</h2>
                <p className="text-gray-600 dark:text-gray-400">{hotel.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {/* Overall Rating */}
              <div>
                <h3 className="text-lg font-bold mb-4">Overall Rating</h3>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="text-4xl hover:scale-110 transition-transform"
                    >
                      <Star
                        className={star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                  <span className="text-2xl font-bold ml-4">{review.rating}.0</span>
                  <span className="ml-2">{getEmoji(review.rating)}</span>
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Review Title</label>
                <input
                  type="text"
                  value={review.title}
                  onChange={(e) => setReview({...review, title: e.target.value})}
                  placeholder="Summarize your experience"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Detailed Review */}
              <div>
                <label className="block text-sm font-medium mb-2">Detailed Review</label>
                <textarea
                  value={review.comment}
                  onChange={(e) => setReview({...review, comment: e.target.value})}
                  placeholder="Share details of your experience at this hotel..."
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-40"
                  rows={5}
                  required
                />
              </div>

              {/* Category Ratings */}
              <div>
                <h3 className="text-lg font-bold mb-4">Rate by Category</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Cleanliness', value: review.cleanliness, field: 'cleanliness' },
                    { label: 'Service', value: review.service, field: 'service' },
                    { label: 'Location', value: review.location, field: 'location' },
                    { label: 'Value', value: review.value, field: 'value' }
                  ].map(category => (
                    <div key={category.field} className="space-y-2">
                      <label className="text-sm font-medium">{category.label}</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReview({...review, [category.field]: star})}
                            className="text-xl"
                          >
                            <Star
                              className={star <= category.value ? 'fill-blue-400 text-blue-400' : 'text-gray-300'}
                              size={20}
                            />
                          </button>
                        ))}
                        <span className="ml-2 font-bold">{category.value}.0</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <h3 className="text-lg font-bold mb-4">Add Photos (Optional)</h3>
                <div className="border-2 border-dashed rounded-xl p-8 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Drag & drop photos or click to upload
                  </p>
                  <p className="text-sm text-gray-500">Up to 10 photos, 5MB each</p>
                  <button
                    type="button"
                    className="mt-4 px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-medium"
                  >
                    Browse Photos
                  </button>
                </div>
              </div>

              {/* Anonymous Review */}
              <div className="flex items-center gap-3">
                <input type="checkbox" id="anonymous" className="w-5 h-5" />
                <label htmlFor="anonymous" className="text-sm">
                  Post review anonymously
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;