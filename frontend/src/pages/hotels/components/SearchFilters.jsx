import React from 'react';
import { Star, Check, Wifi, Coffee, Car, Dumbbell, Bath, Users } from 'lucide-react';

const SearchFilters = ({ 
  priceRange, 
  setPriceRange, 
  rating, 
  setRating, 
  amenities, 
  setAmenities 
}) => {
  const amenitiesOptions = [
    { id: 'wifi', label: 'Free WiFi', icon: <Wifi size={16} /> },
    { id: 'breakfast', label: 'Breakfast', icon: <Coffee size={16} /> },
    { id: 'parking', label: 'Parking', icon: <Car size={16} /> },
    { id: 'gym', label: 'Gym', icon: <Dumbbell size={16} /> },
    { id: 'spa', label: 'Spa', icon: <Bath size={16} /> },
    { id: 'pool', label: 'Pool', icon: <Bath size={16} /> }
  ];

  const handleAmenityToggle = (amenityId) => {
    if (amenities.includes(amenityId)) {
      setAmenities(amenities.filter(id => id !== amenityId));
    } else {
      setAmenities([...amenities, amenityId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">Star Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(stars => (
            <button
              key={stars}
              onClick={() => setRating(rating === stars ? 0 : stars)}
              className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors ${
                rating === stars
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <span>{stars} stars & above</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">Amenities</h3>
        <div className="space-y-2">
          {amenitiesOptions.map(amenity => (
            <button
              key={amenity.id}
              onClick={() => handleAmenityToggle(amenity.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                amenities.includes(amenity.id)
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">{amenity.icon}</span>
                <span>{amenity.label}</span>
              </div>
              {amenities.includes(amenity.id) && (
                <Check size={16} className="text-green-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">Property Type</h3>
        <div className="space-y-2">
          {['Hotel', 'Resort', 'Villa', 'Homestay', 'Boutique'].map(type => (
            <button
              key={type}
              className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-gray-700 dark:text-gray-300">{type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;