import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Calendar, Users, Star } from 'lucide-react';
import HotelCard from './';

const HotelSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [filters, setFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    priceRange: [1000, 50000],
    rating: 0,
    amenities: []
  });

  // Sample search results
  const searchResults = [
    {
      id: 1,
      name: "LuxeStay Grand",
      location: "Mumbai",
      rating: 4.9,
      price: 15999,
      originalPrice: 19999,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      description: "Luxury 5-star hotel with panoramic city views",
      amenities: ["wifi", "pool", "spa", "gym"]
    },
    // Add more results...
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Search Hotels
        </h1>
        {query && (
          <p className="text-gray-600 dark:text-gray-400">
            Showing results for: <span className="font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Filter size={20} />
              Filters
            </h2>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
                <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Dates */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dates
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.checkIn}
                    onChange={(e) => setFilters({...filters, checkIn: e.target.value})}
                  />
                  <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.checkOut}
                    onChange={(e) => setFilters({...filters, checkOut: e.target.value})}
                  />
                  <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Guests
              </label>
              <div className="relative">
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.guests}
                  onChange={(e) => setFilters({...filters, guests: parseInt(e.target.value)})}
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
                <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                className="w-full"
              />
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-2">
                {[4, 3, 2, 1, 0].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setFilters({...filters, rating})}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                      filters.rating === rating
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Star size={14} className={rating > 0 ? 'text-amber-400' : 'text-gray-400'} />
                    <span>{rating > 0 ? `${rating}+` : 'Any'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all duration-300"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {searchResults.length} Hotels Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Sorted by: <span className="font-semibold">Recommended</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  Sort by
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {searchResults.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>

          {/* No Results */}
          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No hotels found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;