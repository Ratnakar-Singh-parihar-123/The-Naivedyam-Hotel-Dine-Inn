import React, { useState } from 'react';
import { Star, MapPin, Wifi, Coffee, Car, Dumbbell, Waves, Utensils, Heart, Share2 } from 'lucide-react';

const HotelCard = ({ hotel, onBookNow, onViewDetails }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const amenitiesIcons = {
    wifi: <Wifi size={16} className="text-blue-600" />,
    restaurant: <Utensils size={16} className="text-green-600" />,
    parking: <Car size={16} className="text-gray-600" />,
    gym: <Dumbbell size={16} className="text-red-600" />,
    pool: <Waves size={16} className="text-cyan-600" />,
    spa: <Coffee size={16} className="text-purple-600" />
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Hotel Image */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {hotel.discountPrice && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              SAVE ₹{hotel.price - hotel.discountPrice}
            </span>
          </div>
        )}
        
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
          />
        </button>
      </div>

      {/* Hotel Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin size={16} />
              <span className="text-sm">{hotel.city}, India</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-lg">
              <Star size={16} className="fill-white" />
              <span className="font-bold">{hotel.rating}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{hotel.reviews} reviews</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
              {amenitiesIcons[amenity] || <Coffee size={16} />}
              <span className="text-xs font-medium capitalize">{amenity}</span>
            </div>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="text-xs text-gray-500 self-center">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            {hotel.discountPrice ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{hotel.discountPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{hotel.price}
                  </span>
                  <span className="text-sm text-green-600 font-bold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                    {Math.round((1 - hotel.discountPrice/hotel.price) * 100)}% OFF
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">per night + taxes</p>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{hotel.price}
                </span>
                <p className="text-xs text-gray-500">per night + taxes</p>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onViewDetails}
              className="px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 transition-colors"
            >
              View Details
            </button>
            <button
              onClick={onBookNow}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;