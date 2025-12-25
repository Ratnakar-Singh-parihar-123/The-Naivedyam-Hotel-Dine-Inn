import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { 
  Calendar, 
  Users, 
  Phone, 
  Clock, 
  MapPin, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  RefreshCw,
  Edit,
  Trash2,
  Download,
  MessageCircle,
  Star,
  Sparkles,
  ChefHat,
  Home,
  CreditCard,
  Bell,
  QrCode
} from "lucide-react";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios, user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'confirmed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'approved': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    'completed': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
  };

  const statusIcons = {
    'pending': <Clock className="w-4 h-4" />,
    'confirmed': <CheckCircle className="w-4 h-4" />,
    'approved': <CheckCircle className="w-4 h-4" />,
    'cancelled': <XCircle className="w-4 h-4" />,
    'completed': <CheckCircle className="w-4 h-4" />
  };

  const filters = [
    { key: 'all', label: 'All Bookings', count: bookings.length },
    { key: 'upcoming', label: 'Upcoming', count: upcomingBookings.length },
    { key: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { key: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { key: 'completed', label: 'Completed', count: pastBookings.length },
    { key: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/my-bookings");
      if (data.success) {
        const now = new Date();
        const sortedBookings = data.bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setBookings(sortedBookings);
        
        // Separate upcoming and past bookings
        const upcoming = sortedBookings.filter(booking => 
          new Date(booking.date) >= now && booking.status !== 'cancelled'
        );
        const past = sortedBookings.filter(booking => 
          new Date(booking.date) < now || booking.status === 'completed'
        );
        
        setUpcomingBookings(upcoming);
        setPastBookings(past);
      }
    } catch (error) {
      toast.error("Failed to load bookings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEditBooking = (booking) => {
    toast.success(
      <div>
        <p className="font-bold">Edit Booking</p>
        <p className="text-sm">You can modify booking #{booking.bookingId}</p>
      </div>,
      {
        icon: '✏️',
        duration: 3000
      }
    );
  };

  const handleCancelBooking = (booking) => {
    toast(
      <div className="text-center">
        <p className="font-bold mb-2">Cancel Booking?</p>
        <p className="text-sm mb-4">Are you sure you want to cancel booking for {booking.date}?</p>
        <div className="grid grid-cols-2 gap-2">
          <button 
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            onClick={() => {
              toast.success("Booking cancelled successfully", { icon: '🗑️' });
              fetchBookings();
            }}
          >
            Yes, Cancel
          </button>
          <button className="bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
            No, Keep It
          </button>
        </div>
      </div>,
      {
        duration: 5000,
        icon: '⚠️'
      }
    );
  };

  const handleDownloadReceipt = (booking) => {
    toast.success("Receipt downloaded successfully", {
      icon: '📄',
      duration: 2000
    });
  };

  const handleRemindMe = (booking) => {
    toast.success(`Reminder set for ${booking.date} at ${booking.time}`, {
      icon: '⏰',
      duration: 2000
    });
  };

  const handleRateExperience = (booking) => {
    toast(
      <div className="text-center">
        <p className="font-bold mb-2">Rate Your Experience</p>
        <div className="flex justify-center gap-1 mb-3">
          {[1,2,3,4,5].map(star => (
            <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <textarea
          placeholder="Share your dining experience..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
          rows="3"
        />
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
          Submit Review
        </button>
      </div>,
      {
        duration: 6000,
        icon: '⭐'
      }
    );
  };

  const getTimeUntilBooking = (date, time) => {
    const bookingDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diffMs = bookingDateTime - now;
    
    if (diffMs <= 0) return "Past booking";
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `In ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  };

  const getBookingType = (numberOfPeople) => {
    if (numberOfPeople <= 2) return { label: "Couple", color: "bg-pink-500", icon: "💑" };
    if (numberOfPeople <= 4) return { label: "Small Group", color: "bg-blue-500", icon: "👨‍👩‍👧" };
    if (numberOfPeople <= 6) return { label: "Family", color: "bg-green-500", icon: "👨‍👩‍👧‍👦" };
    return { label: "Large Group", color: "bg-purple-500", icon: "👨‍👩‍👧‍👧" };
  };

  const filteredBookings = activeFilter === 'all' 
    ? bookings 
    : activeFilter === 'upcoming'
    ? upcomingBookings
    : activeFilter === 'completed'
    ? pastBookings
    : bookings.filter(booking => booking.status === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-6">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-orange-600 dark:text-orange-400">Bookings</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your table reservations and dining experiences at The Naivedyam
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{bookings.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{upcomingBookings.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Confirmed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{pastBookings.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => window.location.href = "/book-table"}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
          >
            <Calendar size={20} />
            Book New Table
          </button>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={20} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === filter.key ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No bookings found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              {activeFilter === 'all'
                ? "You haven't made any table reservations yet. Book your first dining experience!"
                : `You don't have any ${activeFilter} bookings at the moment.`}
            </p>
            {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
              >
                View All Bookings
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const bookingType = getBookingType(booking.numberOfPeople);
              const timeUntil = getTimeUntilBooking(booking.date, booking.time);
              const isUpcoming = new Date(booking.date) >= new Date();
              
              return (
                <div
                  key={booking._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Booking Header */}
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {booking.name}'s Reservation
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColors[booking.status]}`}>
                            {statusIcons[booking.status]}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${bookingType.color}`}>
                            {bookingType.icon} {bookingType.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(booking.date).toLocaleDateString('en-IN', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {booking.time}
                          </div>
                          {isUpcoming && (
                            <div className="flex items-center gap-1">
                              <Bell size={14} className="text-orange-500" />
                              {timeUntil}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                          <Users size={20} />
                          {booking.numberOfPeople}
                          <span className="text-sm font-normal text-gray-500">guests</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Booking #{booking.bookingId || booking._id.slice(-8).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Contact & Info */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Phone className="text-gray-500 mt-0.5" size={16} />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Contact Information</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm">{booking.phone}</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm">{booking.email || user?.email || 'No email provided'}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="text-gray-500 mt-0.5" size={16} />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Table Preference</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm">
                              {booking.tableType || 'Standard'} • {booking.area || 'Main Dining'}
                            </div>
                          </div>
                        </div>
                        {booking.occasion && (
                          <div className="flex items-start gap-3">
                            <Sparkles className="text-gray-500 mt-0.5" size={16} />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Special Occasion</div>
                              <div className="text-gray-600 dark:text-gray-400 text-sm">{booking.occasion}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-4">
                        {booking.note && (
                          <div className="flex items-start gap-3">
                            <FileText className="text-gray-500 mt-0.5" size={16} />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Special Requests</div>
                              <div className="text-gray-600 dark:text-gray-400 text-sm">{booking.note}</div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <ChefHat className="text-gray-500" size={16} />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Assigned Staff</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm">
                              {booking.staffAssigned || 'Will be assigned on arrival'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-gray-500" size={16} />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Payment Status</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm">
                              {booking.paymentStatus || 'Not Required'} • {booking.paymentMethod || 'Pay at venue'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Section */}
                    {booking.status === 'confirmed' && isUpcoming && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl border border-orange-500/10">
                        <div className="flex items-center gap-3">
                          <QrCode className="text-orange-500" size={24} />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">Digital Check-in QR</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Show this at reception for quick check-in
                            </div>
                          </div>
                          <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded flex items-center justify-center">
                            <span className="text-gray-500">QR</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex flex-wrap gap-3">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleEditBooking(booking)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium"
                          >
                            <Edit size={16} />
                            Edit Booking
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-lg font-medium"
                          >
                            <Trash2 size={16} />
                            Cancel
                          </button>
                        </>
                      )}

                      {booking.status === 'confirmed' && isUpcoming && (
                        <>
                          <button
                            onClick={() => handleRemindMe(booking)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium"
                          >
                            <Bell size={16} />
                            Set Reminder
                          </button>
                          <button
                            onClick={() => handleEditBooking(booking)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium"
                          >
                            <Edit size={16} />
                            Modify
                          </button>
                        </>
                      )}

                      {!isUpcoming && booking.status === 'completed' && (
                        <button
                          onClick={() => handleRateExperience(booking)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-lg font-medium"
                        >
                          <Star size={16} />
                          Rate Experience
                        </button>
                      )}

                      <button
                        onClick={() => handleDownloadReceipt(booking)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:from-gray-900 hover:to-black dark:hover:from-gray-600 dark:hover:to-gray-700 text-white rounded-lg font-medium"
                      >
                        <Download size={16} />
                        Download
                      </button>

                      <button
                        onClick={() => setSelectedBooking(selectedBooking === booking._id ? null : booking._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium ml-auto"
                      >
                        <MessageCircle size={16} />
                        Get Help
                        <ChevronRight size={16} className={`transition-transform ${selectedBooking === booking._id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>

                    {/* Help Section */}
                    {selectedBooking === booking._id && (
                      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Need assistance with this booking? Contact our concierge team.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600">
                            Call Concierge
                          </button>
                          <button className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                            Send Message
                          </button>
                          <button className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                            Directions
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tips & Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-6 border border-orange-500/10">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="text-orange-500" size={24} />
              <h4 className="font-bold text-gray-900 dark:text-white">Arrival Tips</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Arrive 10-15 minutes before your booking</li>
              <li>• Bring your booking confirmation or QR code</li>
              <li>• Notify us if you're running late</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl p-6 border border-blue-500/10">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="text-blue-500" size={24} />
              <h4 className="font-bold text-gray-900 dark:text-white">Cancellation Policy</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Free cancellation up to 2 hours before</li>
              <li>• 50% charge for late cancellations</li>
              <li>• No-show results in full charge</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-6 border border-green-500/10">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="text-green-500" size={24} />
              <h4 className="font-bold text-gray-900 dark:text-white">Loyalty Benefits</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Earn 100 points per booking</li>
              <li>• Priority table allocation for members</li>
              <li>• Free dessert on every 5th visit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;