import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  MapPin, 
  DollarSign, 
  Star, 
  Wifi, 
  Coffee, 
  Car, 
  Dumbbell, 
  Waves, 
  Utensils,
  Plus,
  X,
  Save,
  Image,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Globe,
  Phone,
  Mail,
  Clock,
  Users,
  Bed,
  Bath,
  Tv,
  Wind,
  Shield,
  Key
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddHotel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [hotelData, setHotelData] = useState({
    // Basic Information
    name: '',
    tagline: '',
    description: '',
    category: 'hotel',
    starRating: 3,
    
    // Location
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    latitude: '',
    longitude: '',
    
    // Contact
    email: '',
    phone: '',
    website: '',
    
    // Pricing
    basePrice: '',
    discountPrice: '',
    currency: 'INR',
    taxInclusive: true,
    
    // Facilities
    facilities: [],
    highlights: [],
    
    // Room Types
    roomTypes: [
      {
        id: Date.now(),
        type: 'Standard Room',
        description: 'Comfortable room with basic amenities',
        price: '',
        capacity: 2,
        size: '30',
        beds: 1,
        bathrooms: 1,
        amenities: ['wifi', 'tv', 'ac'],
        images: []
      }
    ],
    
    // Images
    mainImage: '',
    galleryImages: [],
    featured: false,
    status: 'active'
  });

  const [newFacility, setNewFacility] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  const facilitiesOptions = [
    { id: 'wifi', label: 'Free WiFi', icon: <Wifi size={16} /> },
    { id: 'restaurant', label: 'Restaurant', icon: <Utensils size={16} /> },
    { id: 'parking', label: 'Parking', icon: <Car size={16} /> },
    { id: 'pool', label: 'Swimming Pool', icon: <Waves size={16} /> },
    { id: 'gym', label: 'Gym', icon: <Dumbbell size={16} /> },
    { id: 'spa', label: 'Spa', icon: <Coffee size={16} /> },
    { id: '24/7', label: '24/7 Front Desk', icon: <Clock size={16} /> },
    { id: 'roomService', label: 'Room Service', icon: <Utensils size={16} /> },
    { id: 'airportShuttle', label: 'Airport Shuttle', icon: <Car size={16} /> },
    { id: 'businessCenter', label: 'Business Center', icon: <Coffee size={16} /> },
    { id: 'laundry', label: 'Laundry Service', icon: <Coffee size={16} /> },
    { id: 'concierge', label: 'Concierge', icon: <Shield size={16} /> },
    { id: 'safe', label: 'Safe Deposit Box', icon: <Key size={16} /> },
    { id: 'elevator', label: 'Elevator', icon: <Car size={16} /> },
    { id: 'bar', label: 'Bar/Lounge', icon: <Coffee size={16} /> }
  ];

  const roomAmenities = [
    { id: 'wifi', label: 'WiFi', icon: <Wifi size={14} /> },
    { id: 'tv', label: 'TV', icon: <Tv size={14} /> },
    { id: 'ac', label: 'AC', icon: <Wind size={14} /> },
    { id: 'heater', label: 'Heater', icon: <Wind size={14} /> },
    { id: 'minibar', label: 'Minibar', icon: <Coffee size={14} /> },
    { id: 'kettle', label: 'Electric Kettle', icon: <Coffee size={14} /> },
    { id: 'safe', label: 'Safe', icon: <Shield size={14} /> },
    { id: 'hairdryer', label: 'Hairdryer', icon: <Wind size={14} /> },
    { id: 'iron', label: 'Iron', icon: <Wind size={14} /> },
    { id: 'desk', label: 'Work Desk', icon: <Coffee size={14} /> }
  ];

  const categories = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'resort', label: 'Resort' },
    { value: 'villa', label: 'Villa' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'guesthouse', label: 'Guest House' },
    { value: 'boutique', label: 'Boutique Hotel' },
    { value: 'luxury', label: 'Luxury Hotel' },
    { value: 'budget', label: 'Budget Hotel' },
    { value: 'hostel', label: 'Hostel' }
  ];

  const starRatings = [1, 2, 3, 4, 5];

  const handleInputChange = (field, value) => {
    setHotelData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFacilityToggle = (facilityId) => {
    setHotelData(prev => {
      const facilities = [...prev.facilities];
      if (facilities.includes(facilityId)) {
        return { ...prev, facilities: facilities.filter(f => f !== facilityId) };
      } else {
        return { ...prev, facilities: [...facilities, facilityId] };
      }
    });
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHotelData(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }));
      setNewHighlight('');
    }
  };

  const removeHighlight = (index) => {
    setHotelData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleRoomTypeChange = (index, field, value) => {
    const updatedRoomTypes = [...hotelData.roomTypes];
    updatedRoomTypes[index] = {
      ...updatedRoomTypes[index],
      [field]: value
    };
    setHotelData(prev => ({ ...prev, roomTypes: updatedRoomTypes }));
  };

  const handleRoomAmenityToggle = (roomIndex, amenityId) => {
    const updatedRoomTypes = [...hotelData.roomTypes];
    const amenities = [...updatedRoomTypes[roomIndex].amenities];
    
    if (amenities.includes(amenityId)) {
      updatedRoomTypes[roomIndex].amenities = amenities.filter(a => a !== amenityId);
    } else {
      updatedRoomTypes[roomIndex].amenities = [...amenities, amenityId];
    }
    
    setHotelData(prev => ({ ...prev, roomTypes: updatedRoomTypes }));
  };

  const addRoomType = () => {
    setHotelData(prev => ({
      ...prev,
      roomTypes: [
        ...prev.roomTypes,
        {
          id: Date.now(),
          type: '',
          description: '',
          price: '',
          capacity: 2,
          size: '',
          beds: 1,
          bathrooms: 1,
          amenities: ['wifi', 'tv', 'ac'],
          images: []
        }
      ]
    }));
  };

  const removeRoomType = (index) => {
    if (hotelData.roomTypes.length > 1) {
      const updatedRoomTypes = hotelData.roomTypes.filter((_, i) => i !== index);
      setHotelData(prev => ({ ...prev, roomTypes: updatedRoomTypes }));
    }
  };

  const handleImageUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'main') {
          handleInputChange('mainImage', reader.result);
        } else {
          setHotelData(prev => ({
            ...prev,
            galleryImages: [...prev.galleryImages, reader.result]
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index) => {
    setHotelData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!hotelData.name.trim()) newErrors.name = 'Hotel name is required';
    if (!hotelData.description.trim()) newErrors.description = 'Description is required';
    if (!hotelData.address.trim()) newErrors.address = 'Address is required';
    if (!hotelData.city.trim()) newErrors.city = 'City is required';
    if (!hotelData.country.trim()) newErrors.country = 'Country is required';
    if (!hotelData.email.trim()) newErrors.email = 'Email is required';
    if (!hotelData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!hotelData.basePrice) newErrors.basePrice = 'Base price is required';
    
    hotelData.roomTypes.forEach((room, index) => {
      if (!room.type.trim()) newErrors[`roomType_${index}`] = 'Room type name is required';
      if (!room.price) newErrors[`roomPrice_${index}`] = 'Room price is required';
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Hotel data to be saved:', hotelData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/hotels');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving hotel:', error);
      setErrors({ submit: 'Failed to save hotel. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Hotel Added Successfully!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The hotel has been added to the system. Redirecting to hotels list...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Hotel</h1>
              <p className="text-gray-600 dark:text-gray-400">Fill in the details to add a new hotel to the platform</p>
            </div>
            <button
              onClick={() => navigate('/admin/hotels')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {['Basic Info', 'Location', 'Facilities', 'Rooms', 'Media', 'Review'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index === 0 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-2 font-medium">{step}</span>
                {index < 5 && (
                  <div className={`w-16 h-1 mx-4 ${
                    index === 0 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Image size={20} />
                  Basic Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Hotel Name *</label>
                    <input
                      type="text"
                      value={hotelData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Enter hotel name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tagline</label>
                    <input
                      type="text"
                      value={hotelData.tagline}
                      onChange={(e) => handleInputChange('tagline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="A short catchy phrase about your hotel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      value={hotelData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 h-40 ${
                        errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Describe your hotel in detail..."
                      rows={6}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={hotelData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Star Rating</label>
                      <div className="flex gap-2">
                        {starRatings.map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleInputChange('starRating', rating)}
                            className={`p-2 rounded-lg transition-all ${
                              hotelData.starRating >= rating
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                            }`}
                          >
                            <Star size={20} className={hotelData.starRating >= rating ? 'fill-current' : ''} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin size={20} />
                  Location Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <input
                      type="text"
                      value={hotelData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Full street address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        value={hotelData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input
                        type="text"
                        value={hotelData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="State/Province"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Pincode</label>
                      <input
                        type="text"
                        value={hotelData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="Postal code"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Country *</label>
                      <input
                        type="text"
                        value={hotelData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                          errors.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.country}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Coordinates (Optional)</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={hotelData.latitude}
                          onChange={(e) => handleInputChange('latitude', e.target.value)}
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="Latitude"
                        />
                        <input
                          type="text"
                          value={hotelData.longitude}
                          onChange={(e) => handleInputChange('longitude', e.target.value)}
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="Longitude"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          value={hotelData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="contact@hotel.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          value={hotelData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="url"
                        value={hotelData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="https://www.hotelwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Facilities & Highlights */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Facilities & Highlights</h2>
                
                <div className="space-y-8">
                  {/* Facilities */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Select Facilities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {facilitiesOptions.map(facility => (
                        <button
                          key={facility.id}
                          type="button"
                          onClick={() => handleFacilityToggle(facility.id)}
                          className={`flex flex-col items-center p-3 border rounded-xl transition-all ${
                            hotelData.facilities.includes(facility.id)
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <div className={`mb-2 ${
                            hotelData.facilities.includes(facility.id)
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {facility.icon}
                          </div>
                          <span className="text-xs text-center">{facility.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Key Highlights</h3>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddHighlight()}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl"
                        placeholder="Add a highlight (e.g., 'Sea View', 'Free Breakfast')"
                      />
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {hotelData.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-full"
                        >
                          <span>{highlight}</span>
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Types */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Room Types</h2>
                  <button
                    type="button"
                    onClick={addRoomType}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    <Plus size={18} />
                    Add Room Type
                  </button>
                </div>
                
                <div className="space-y-6">
                  {hotelData.roomTypes.map((room, index) => (
                    <div key={room.id} className="border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Room Type #{index + 1}</h3>
                        {hotelData.roomTypes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRoomType(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Room Type Name *</label>
                          <input
                            type="text"
                            value={room.type}
                            onChange={(e) => handleRoomTypeChange(index, 'type', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                              errors[`roomType_${index}`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="e.g., Deluxe Room, Executive Suite"
                          />
                          {errors[`roomType_${index}`] && (
                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                              <AlertCircle size={14} />
                              {errors[`roomType_${index}`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            value={room.description}
                            onChange={(e) => handleRoomTypeChange(index, 'description', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Describe this room type..."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Price per night *</label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <input
                                type="number"
                                value={room.price}
                                onChange={(e) => handleRoomTypeChange(index, 'price', e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                                  errors[`roomPrice_${index}`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                }`}
                                placeholder="0"
                              />
                            </div>
                            {errors[`roomPrice_${index}`] && (
                              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors[`roomPrice_${index}`]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Capacity</label>
                            <div className="relative">
                              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                              <select
                                value={room.capacity}
                                onChange={(e) => handleRoomTypeChange(index, 'capacity', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                              >
                                {[1, 2, 3, 4, 5].map(num => (
                                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Room Size (sq ft)</label>
                            <input
                              type="text"
                              value={room.size}
                              onChange={(e) => handleRoomTypeChange(index, 'size', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., 350"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium mb-2">Beds</label>
                              <div className="relative">
                                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <select
                                  value={room.beds}
                                  onChange={(e) => handleRoomTypeChange(index, 'beds', e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                                >
                                  {[1, 2, 3, 4].map(num => (
                                    <option key={num} value={num}>{num} {num === 1 ? 'Bed' : 'Beds'}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Bathrooms</label>
                              <div className="relative">
                                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <select
                                  value={room.bathrooms}
                                  onChange={(e) => handleRoomTypeChange(index, 'bathrooms', e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                                >
                                  {[1, 2, 3].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-3">Room Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {roomAmenities.map(amenity => (
                              <button
                                key={amenity.id}
                                type="button"
                                onClick={() => handleRoomAmenityToggle(index, amenity.id)}
                                className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-all ${
                                  room.amenities.includes(amenity.id)
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-700'
                                }`}
                              >
                                <div className={`${
                                  room.amenities.includes(amenity.id)
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                  {amenity.icon}
                                </div>
                                <span className="text-sm">{amenity.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Media */}
            <div className="lg:col-span-1 space-y-8">
              {/* Pricing Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign size={20} />
                  Pricing Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Base Price (Starting from) *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        value={hotelData.basePrice}
                        onChange={(e) => handleInputChange('basePrice', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                          errors.basePrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="0"
                      />
                    </div>
                    {errors.basePrice && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.basePrice}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Discounted Price (Optional)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="number"
                        value={hotelData.discountPrice}
                        onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                    {hotelData.discountPrice && hotelData.basePrice && (
                      <div className="mt-2 text-green-600 font-medium">
                        Discount: {Math.round((1 - hotelData.discountPrice/hotelData.basePrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <select
                      value={hotelData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-medium">Tax Inclusive</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Prices include all taxes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={hotelData.taxInclusive}
                        onChange={() => handleInputChange('taxInclusive', !hotelData.taxInclusive)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Media Upload */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Media Upload</h2>
                
                <div className="space-y-6">
                  {/* Main Image */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Main Hotel Image *</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                      {hotelData.mainImage ? (
                        <div className="relative">
                          <img 
                            src={hotelData.mainImage} 
                            alt="Main hotel" 
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleInputChange('mainImage', '')}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-400 mb-2">Click to upload main image</p>
                          <p className="text-sm text-gray-500">Recommended: 1200x800px, JPG or PNG</p>
                          <label className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
                            Browse Files
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload('main', e)}
                              className="hidden"
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Gallery Images</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Upload additional photos</p>
                      <p className="text-sm text-gray-500">Up to 10 images, 5MB each</p>
                      <label className="mt-4 inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                        Add Photos
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleImageUpload('gallery', e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    {/* Gallery Preview */}
                    {hotelData.galleryImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {hotelData.galleryImages.map((img, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={img} 
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status & Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Status & Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-medium">Featured Hotel</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Show on homepage</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={hotelData.featured}
                        onChange={() => handleInputChange('featured', !hotelData.featured)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Hotel Status</label>
                    <select
                      value={hotelData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="coming_soon">Coming Soon</option>
                      <option value="under_renovation">Under Renovation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Saving Hotel...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Add Hotel
                  </>
                )}
              </button>

              {/* Error Message */}
              {errors.submit && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle size={20} />
                    <span className="font-medium">{errors.submit}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;