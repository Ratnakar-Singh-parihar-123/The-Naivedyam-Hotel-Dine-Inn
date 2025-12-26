import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Shield, 
  CreditCard, 
  Calendar, 
  Users, 
  Bed, 
  MapPin, 
  ArrowLeft,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useHotel } from '../../../context/HotelContext';
import PaymentModal from '../components/PaymentModal';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hotels, bookHotel, user, calculateTotal } = useHotel();
  
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    hotelId: id,
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: { adults: 2, children: 0, rooms: 1 },
    roomType: "Deluxe Room",
    specialRequests: '',
    contactInfo: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: "India"
    }
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const foundHotel = hotels.find(h => h.id === parseInt(id));
    if (foundHotel) {
      setHotel(foundHotel);
      setBookingData(prev => ({
        ...prev,
        roomType: foundHotel.roomTypes[0]?.type || "Standard Room"
      }));
    }
    setLoading(false);
  }, [id, hotels]);

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const calculateBookingDetails = () => {
    if (!hotel) return {};
    
    const selectedRoom = hotel.roomTypes.find(r => r.type === bookingData.roomType);
    const nights = Math.ceil(
      (new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24)
    );
    
    const roomPrice = selectedRoom?.price || hotel.price;
    const subtotal = roomPrice * nights * bookingData.guests.rooms;
    const tax = subtotal * 0.18;
    const serviceCharge = subtotal * 0.05;
    const total = subtotal + tax + serviceCharge;
    
    return {
      nights,
      roomPrice,
      subtotal,
      tax,
      serviceCharge,
      total
    };
  };

  const handleBooking = async (paymentMethod) => {
    const bookingDetails = calculateBookingDetails();
    const newBooking = {
      ...bookingData,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      totalPrice: bookingDetails.total,
      paymentMethod,
      bookingDate: new Date().toISOString(),
      bookingId: `BK${Date.now()}`
    };
    
    await bookHotel(hotel.id, newBooking);
    setBookingConfirmed(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Hotel not found</h2>
          <button
            onClick={() => navigate('/hotels')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Browse Hotels
          </button>
        </div>
      </div>
    );
  }

  const bookingDetails = calculateBookingDetails();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            Back to Hotel
          </button>
          <h1 className="text-3xl font-bold mt-4">Complete Your Booking</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Hotel Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin size={16} />
                      <span>{hotel.city}, India</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{bookingData.guests.adults} Adults, {bookingData.guests.children} Children</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed size={14} />
                        <span>{bookingData.roomType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FileText size={20} />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={bookingData.contactInfo.name}
                      onChange={(e) => handleContactChange('name', e.target.value)}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={bookingData.contactInfo.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingData.contactInfo.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <select
                      value={bookingData.contactInfo.country}
                      onChange={(e) => handleContactChange('country', e.target.value)}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6">Special Requests (Optional)</h3>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requests or preferences..."
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Price Breakdown */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Price Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {bookingDetails.roomPrice} × {bookingDetails.nights} nights
                      </span>
                      <span className="font-medium">₹{bookingDetails.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Taxes (18%)</span>
                      <span className="font-medium">₹{bookingDetails.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Service Charge (5%)</span>
                      <span className="font-medium">₹{bookingDetails.serviceCharge.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-blue-600">₹{bookingDetails.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <Shield size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-blue-700 dark:text-blue-300">Free Cancellation</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Cancel up to 48 hours before check-in for full refund
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Button */}
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    Proceed to Payment
                  </button>

                  {/* Security Info */}
                  <div className="text-center mt-6 pt-6 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Shield size={16} />
                      <span>Secure SSL Encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          amount={bookingDetails.total}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={(paymentMethod) => handleBooking(paymentMethod)}
        />
      )}

      {/* Booking Confirmation Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your booking at {hotel.name} has been confirmed. We've sent the details to your email.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/my-bookings')}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 border border-gray-300 rounded-lg font-medium"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;