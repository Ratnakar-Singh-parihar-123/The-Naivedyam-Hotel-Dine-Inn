import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Calendar,
  Users,
  Clock,
  Phone,
  Mail,
  User,
  FileText,
  MapPin,
  Sparkles,
  ChefHat,
  Wine,
  Music,
  Shield,
  CheckCircle,
  Star,
  Crown,
  Gift,
  PhoneCall,
  Smartphone,
  CreditCard,
  Building,
  Home,
  PartyPopper,
  Heart
} from "lucide-react";

const BookTable = () => {
  const { axios, user } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    numberOfPeople: "2",
    date: "",
    time: "",
    note: "",
    tableType: "standard",
    occasion: "",
    specialRequirements: "",
    areaPreference: "main"
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState("dinner");

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to book a table");
      navigate("/login");
    } else {
      // Auto-fill user data
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      }));
    }
  }, [user, navigate]);

  // Generate available times
  useEffect(() => {
    const times = [];
    const now = new Date();
    
    // Generate times from 11 AM to 11 PM
    for (let hour = 11; hour <= 23; hour++) {
      for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(time);
      }
    }
    
    // Filter out past times for today
    if (formData.date === new Date().toISOString().split('T')[0]) {
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setAvailableTimes(times.filter(time => time > currentTime));
    } else {
      setAvailableTimes(times);
    }
  }, [formData.date]);

  const bookingTypes = [
    { id: "breakfast", name: "Breakfast", icon: "☀️", time: "7 AM - 11 AM" },
    { id: "lunch", name: "Lunch", icon: "🌞", time: "12 PM - 4 PM" },
    { id: "dinner", name: "Dinner", icon: "🌙", time: "6 PM - 11 PM" },
    { id: "special", name: "Special Event", icon: "🎉", time: "Flexible" }
  ];

  const tableTypes = [
    { id: "standard", name: "Standard Table", icon: "🪑", capacity: "2-4 people" },
    { id: "window", name: "Window Table", icon: "🪟", capacity: "2-4 people", badge: "Popular" },
    { id: "private", name: "Private Booth", icon: "🚪", capacity: "4-6 people", badge: "VIP" },
    { id: "outdoor", name: "Outdoor Seating", icon: "🌳", capacity: "2-6 people" },
    { id: "family", name: "Family Table", icon: "👨‍👩‍👧‍👦", capacity: "6-8 people" }
  ];

  const areaPreferences = [
    { id: "main", name: "Main Dining", icon: <Building size={18} /> },
    { id: "terrace", name: "Terrace", icon: <Home size={18} /> },
    { id: "garden", name: "Garden View", icon: <Sparkles size={18} /> },
    { id: "private", name: "Private Room", icon: <Shield size={18} /> }
  ];

  const specialOccasions = [
    { id: "", name: "None", icon: "✖️" },
    { id: "birthday", name: "Birthday", icon: "🎂" },
    { id: "anniversary", name: "Anniversary", icon: "💝" },
    { id: "proposal", name: "Proposal", icon: "💍" },
    { id: "business", name: "Business Dinner", icon: "💼" },
    { id: "celebration", name: "Celebration", icon: "🎊" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "date" && value === new Date().toISOString().split('T')[0]) {
      setSelectedTime("");
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData(prev => ({ ...prev, time }));
  };

  const calculateBookingFee = () => {
    let fee = 0;
    if (formData.tableType === "private") fee += 500;
    if (formData.tableType === "window") fee += 200;
    if (formData.occasion === "birthday" || formData.occasion === "anniversary") fee += 300;
    if (formData.numberOfPeople > 6) fee += 100 * (formData.numberOfPeople - 6);
    return fee;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.numberOfPeople < 1) {
      toast.error("Please select at least 1 guest");
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        ...formData,
        numberOfPeople: parseInt(formData.numberOfPeople),
        bookingFee: calculateBookingFee(),
        bookingType,
        status: "pending"
      };

      const { data } = await axios.post(
        "/api/booking/create",
        bookingData,
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(
          <div className="text-center">
            <p className="font-bold text-lg mb-2">Table Booked Successfully! 🎉</p>
            <p className="text-sm">Booking #{data.booking.bookingId}</p>
            <p className="text-sm">We'll send a confirmation to {formData.email}</p>
          </div>,
          {
            duration: 5000,
            icon: '✅'
          }
        );

        // Show special offers
        setTimeout(() => {
          if (formData.occasion === "birthday") {
            toast(
              <div className="flex items-center gap-2">
                <Gift className="text-pink-500" />
                <span>Birthday Special: Free dessert on us! 🎂</span>
              </div>,
              { duration: 4000 }
            );
          }
        }, 1000);

        navigate("/my-bookings");
      } else {
        toast.error(data?.message || "Booking failed");
      }
    } catch (error) {
      console.error(error);

      if (error?.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-6">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your <span className="text-orange-600 dark:text-orange-400">Table</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Reserve your dining experience at The Naivedyam Hotel & Dine Inn
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  step >= stepNum
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}>
                  {step > stepNum ? <CheckCircle size={20} /> : stepNum}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stepNum === 1 && "Details"}
                  {stepNum === 2 && "Time"}
                  {stepNum === 3 && "Table"}
                  {stepNum === 4 && "Confirm"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Booking Type & Details */}
              {step === 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Clock className="text-orange-500" />
                    Select Booking Type
                  </h2>

                  {/* Booking Types */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {bookingTypes.map(type => (
                      <div
                        key={type.id}
                        onClick={() => setBookingType(type.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          bookingType === type.id
                            ? "border-orange-500 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="font-medium text-gray-900 dark:text-white">{type.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{type.time}</div>
                      </div>
                    ))}
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <User size={16} className="inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9399741051"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Users size={16} className="inline mr-2" />
                        Number of Guests *
                      </label>
                      <select
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
                    >
                      Next: Select Date & Time
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Calendar className="text-orange-500" />
                    Select Date & Time
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
                      />
                      <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-blue-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Bookings available up to 30 days in advance
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Time *
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2">
                        {availableTimes.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleTimeSelect(time)}
                            className={`p-3 rounded-lg text-center transition-all ${
                              selectedTime === time
                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
                    >
                      Next: Table Selection
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Table Selection */}
              {step === 3 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <MapPin className="text-orange-500" />
                    Table & Preferences
                  </h2>

                  {/* Table Types */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Select Table Type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {tableTypes.map(table => (
                        <label
                          key={table.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.tableType === table.id
                              ? "border-orange-500 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{table.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">{table.name}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">{table.capacity}</div>
                            </div>
                            {table.badge && (
                              <span className="text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2 py-0.5 rounded-full">
                                {table.badge}
                              </span>
                            )}
                          </div>
                          <input
                            type="radio"
                            name="tableType"
                            value={table.id}
                            checked={formData.tableType === table.id}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Area Preference */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Area Preference</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {areaPreferences.map(area => (
                        <label
                          key={area.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                            formData.areaPreference === area.id
                              ? "border-orange-500 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex justify-center mb-2">{area.icon}</div>
                          <div className="font-medium text-gray-900 dark:text-white">{area.name}</div>
                          <input
                            type="radio"
                            name="areaPreference"
                            value={area.id}
                            checked={formData.areaPreference === area.id}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Special Occasion */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Special Occasion (Optional)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {specialOccasions.map(occasion => (
                        <label
                          key={occasion.id}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                            formData.occasion === occasion.id
                              ? "border-orange-500 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="text-xl mb-1">{occasion.icon}</div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{occasion.name}</div>
                          <input
                            type="radio"
                            name="occasion"
                            value={occasion.id}
                            checked={formData.occasion === occasion.id}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FileText size={16} className="inline mr-2" />
                      Special Requests
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="Allergies, accessibility requirements, or other special requests..."
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
                    >
                      Next: Confirm Booking
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <CheckCircle className="text-orange-500" />
                    Confirm Booking
                  </h2>

                  {/* Booking Summary */}
                  <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Booking Details</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {formData.date ? new Date(formData.date).toLocaleDateString('en-IN', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              }) : 'Not selected'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">{formData.time || 'Not selected'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">{formData.numberOfPeople} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-500" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {tableTypes.find(t => t.id === formData.tableType)?.name || 'Standard Table'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Additional Charges</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Table Selection</span>
                            <span className="font-medium">
                              {formData.tableType === 'private' ? '₹500' : 
                               formData.tableType === 'window' ? '₹200' : 'Free'}
                            </span>
                          </div>
                          {formData.occasion && (
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Special Occasion Setup</span>
                              <span className="font-medium">₹300</span>
                            </div>
                          )}
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                            <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                              <span>Booking Fee</span>
                              <span>₹{calculateBookingFee()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <Shield size={20} className="text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-2">Terms & Conditions</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Free cancellation up to 2 hours before booking</li>
                          <li>• Table held for 15 minutes after reservation time</li>
                          <li>• 50% deposit required for groups of 8+</li>
                          <li>• Special requests subject to availability</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Back to Edit
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Confirming Booking...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle size={20} />
                          Confirm Booking • ₹{calculateBookingFee()}
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Benefits & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Benefits Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-orange-500" />
                Booking Benefits
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Priority Seating</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Guaranteed table at your time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Welcome Drink</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Complimentary on arrival</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Loyalty Points</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Earn 100 points per booking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-6 border border-orange-500/10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <PhoneCall className="text-orange-500" />
                Need Help?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">+91 9399741051</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">reservations@thenaivedyam.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">Open 11 AM - 11 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Arrive 10 minutes before your reservation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Notify us if you're running late</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Special occasions? We'll make it memorable!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Hotel guests enjoy priority booking</span>
                </li>
              </ul>
            </div>

            {/* Popular Times */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Popular Times</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">7:00 PM - 9:00 PM</span>
                  <span className="text-sm bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                    Peak Hours
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">12:00 PM - 2:00 PM</span>
                  <span className="text-sm bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                    Available
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Weekends</span>
                  <span className="text-sm bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                    Book Early
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTable;