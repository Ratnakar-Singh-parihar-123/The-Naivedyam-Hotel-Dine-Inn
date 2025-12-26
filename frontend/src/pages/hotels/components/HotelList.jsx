import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Star, ChevronDown, Grid3x3, List } from 'lucide-react';
import HotelCard from '../components/HotelCard';
import SearchFilters from './SearchFilters';
import BookingModal from './BookingModal';
import { useHotel } from '../../../context/HotelContext';

const HotelList = () => {
  const { hotels, setSelectedHotel } = useHotel();
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // Added view mode state
  const [isMobile, setIsMobile] = useState(false); // Added mobile detection
  
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  // Filters
  const [priceRange, setPriceRange] = useState([1000, 50000]);
  const [rating, setRating] = useState(0);
  const [amenities, setAmenities] = useState([]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearch = () => {
    let filtered = [...hotels];
    
    // Location filter
    if (searchParams.location) {
      filtered = filtered.filter(h => 
        h.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }
    
    // Price filter
    filtered = filtered.filter(h => 
      h.price >= priceRange[0] && h.price <= priceRange[1]
    );
    
    // Rating filter
    if (rating > 0) {
      filtered = filtered.filter(h => h.rating >= rating);
    }
    
    // Amenities filter
    if (amenities.length > 0) {
      filtered = filtered.filter(h => 
        amenities.every(a => h.amenities?.includes(a))
      );
    }
    
    setFilteredHotels(filtered);
  };

  // Initialize with all hotels on mount
  useEffect(() => {
    if (hotels.length > 0) {
      setFilteredHotels(hotels);
    }
  }, [hotels]);

  useEffect(() => {
    handleSearch();
  }, [priceRange, rating, amenities, searchParams]);

  // Format date for input
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getNextDayDate = () => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 2);
    return nextDay.toISOString().split('T')[0];
  };

  // Initialize dates
  useEffect(() => {
    if (!searchParams.checkIn) {
      setSearchParams(prev => ({
        ...prev,
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: getTomorrowDate()
      }));
    }
  }, []);

  // Reset all filters
  const handleResetFilters = () => {
    setPriceRange([1000, 50000]);
    setRating(0);
    setAmenities([]);
    setSearchParams({
      location: '',
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: getTomorrowDate(),
      guests: 2
    });
  };

  // Handle quick search
  const handleQuickSearch = (city) => {
    setSearchParams(prev => ({
      ...prev,
      location: city
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Find Your Perfect Stay
          </h1>
          <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
            Discover amazing hotels at unbeatable prices
          </p>
          
          {/* Quick Search Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Mumbai', 'Delhi', 'Goa', 'Jaipur', 'Bangalore'].map(city => (
              <button
                key={city}
                onClick={() => handleQuickSearch(city)}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors text-sm md:text-base"
              >
                {city}
              </button>
            ))}
          </div>
          
          {/* Search Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                />
              </div>
              
              {/* Check-in */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              {/* Check-out */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                  min={searchParams.checkIn || getTomorrowDate()}
                />
              </div>
              
              {/* Guests */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  className="w-full pl-10 pr-8 py-2.5 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm md:text-base"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleSearch}
                className="flex-1 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg md:rounded-xl font-semibold md:font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                Search Hotels
              </button>
              <button 
                onClick={handleResetFilters}
                className="px-6 py-3 md:px-8 md:py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg md:rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-base md:text-lg"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md mb-4"
            >
              <div className="flex items-center gap-2">
                <Filter size={20} />
                <span className="font-bold">Filters</span>
              </div>
              <ChevronDown className={`transform ${showFilters ? 'rotate-180' : ''} transition-transform`} />
            </button>
            
            <div className={`${!isMobile || showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 sticky top-4">
                <SearchFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  rating={rating}
                  setRating={setRating}
                  amenities={amenities}
                  setAmenities={setAmenities}
                />
              </div>
            </div>
          </div>

          {/* Hotels Grid */}
          <div className="lg:w-3/4">
            {/* Header with stats and controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {filteredHotels.length} Hotels Found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    {searchParams.location ? `in ${searchParams.location}` : 'in all locations'}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 md:gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400' 
                          : 'text-gray-500'
                      }`}
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400' 
                          : 'text-gray-500'
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                  
                  {/* Sort Dropdown */}
                  <select 
                    className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    defaultValue="recommended"
                  >
                    <option value="recommended">Sort by: Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating: High to Low</option>
                    <option value="reviews">Reviews: Most First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hotels Display */}
            {filteredHotels.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6' 
                : 'space-y-4 md:space-y-6'
              }>
                {filteredHotels.map(hotel => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    viewMode={viewMode}
                    onBookNow={() => setSelectedHotelForBooking(hotel)}
                    onViewDetails={() => {
                      setSelectedHotel(hotel);
                      // Navigate to hotel detail page would be handled here
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <Search size={40} className="text-gray-400 md:w-16 md:h-16" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  No hotels found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 md:px-8 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-300 text-sm md:text-base"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination (optional) */}
            {filteredHotels.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Previous
                  </button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    2
                  </button>
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    3
                  </button>
                  <button className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedHotelForBooking && (
        <BookingModal
          hotel={selectedHotelForBooking}
          isOpen={!!selectedHotelForBooking}
          searchParams={searchParams}
          onClose={() => setSelectedHotelForBooking(null)}
          onConfirm={(bookingData) => {
            // Handle booking logic here
            console.log('Booking confirmed:', bookingData);
            setSelectedHotelForBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default HotelList;