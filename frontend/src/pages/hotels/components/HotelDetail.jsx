import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Users, 
  Wifi, 
  Coffee, 
  Car, 
  Dumbbell, 
  Bath, 
  Tv, 
  Wind, 
  Key, 
  Shield,
  ChevronLeft,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  Share2,
  Heart
} from 'lucide-react';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  // Sample hotel data - in real app this would come from API
  const hotel = {
    id: 1,
    name: "LuxeStay Grand",
    location: "Mumbai, India",
    rating: 4.9,
    reviews: 1245,
    price: 15999,
    originalPrice: 19999,
    description: "Luxury 5-star hotel with panoramic city views, world-class amenities, and exceptional service.",
    amenities: [
      { icon: <Wifi size={20} />, label: "Free WiFi", available: true },
      { icon: <Coffee size={20} />, label: "Breakfast Included", available: true },
      { icon: <Car size={20} />, label: "Free Parking", available: true },
      { icon: <Dumbbell size={20} />, label: "Fitness Center", available: true },
      { icon: <Bath size={20} />, label: "Spa & Wellness", available: true },
      { icon: <Tv size={20} />, label: "Entertainment", available: true },
      { icon: <Wind size={20} />, label: "Air Conditioning", available: true },
      { icon: <Key size={20} />, label: "Safe Deposit", available: true },
      { icon: <Shield size={20} />, label: "24/7 Security", available: true },
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe Room",
        description: "Spacious room with city view",
        price: 15999,
        capacity: 2,
        amenities: ["King Bed", "WiFi", "TV", "AC"],
        available: true
      },
      {
        id: 2,
        name: "Executive Suite",
        description: "Luxury suite with living area",
        price: 22999,
        capacity: 3,
        amenities: ["King Bed", "WiFi", "TV", "AC", "Minibar"],
        available: true
      },
      {
        id: 3,
        name: "Presidential Suite",
        description: "Ultimate luxury experience",
        price: 35999,
        capacity: 4,
        amenities: ["King Bed", "WiFi", "TV", "AC", "Minibar", "Jacuzzi"],
        available: true
      }
    ]
  };

  const handleBookNow = (roomId) => {
    navigate(`/hotel/${id}/book?room=${roomId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6"
      >
        <ChevronLeft size={20} />
        Back to Hotels
      </button>

      {/* Hotel Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Image */}
          <div className="lg:w-2/3">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  FEATURED
                </span>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {hotel.images.slice(1).map((img, index) => (
                <div key={index} className="h-20 rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`${hotel.name} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Info */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                <MapPin size={18} />
                <span>{hotel.location}</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-gray-900 dark:text-white">{hotel.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400">({hotel.reviews} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₹{hotel.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{hotel.originalPrice}
                  </span>
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    Save ₹{hotel.originalPrice - hotel.price}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">per night • Includes taxes & fees</p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => handleBookNow(hotel.rooms[0].id)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all duration-300"
                >
                  Book Now
                </button>
                <button className="w-full py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-blue-500 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Hotel Features */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="text-blue-500">{amenity.icon}</div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Rooms</h2>
        <div className="space-y-4">
          {hotel.rooms.map((room) => (
            <div
              key={room.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedRoom === room.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{room.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{room.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-sm">{room.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{room.price}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">per night</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(room.id);
                    }}
                    className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all"
                  >
                    Select Room
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {hotel.description}
          </p>
          <div className="mt-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Check-in/Check-out</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" />
                  <span className="font-medium">Check-in</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">From 2:00 PM</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" />
                  <span className="font-medium">Check-out</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Until 12:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Amenities</h2>
          <div className="grid grid-cols-2 gap-4">
            {hotel.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`${amenity.available ? 'text-green-500' : 'text-gray-400'}`}>
                  {amenity.available ? <CheckCircle size={20} /> : <XCircle size={20} />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 dark:text-gray-300">{amenity.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300">{amenity.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;