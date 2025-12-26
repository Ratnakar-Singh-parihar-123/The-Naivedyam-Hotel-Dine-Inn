import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Star, 
  Hotel, 
  MapPin, 
  Clock, 
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight,
  Award,
  Shield,
  Globe,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  Download,
  RefreshCw,
  MoreVertical,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp as UpTrend,
  CheckCircle,
  XCircle,
  Clock as Pending,
  AlertCircle,
  Sparkles,
  Crown,
  Building,
  Bed,
  Bath,
  Coffee,
  Car,
  Wifi,
  Dumbbell,
  Waves,
  Wind,
  Key,
  Tv,
  ShieldCheck,
  Smartphone,
  Headphones,
  PhoneCall,
  Mail,
  ExternalLink,
  Menu,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Camera,
  Settings,
  LogOut,
  Bell,
  UserCircle,
  Moon,
  Sun,
  Home,
  Phone,
  BookOpen,
  Info,
  UtensilsCrossed,
  ShoppingCart,
  Package,
  CreditCard,
  Gift,
  HelpCircle,
  MessageSquare,
  History,
  Wallet,
  Settings as SettingsIcon,
  Users as Team,
  Award as AwardIcon,
  Heart as HeartIcon,
  MessageSquare as Testimonials,
  TrendingUp as Career,
  Map,
  Mail as MailIcon,
  ExternalLink as ExternalIcon,
  CheckCircle as Verified,
  XCircle as Cancelled,
  Clock as PendingIcon,
  AlertCircle as Warning,
  Sparkles as Featured,
  Crown as VIP,
  Building as Complex,
  Bed as BedIcon,
  Bath as BathIcon,
  Coffee as CoffeeIcon,
  Car as CarIcon,
  Wifi as WifiIcon,
  Dumbbell as Gym,
  Waves as Pool,
  Wind as AC,
  Key as Safe,
  Tv as TV,
  ShieldCheck as Security,
  Smartphone as App,
  Headphones as Support,
  PhoneCall as Call,
  Mail as Email,
  ExternalLink as Link
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HotelsDashboard = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('today');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - in real app this would come from API
  const stats = {
    totalHotels: 48,
    totalBookings: 1240,
    occupancyRate: 82,
    totalRevenue: 4526000,
    averageRating: 4.8,
    pendingReviews: 28,
    upcomingCheckins: 42,
    availableRooms: 156
  };

  const revenueData = [
    { month: 'Jan', revenue: 1200000 },
    { month: 'Feb', revenue: 1800000 },
    { month: 'Mar', revenue: 2200000 },
    { month: 'Apr', revenue: 2800000 },
    { month: 'May', revenue: 3500000 },
    { month: 'Jun', revenue: 4526000 },
  ];

  const recentBookings = [
    { id: 1, hotel: 'LuxeStay Grand', guest: 'John Doe', checkIn: '2024-01-15', checkOut: '2024-01-18', status: 'confirmed', amount: 45999, room: 'Presidential Suite' },
    { id: 2, hotel: 'Ocean View Resort', guest: 'Sarah Smith', checkIn: '2024-01-16', checkOut: '2024-01-20', status: 'pending', amount: 32999, room: 'Deluxe Ocean View' },
    { id: 3, hotel: 'Mountain Retreat', guest: 'Mike Johnson', checkIn: '2024-01-14', checkOut: '2024-01-17', status: 'confirmed', amount: 27999, room: 'Executive Suite' },
    { id: 4, hotel: 'City Center Hotel', guest: 'Emma Wilson', checkIn: '2024-01-18', checkOut: '2024-01-22', status: 'cancelled', amount: 18999, room: 'Business Class' },
    { id: 5, hotel: 'Beach Paradise', guest: 'David Brown', checkIn: '2024-01-19', checkOut: '2024-01-25', status: 'confirmed', amount: 41999, room: 'Beach Villa' },
  ];

  const topHotels = [
    { id: 1, name: 'LuxeStay Grand', city: 'Mumbai', rating: 4.9, bookings: 245, revenue: 2450000, occupancy: 92, featured: true },
    { id: 2, name: 'Ocean View Resort', city: 'Goa', rating: 4.8, bookings: 198, revenue: 1980000, occupancy: 88, featured: true },
    { id: 3, name: 'Mountain Retreat', city: 'Shimla', rating: 4.7, bookings: 176, revenue: 1760000, occupancy: 85, featured: false },
    { id: 4, name: 'City Center Hotel', city: 'Delhi', rating: 4.6, bookings: 154, revenue: 1540000, occupancy: 82, featured: false },
    { id: 5, name: 'Beach Paradise', city: 'Goa', rating: 4.8, bookings: 132, revenue: 1320000, occupancy: 79, featured: true },
  ];

  const hotels = [
    {
      id: 1,
      name: "LuxeStay Grand",
      location: "Mumbai, India",
      rating: 4.9,
      price: 19999,
      discountPrice: 15999,
      amenities: ["wifi", "pool", "spa", "gym", "parking", "restaurant"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      description: "Luxury 5-star hotel with panoramic city views",
      availableRooms: 12,
      totalRooms: 150,
      featured: true,
      category: "luxury",
      tags: ["5-Star", "Luxury", "City View", "Spa"]
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Goa, India",
      rating: 4.8,
      price: 14999,
      discountPrice: 11999,
      amenities: ["wifi", "pool", "beach", "gym", "restaurant"],
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      description: "Beachfront resort with private beach access",
      availableRooms: 8,
      totalRooms: 120,
      featured: true,
      category: "resort",
      tags: ["Beach", "Resort", "Luxury", "Family"]
    },
    {
      id: 3,
      name: "Mountain Retreat",
      location: "Shimla, India",
      rating: 4.7,
      price: 12999,
      discountPrice: 9999,
      amenities: ["wifi", "fireplace", "spa", "restaurant"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      description: "Cozy mountain resort with scenic views",
      availableRooms: 15,
      totalRooms: 80,
      featured: false,
      category: "mountain",
      tags: ["Mountain", "Scenic", "Cozy", "Romantic"]
    },
    {
      id: 4,
      name: "City Center Hotel",
      location: "Delhi, India",
      rating: 4.6,
      price: 8999,
      discountPrice: 6999,
      amenities: ["wifi", "gym", "parking", "restaurant"],
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      description: "Modern hotel in the heart of the city",
      availableRooms: 25,
      totalRooms: 200,
      featured: false,
      category: "business",
      tags: ["Business", "City", "Modern", "Conference"]
    },
    {
      id: 5,
      name: "Beach Paradise",
      location: "Goa, India",
      rating: 4.8,
      price: 17999,
      discountPrice: 13999,
      amenities: ["wifi", "pool", "beach", "spa", "gym", "restaurant"],
      image: "https://images.unsplash.com/photo-1564501049418-3c27787d01e8",
      description: "Luxury beach resort with private villas",
      availableRooms: 6,
      totalRooms: 60,
      featured: true,
      category: "luxury",
      tags: ["Villa", "Beach", "Private", "Luxury"]
    },
    {
      id: 6,
      name: "Heritage Palace",
      location: "Jaipur, India",
      rating: 4.7,
      price: 21999,
      discountPrice: 17999,
      amenities: ["wifi", "pool", "spa", "gym", "restaurant", "historic"],
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      description: "Royal heritage property with palace experience",
      availableRooms: 10,
      totalRooms: 50,
      featured: true,
      category: "heritage",
      tags: ["Palace", "Heritage", "Royal", "Luxury"]
    },
    {
      id: 7,
      name: "Business Tower",
      location: "Bangalore, India",
      rating: 4.5,
      price: 10999,
      discountPrice: 8999,
      amenities: ["wifi", "gym", "conference", "parking", "restaurant"],
      image: "https://images.unsplash.com/photo-1596436889106-be35e843f974",
      description: "Corporate hotel with modern amenities",
      availableRooms: 30,
      totalRooms: 250,
      featured: false,
      category: "business",
      tags: ["Corporate", "Modern", "Conference", "Tech"]
    },
    {
      id: 8,
      name: "Lake View Resort",
      location: "Udaipur, India",
      rating: 4.8,
      price: 16999,
      discountPrice: 12999,
      amenities: ["wifi", "pool", "lake", "spa", "restaurant"],
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
      description: "Serene lakeside resort with sunset views",
      availableRooms: 8,
      totalRooms: 70,
      featured: true,
      category: "resort",
      tags: ["Lake", "Romantic", "Serene", "Sunset"]
    },
  ];

  const amenitiesIcons = {
    wifi: <WifiIcon className="w-4 h-4" />,
    pool: <Pool className="w-4 h-4" />,
    spa: <BathIcon className="w-4 h-4" />,
    gym: <Gym className="w-4 h-4" />,
    parking: <CarIcon className="w-4 h-4" />,
    restaurant: <CoffeeIcon className="w-4 h-4" />,
    beach: <Waves className="w-4 h-4" />,
    fireplace: <Wind className="w-4 h-4" />,
    historic: <Building className="w-4 h-4" />,
    conference: <Users className="w-4 h-4" />,
    lake: <Waves className="w-4 h-4" />,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <PendingIcon className="w-4 h-4" />;
      case 'cancelled': return <Cancelled className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20 dark:from-blue-900/30 dark:via-transparent dark:to-blue-900/30"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg shadow-blue-500/30">
                  <Sparkles className="w-4 h-4" />
                  <span>Luxury Hospitality Since 1995</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Luxury</span> Hotels
                  <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-600 dark:text-gray-300 mt-2">
                    Across India
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                  Experience world-class hospitality at our curated collection of premium hotels and resorts. 
                  From beachfront paradises to mountain retreats, find your perfect stay.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/hotels')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Explore Hotels
                  </button>
                  <button
                    onClick={() => navigate('/book-now')}
                    className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-blue-500 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Book Now
                  </button>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                {/* Featured Hotel Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="relative h-64 md:h-80">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945" 
                      alt="LuxeStay Grand"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white text-xl font-bold">LuxeStay Grand</h3>
                          <p className="text-white/80 text-sm">Mumbai • 5-Star Luxury</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-bold">
                          ₹15,999
                          <div className="text-xs font-normal">per night</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        FEATURED
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-gray-900 dark:text-white">4.9</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">(245 reviews)</span>
                      </div>
                      <div className="flex gap-2">
                        {["wifi", "pool", "spa", "gym"].map((amenity, idx) => (
                          <div key={idx} className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            {amenitiesIcons[amenity]}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/hotel/1')}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      View Details
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 z-10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.8★</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 z-10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">48</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Hotels</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHotels}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Hotels</div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Hotel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm mt-2">
              <TrendingUp className="w-4 h-4" />
              <span>+12% from last month</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalBookings}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Bookings</div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm mt-2">
              <TrendingUp className="w-4 h-4" />
              <span>+18% from last month</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.occupancyRate}%</div>
                <div className="text-gray-600 dark:text-gray-400">Occupancy Rate</div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm mt-2">
              <TrendingUp className="w-4 h-4" />
              <span>+5% from last month</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalRevenue)}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Revenue</div>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                <DollarSign className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm mt-2">
              <TrendingUp className="w-4 h-4" />
              <span>+22% from last month</span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['overview', 'hotels', 'bookings', 'revenue', 'analytics', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <RefreshCw className="w-5 h-5" />
            </button>
            <select className="px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotels List */}
          <div className="lg:col-span-2">
            {/* Hotels Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Hotels</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`}>
                {hotels.map((hotel) => (
                  <div 
                    key={hotel.id}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`${viewMode === 'list' ? 'w-1/3' : 'h-56'} relative overflow-hidden`}>
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {hotel.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            FEATURED
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4">
                        <div className="flex items-center gap-1 bg-black/60 text-white px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-white" />
                          <span className="font-bold">{hotel.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`${viewMode === 'list' ? 'w-2/3' : ''} p-6`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{hotel.name}</h3>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{hotel.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            ₹{hotel.discountPrice || hotel.price}
                          </div>
                          {hotel.discountPrice && (
                            <div className="text-sm text-gray-500 line-through">₹{hotel.price}</div>
                          )}
                          <div className="text-xs text-gray-500">per night</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                        {hotel.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                            {amenitiesIcons[amenity]}
                            <span className="capitalize">{amenity}</span>
                          </div>
                        ))}
                        {hotel.amenities.length > 4 && (
                          <span className="text-sm text-gray-500">+{hotel.amenities.length - 4} more</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <BedIcon className="w-4 h-4" />
                            <span>{hotel.availableRooms} rooms available</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/hotel/${hotel.id}`)}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleHotelClick(hotel)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Bookings</h2>
                <Link to="/bookings" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Booking ID</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Hotel</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Guest</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Dates</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Amount</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-4 px-4">
                          <div className="font-mono text-sm">#{booking.id.toString().padStart(6, '0')}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium">{booking.hotel}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{booking.room}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium">{booking.guest}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div>{booking.checkIn} → {booking.checkOut}</div>
                            <div className="text-gray-500 dark:text-gray-400">
                              {Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} nights
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold">{formatCurrency(booking.amount)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="capitalize">{booking.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Analytics & Top Hotels */}
          <div className="space-y-8">
            {/* Revenue Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Trend</h2>
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-4">
                {revenueData.map((item, index) => (
                  <div key={item.month} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.month}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {formatCurrency(item.revenue)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{ width: `${(item.revenue / revenueData[revenueData.length - 1].revenue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Revenue</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(revenueData[revenueData.length - 1].revenue)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>+22% from last month</span>
                </div>
              </div>
            </div>

            {/* Top Performing Hotels */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Hotels</h2>
                <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="space-y-4">
                {topHotels.map((hotel, index) => (
                  <div key={hotel.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{hotel.name}</h3>
                        {hotel.featured && <Featured className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {hotel.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {hotel.rating}
                        </span>
                        <span>{hotel.occupancy}% occupancy</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">{formatCurrency(hotel.revenue)}</div>
                      <div className="text-xs text-gray-500">{hotel.bookings} bookings</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                View All Rankings
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-6">Quick Insights</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-500/30 rounded-xl">
                  <div className="text-2xl font-bold">{stats.averageRating}★</div>
                  <div className="text-sm text-blue-100">Average Rating</div>
                </div>
                <div className="text-center p-4 bg-blue-500/30 rounded-xl">
                  <div className="text-2xl font-bold">{stats.pendingReviews}</div>
                  <div className="text-sm text-blue-100">Pending Reviews</div>
                </div>
                <div className="text-center p-4 bg-blue-500/30 rounded-xl">
                  <div className="text-2xl font-bold">{stats.upcomingCheckins}</div>
                  <div className="text-sm text-blue-100">Upcoming Check-ins</div>
                </div>
                <div className="text-center p-4 bg-blue-500/30 rounded-xl">
                  <div className="text-2xl font-bold">{stats.availableRooms}</div>
                  <div className="text-sm text-blue-100">Available Rooms</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Hotel Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Booking Calendar</h3>
              </div>
              <p className="text-green-100 mb-4">Manage reservations and availability with our interactive calendar</p>
              <button className="w-full py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
                Open Calendar
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Revenue Reports</h3>
              </div>
              <p className="text-purple-100 mb-4">Generate detailed revenue reports and financial insights</p>
              <button className="w-full py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                View Reports
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Review Management</h3>
              </div>
              <p className="text-amber-100 mb-4">Monitor and respond to guest reviews across all platforms</p>
              <button className="w-full py-2 bg-white text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors">
                Manage Reviews
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <SettingsIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Settings</h3>
              </div>
              <p className="text-red-100 mb-4">Configure hotel settings, amenities, and pricing rules</p>
              <button className="w-full py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors">
                Hotel Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedHotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book {selectedHotel.name}</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Guests
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2">
                  <span>Room Price</span>
                  <span>₹{selectedHotel.discountPrice || selectedHotel.price} x 1 night</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{selectedHotel.discountPrice || selectedHotel.price}</span>
                </div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all duration-300 mt-6">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsDashboard;