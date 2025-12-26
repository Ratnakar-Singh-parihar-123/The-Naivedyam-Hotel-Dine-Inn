import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Package,
  ShoppingCart,
  UserCircle,
  Menu,
  X,
  Moon,
  Sun,
  Home,
  Phone,
  Search,
  Bell,
  Hotel,
  MapPin,
  Clock,
  Info,
  Users,
  Award,
  ChevronDown,
  ChevronRight,
  Star,
  Shield,
  Gift,
  HelpCircle,
  MessageCircle,
  Heart,
  TrendingUp,
  CreditCard,
  Settings,
  Mail,
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Bath,
  Tv,
  UtensilsCrossed,
  ShieldCheck,
  Globe,
  Headphones,
  Map,
  Zap,
  Crown,
  Briefcase,
  Building,
  Waves,
  Wind,
  Key,
  Smartphone,
  PhoneCall,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Menu as MenuIcon,
  BookOpen,
  Tag,
  Sparkles,
  Award as AwardIcon,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Heart as HeartIcon
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, axios, cartCount } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState("main");

  const [notifications] = useState([
    { id: 1, text: "Your hotel booking is confirmed", time: "10 min ago", read: false, type: "booking", icon: "🏨" },
    { id: 2, text: "Special discount on luxury suites", time: "1 hour ago", read: false, type: "offer", icon: "🎁" },
    { id: 3, text: "Room service order delivered", time: "2 hours ago", read: true, type: "order", icon: "🚪" },
    { id: 4, text: "Your review got featured", time: "5 hours ago", read: false, type: "social", icon: "⭐" },
    { id: 5, text: "Payment successful for booking #5678", time: "1 day ago", read: true, type: "payment", icon: "💳" }
  ]);

  // Refs for click outside detection
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navbarRef = useRef(null);

  // Navigation data
  const mainNavItems = [
    { path: "/", label: "Home", icon: <Home size={20} />, badge: "New", color: "text-orange-500" },
    { path: "/hotels", label: "Hotels", icon: <Hotel size={20} />, badge: "Featured", color: "text-blue-500", featured: true },
    { path: "/restaurants", label: "Restaurants", icon: <UtensilsCrossed size={20} />, badge: "Fine Dining", color: "text-amber-500" },
    { path: "/book-now", label: "Book Now", icon: <Calendar size={20} />, badge: "24/7", color: "text-green-500", cta: true },
  ];

  const servicesItems = [
    { 
      category: "Accommodation",
      items: [
        { path: "/rooms/suites", label: "Luxury Suites", icon: <Crown size={18} />, desc: "Premium suites with ocean view" },
        { path: "/rooms/executive", label: "Executive Rooms", icon: <Briefcase size={18} />, desc: "For business travelers" },
        { path: "/rooms/family", label: "Family Rooms", icon: <Users size={18} />, desc: "Spacious family accommodation" },
        { path: "/rooms/honeymoon", label: "Honeymoon Suites", icon: <Heart size={18} />, desc: "Romantic getaway packages" },
      ]
    },
    {
      category: "Dining",
      items: [
        { path: "/restaurants/indian", label: "Indian Cuisine", icon: <Coffee size={18} />, desc: "Authentic Indian dishes" },
        { path: "/restaurants/international", label: "International", icon: <Globe size={18} />, desc: "World cuisine selection" },
        { path: "/restaurants/rooftop", label: "Rooftop Bar", icon: <Waves size={18} />, desc: "Skyline views with drinks" },
        { path: "/restaurants/24hours", label: "24-Hour Cafe", icon: <Clock size={18} />, desc: "Round-the-clock service" },
      ]
    },
    {
      category: "Amenities",
      items: [
        { path: "/amenities/spa", label: "Spa & Wellness", icon: <Bath size={18} />, desc: "Relaxation therapies" },
        { path: "/amenities/pool", label: "Infinity Pool", icon: <Waves size={18} />, desc: "Panoramic view pool" },
        { path: "/amenities/gym", label: "Fitness Center", icon: <Dumbbell size={18} />, desc: "Modern gym equipment" },
        { path: "/amenities/business", label: "Business Center", icon: <Briefcase size={18} />, desc: "Meeting rooms & facilities" },
      ]
    }
  ];

  const aboutItems = [
    { path: "/about", label: "Our Story", icon: <Heart size={18} />, desc: "Journey of excellence" },
    { path: "/team", label: "Our Team", icon: <Users size={18} />, desc: "Meet our experts" },
    { path: "/awards", label: "Awards", icon: <Award size={18} />, desc: "Recognitions & achievements", badge: "25+" },
    { path: "/sustainability", label: "Sustainability", icon: <ShieldCheck size={18} />, desc: "Eco-friendly initiatives" },
    { path: "/careers", label: "Careers", icon: <TrendingUp size={18} />, desc: "Join our team", badge: "Hiring" },
    { path: "/contact", label: "Contact Us", icon: <PhoneCall size={18} />, desc: "Get in touch 24/7" },
  ];

  const userMenuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <UserCircle size={18} /> },
    { path: "/my-bookings", label: "My Bookings", icon: <Calendar size={18} />, badge: "3" },
    { path: "/my-orders", label: "Room Service", icon: <Package size={18} /> },
    { path: "/wishlist", label: "Wishlist", icon: <Heart size={18} />, badge: "12" },
    { path: "/wallet", label: "Wallet", icon: <CreditCard size={18} />, badge: "$125" },
    { path: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  // Mobile menu sections
  const mobileSections = {
    main: { label: "Main Menu", icon: <Home size={18} /> },
    services: { label: "Services", icon: <MenuIcon size={18} /> },
    about: { label: "About", icon: <Info size={18} /> },
    contact: { label: "Contact", icon: <PhoneCall size={18} /> }
  };

  // Hotel features for mobile
  const hotelFeatures = [
    { icon: <Wifi size={18} />, label: "Free WiFi", color: "text-blue-500" },
    { icon: <Coffee size={18} />, label: "Breakfast", color: "text-amber-500" },
    { icon: <Car size={18} />, label: "Parking", color: "text-gray-500" },
    { icon: <Dumbbell size={18} />, label: "Gym", color: "text-red-500" },
    { icon: <Bath size={18} />, label: "Spa", color: "text-pink-500" },
    { icon: <Tv size={18} />, label: "Entertainment", color: "text-purple-500" },
    { icon: <Wind size={18} />, label: "AC", color: "text-cyan-500" },
    { icon: <Key size={18} />, label: "Safe", color: "text-yellow-500" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme detection
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      // Notifications dropdown
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      // About dropdown
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
      // Services dropdown
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
      // Search dropdown
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      // Mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast.success("Dark mode activated");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast.success("Light mode activated");
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success("Logged out successfully");
        navigate("/");
        closeAllMenus();
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
    setShowNotifications(false);
    setIsAboutDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMobileSearchOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      closeAllMenus();
      setSearchQuery("");
    }
  };

  const handleMobileNavigation = (path) => {
    navigate(path);
    closeAllMenus();
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-center md:justify-between gap-4 text-sm">
            <div className="hidden md:flex items-center gap-2">
              <Clock size={14} />
              <span>Check-in: 2PM • Check-out: 12PM</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} />
              <span className="font-semibold">+91 9399741051</span>
              <span className="hidden sm:inline">• 24/7 Support</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Tag size={14} />
              <span className="font-bold">WELCOME15 • 15% Off First Booking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        ref={navbarRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800' 
            : 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* Logo */}
              <Link 
                to="/" 
                className="flex items-center gap-2 group"
                onClick={closeAllMenus}
              >
                <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30">
                  <Hotel className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-xl lg:text-2xl text-gray-900 dark:text-white">
                    The<span className="text-blue-600 dark:text-blue-400"> Naivedyam</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Luxury Hospitality</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  } ${item.cta ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600' : ''}`}
                >
                  <span className={item.color}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && !item.cta && (
                    <span className={`absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full ${
                      item.featured 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                    isServicesDropdownOpen || location.pathname.startsWith('/rooms') || 
                    location.pathname.startsWith('/restaurants') || location.pathname.startsWith('/amenities')
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <MenuIcon size={20} className="text-blue-500" />
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServicesDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-[800px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-4 border border-gray-200 dark:border-gray-700 z-50">
                    <div className="grid grid-cols-3 gap-6 p-6">
                      {servicesItems.map((category, index) => (
                        <div key={index} className="space-y-4">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">
                            {category.category}
                          </h4>
                          <div className="space-y-3">
                            {category.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                onClick={() => setIsServicesDropdownOpen(false)}
                              >
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                  {item.icon}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* About Dropdown */}
              <div className="relative" ref={aboutDropdownRef}>
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                    isAboutDropdownOpen || location.pathname.startsWith('/about')
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Info size={20} />
                  <span>About</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAboutDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-white">About Us</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Luxury hospitality since 1995
                      </p>
                    </div>
                    <div className="py-2">
                      {aboutItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                          onClick={() => setIsAboutDropdownOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            {item.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Search */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="text-gray-600 dark:text-gray-400" />
              </button>

              {/* Desktop Search */}
              <div className="hidden lg:relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} className="text-gray-600 dark:text-gray-400" />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700 z-50">
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search hotels, rooms, restaurants..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                        autoFocus
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </form>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-amber-400" />
                ) : (
                  <Moon size={20} className="text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xl">{notification.icon}</span>
                            <div>
                              <p className="text-gray-800 dark:text-gray-200">{notification.text}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} className="text-gray-600 dark:text-gray-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="relative" ref={profileRef}>
                {user ? (
                  <>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-label="User menu"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div className="hidden lg:block">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name?.split(" ")[0] || "User"}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Platinum Member
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 hidden lg:block transition-transform duration-300 ${
                        isProfileOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                              {user.name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{user.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              {item.icon}
                              <span className="flex-1">{item.label}</span>
                              {item.badge && (
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                          <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                          >
                            <LogOut size={18} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                  >
                    <UserCircle size={18} />
                    <span className="hidden sm:block">Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isMobileSearchOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Close search"
                >
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
                <form onSubmit={handleSearch} className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hotels, rooms, services..."
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none"
                    autoFocus
                  />
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div 
              ref={mobileMenuRef}
              className="absolute inset-y-0 left-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
                      <Hotel className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-gray-900 dark:text-white">The Naivedyam</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Luxury Hospitality</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X size={24} className="text-gray-700 dark:text-gray-300" />
                  </button>
                </div>

                {user ? (
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleMobileNavigation("/login")}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg"
                  >
                    Sign In / Register
                  </button>
                )}
              </div>

              {/* Mobile Menu Sections */}
              <div className="p-4">
                {/* Section Tabs */}
                <div className="flex gap-2 mb-4 overflow-x-auto">
                  {Object.entries(mobileSections).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => setActiveMobileSection(key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                        activeMobileSection === key
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {section.icon}
                      {section.label}
                    </button>
                  ))}
                </div>

                {/* Section Content */}
                <div className="space-y-4">
                  {activeMobileSection === "main" && (
                    <div className="space-y-2">
                      {mainNavItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleMobileNavigation(item.path)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                            isActive(item.path)
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {activeMobileSection === "services" && (
                    <div className="space-y-4">
                      {servicesItems.map((category, index) => (
                        <div key={index}>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">{category.category}</h4>
                          <div className="space-y-2">
                            {category.items.map((item) => (
                              <button
                                key={item.path}
                                onClick={() => handleMobileNavigation(item.path)}
                                className="w-full flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                              >
                                {item.icon}
                                <div className="text-left">
                                  <div className="font-medium">{item.label}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeMobileSection === "about" && (
                    <div className="grid grid-cols-2 gap-3">
                      {aboutItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleMobileNavigation(item.path)}
                          className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          {item.icon}
                          <span className="mt-2 font-medium">{item.label}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {activeMobileSection === "contact" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">Contact Us</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>+91 9399741051</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>info@thenaivedyam.com</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>New Delhi, India</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hotel Features */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Hotel Features</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {hotelFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                      >
                        <div className={feature.color}>{feature.icon}</div>
                        <span className="text-xs mt-1">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logout Button */}
                {user && (
                  <button
                    onClick={logout}
                    className="w-full mt-6 flex items-center justify-center gap-2 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </div>
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;