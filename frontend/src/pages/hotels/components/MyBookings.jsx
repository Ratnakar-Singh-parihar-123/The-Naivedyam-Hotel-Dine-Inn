import React, { useState, useEffect } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Share2,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';

const MyBookings = () => {
  const { bookings, hotels, cancelBooking } = useHotel();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    let filtered = [...bookings];
    
    // Status filter
    if (filter !== 'all') {
      filtered = filtered.filter(b => b.status === filter);
    }
    
    // Search filter
    if (search) {
      filtered = filtered.filter(b => 
        b.hotelName.toLowerCase().includes(search.toLowerCase()) ||
        b.bookingId.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredBookings(filtered);
  }, [bookings, filter, search]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-600" size={20} />;
      case 'pending':
        return <Clock className="text-amber-600" size={20} />;
      default:
        return <AlertCircle className="text-gray-600" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  const downloadInvoice = (booking) => {
    // Generate invoice PDF
    alert(`Invoice downloaded for booking ${booking.bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your hotel reservations and view booking history
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search bookings by hotel or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={20} />
                <span className="font-medium">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'confirmed', 'pending', 'cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      filter === status 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map(booking => {
              const hotel = hotels.find(h => h.id === booking.hotelId);
              
              return (
                <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    {/* Hotel Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4">
                        <img 
                          src={hotel?.image || booking.hotelImage} 
                          alt={booking.hotelName}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold">{booking.hotelName}</h3>
                              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                                <MapPin size={16} />
                                <span>{hotel?.city || 'Unknown City'}</span>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="capitalize">{booking.status}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Booking ID</div>
                              <div className="font-mono font-bold">{booking.bookingId}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Check-in</div>
                              <div className="font-bold">{booking.checkIn}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Check-out</div>
                              <div className="font-bold">{booking.checkOut}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                              <div className="font-bold text-blue-600">₹{booking.totalPrice}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={() => downloadInvoice(booking)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium"
                      >
                        <Download size={18} />
                        Download Invoice
                      </button>
                      
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                        >
                          Cancel Booking
                        </button>
                      )}
                      
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 hover:border-gray-400 rounded-lg font-medium">
                        <Share2 size={18} />
                        Share Details
                      </button>
                    </div>
                  </div>
                  
                  {/* Booking Details */}
                  <div className="border-t dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-900/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Room Type</div>
                        <div className="font-medium">{booking.roomType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Guests</div>
                        <div className="font-medium">
                          {booking.guests?.adults || 2} Adults, {booking.guests?.children || 0} Children
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Booking Date</div>
                        <div className="font-medium">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Payment</div>
                        <div className="font-medium">
                          {booking.paymentMethod || 'Credit Card'} • Paid
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <Calendar size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No bookings found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {filter !== 'all' 
                ? `You don't have any ${filter} bookings.` 
                : "You haven't made any bookings yet."}
            </p>
            <button
              onClick={() => window.location.href = '/hotels'}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Book a Hotel
            </button>
          </div>
        )}

        {/* Stats */}
        {bookings.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{bookings.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Bookings</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Confirmed</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-amber-600">
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Pending</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-red-600">
                {bookings.filter(b => b.status === 'cancelled').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Cancelled</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;