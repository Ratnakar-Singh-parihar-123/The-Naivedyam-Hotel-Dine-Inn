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
  BookOpen,
  Search,
  Bell,
  ChefHat,
  Sparkles,
  Hotel,
  UtensilsCrossed,
  MapPin,
  Clock,
  Info,
  Users,
  Award,
  Globe,
  ChevronDown,
  ChevronRight,
  Star,
  Tag,
  Wallet,
  Shield,
  Gift,
  HelpCircle,
  MessageSquare,
  Heart,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Settings,
  Map,
  Mail,
  ExternalLink,
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Bath,
  Tv
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
  const [activeMobileSection, setActiveMobileSection] = useState("main");
  const [scrolled, setScrolled] = useState(false);
  const [isSearchMobile, setIsSearchMobile] = useState(false);

  const [notifications] = useState([
    { id: 1, text: "Your table reservation is confirmed", time: "10 min ago", read: false, type: "booking" },
    { id: 2, text: "Special discount on Italian dishes", time: "1 hour ago", read: false, type: "offer" },
    { id: 3, text: "Order #1234 is being prepared", time: "2 hours ago", read: true, type: "order" },
    { id: 4, text: "Your review got 50 likes", time: "5 hours ago", read: false, type: "social" },
    { id: 5, text: "Payment successful for order #5678", time: "1 day ago", read: true, type: "payment" }
  ]);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navbarRef = useRef(null);

  // Touch-friendly close handlers
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setShowNotifications(false);
    setIsAboutDropdownOpen(false);
    setIsSearchOpen(false);
    setIsSearchMobile(false);
  };

  // Scroll effect for navbar - mobile optimized
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 5);
      
      // Auto close dropdowns on scroll
      if (scrollY > 50) {
        setIsProfileOpen(false);
        setShowNotifications(false);
        setIsAboutDropdownOpen(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Touch event for mobile
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (isMenuOpen) {
        e.preventDefault();
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
    };
  }, [isMenuOpen]);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Close dropdowns when clicking outside - mobile optimized
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen, isSearchOpen]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast.success("Dark mode activated", {
        duration: 1500,
        icon: '🌙',
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast.success("Light mode activated", {
        duration: 1500,
        icon: '☀️',
        style: {
          background: '#fff',
          color: '#1f2937',
          border: '1px solid #e5e7eb'
        }
      });
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message, {
          icon: '👋',
          style: {
            background: '#10b981',
            color: '#fff',
          }
        });
        navigate("/");
        closeAllMenus();
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Navigation items with icons - Mobile optimized
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={22} />, badge: "Popular", featured: true },
    { path: "/menu", label: "Menu", icon: <BookOpen size={22} />, badge: "New", featured: true },
    { path: "/rooms", label: "Rooms", icon: <Hotel size={22} />, badge: "Luxury", featured: true },
    { path: "/book-table", label: "Book Table", icon: <Calendar size={22} />, badge: "Hot" },
  ];

  // About dropdown items
  const aboutItems = [
    { path: "/about", label: "Our Story", icon: <Heart size={20} />, desc: "Learn about our journey" },
    { path: "/team", label: "Our Team", icon: <Users size={20} />, desc: "Meet our talented chefs" },
    { path: "/awards", label: "Awards", icon: <Award size={20} />, desc: "Our achievements", badge: "25+" },
    { path: "/testimonials", label: "Testimonials", icon: <MessageSquare size={20} />, desc: "Customer stories" },
    { path: "/careers", label: "Careers", icon: <TrendingUp size={20} />, desc: "Join our team", badge: "Hiring" },
    { path: "/contact", label: "Contact", icon: <Phone size={20} />, desc: "Get in touch" },
  ];

  // User menu items
  const userMenuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <UserCircle size={20} />, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
    { path: "/my-bookings", label: "My Bookings", icon: <Calendar size={20} />, color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
    { path: "/my-orders", label: "My Orders", icon: <Package size={20} />, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400", badge: "3" },
    { path: "/wishlist", label: "Wishlist", icon: <Heart size={20} />, color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400", badge: "12" },
    { path: "/wallet", label: "Wallet", icon: <CreditCard size={20} />, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400", badge: "$125" },
    { path: "/settings", label: "Settings", icon: <Settings size={20} />, color: "bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400" },
  ];

  // Quick actions for mobile
  const quickActions = [
    { label: "Track Order", icon: <Package size={22} />, action: () => navigate("/track-order"), color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
    { label: "Gift Cards", icon: <Gift size={22} />, action: () => navigate("/gift-cards"), color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30" },
    { label: "Help Center", icon: <HelpCircle size={22} />, action: () => navigate("/help"), color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
    { label: "Live Chat", icon: <MessageSquare size={22} />, action: () => navigate("/chat"), color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30" },
  ];

  // Hotel features for mobile
  const hotelFeatures = [
    { icon: <Wifi size={18} />, label: "Free WiFi" },
    { icon: <Coffee size={18} />, label: "Breakfast" },
    { icon: <Car size={18} />, label: "Parking" },
    { icon: <Dumbbell size={18} />, label: "Gym" },
    { icon: <Bath size={18} />, label: "Spa" },
    { icon: <Tv size={18} />, label: "Entertainment" },
  ];

  // Check if a link is active
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsSearchMobile(false);
      setSearchQuery("");
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Mobile navigation handler
  const handleMobileNavigation = (path) => {
    navigate(path);
    closeAllMenus();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking': return '📅';
      case 'offer': return '🎁';
      case 'order': return '🍽️';
      case 'social': return '❤️';
      case 'payment': return '💳';
      default: return '🔔';
    }
  };

  return (
    <>
      {/* Top Announcement Bar - Mobile Optimized */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-2 px-3 md:px-4 overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between md:justify-center gap-3 md:gap-6 whitespace-nowrap text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Clock size={14} className="flex-shrink-0" />
              <span>11AM - 11PM</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin size={14} className="flex-shrink-0" />
              <span>123 Luxury Avenue</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="flex-shrink-0" />
              <span>+91 9399741051</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Tag size={14} className="flex-shrink-0" />
              <span>15% Off • WELCOME15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        ref={navbarRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800'
          : 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left Section - Logo & Mobile Menu */}
            <div className="flex items-center flex-1 md:flex-none">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden mr-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all touch-manipulation"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* Logo - Responsive */}
              <Link 
                to="/" 
                className="flex items-center group active:scale-95 transition-transform touch-manipulation"
                onClick={closeAllMenus}
              >
                <div className="relative">
                  <div className="flex items-center justify-center h-10 md:h-12 px-3 md:px-4 rounded-lg md:rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-md shadow-orange-500/30 transition-all duration-300 group-hover:shadow-orange-500/50">
                    <div className="flex items-center gap-2">
                      <ChefHat className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
                      <span className="text-white font-bold text-sm md:text-base lg:text-lg tracking-tight whitespace-nowrap">
                        The<span className="text-amber-200">Naivedyam</span>
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 md:-bottom-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                    <UtensilsCrossed className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 mx-2 xl:mx-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl transition-all duration-300 font-medium lg:font-semibold group ${isActive(item.path)
                    ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 shadow-lg shadow-orange-500/10"
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5"
                    }`}
                >
                  <span className="mr-1.5 lg:mr-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="text-sm lg:text-base">{item.label}</span>
                  {item.badge && (
                    <span className={`absolute -top-1 -right-1 text-white text-xs px-1.5 py-0.5 rounded-full ${item.featured ? 'bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse' : 'bg-gradient-to-r from-orange-500 to-amber-500'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              {/* About Dropdown - Desktop */}
              <div className="relative" ref={aboutDropdownRef}>
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className={`flex items-center px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl transition-all duration-300 font-medium lg:font-semibold group ${isAboutDropdownOpen || location.pathname.startsWith('/about') ||
                    location.pathname.startsWith('/team') || location.pathname.startsWith('/testimonials')
                    ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5"
                    }`}
                >
                  <Info size={20} className="mr-1.5 lg:mr-2" />
                  <span className="text-sm lg:text-base">About</span>
                  <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 ml-1 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAboutDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-white">About Naivedyam</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Luxury dining & hospitality
                      </p>
                    </div>
                    <div className="py-2 max-h-96 overflow-y-auto">
                      {aboutItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5 transition-colors group active:bg-orange-500/10"
                          onClick={() => setIsAboutDropdownOpen(false)}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${item.path.includes('team') ? 'bg-blue-100 dark:bg-blue-900/30' :
                            item.path.includes('awards') ? 'bg-amber-100 dark:bg-amber-900/30' :
                              'bg-orange-100 dark:bg-orange-900/30'
                            }`}>
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{item.label}</span>
                              {item.badge && (
                                <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-1.5 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {item.desc}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions - Mobile & Desktop */}
            <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchMobile(true)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95 touch-manipulation"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Desktop Search */}
              <div className="hidden md:relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group active:scale-95"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors" />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 lg:w-80 xl:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700 z-50 animate-slideDown">
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search dishes, rooms..."
                        className="w-full pl-10 pr-24 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 transition-all text-sm"
                        autoFocus
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-2">
                        <button
                          type="submit"
                          className="px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>Try: "Butter Chicken", "Suite Room"</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group active:scale-95 touch-manipulation"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
                )}
              </button>

              {/* Notifications - Hidden on small mobile */}
              <div className="hidden sm:relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative active:scale-95 touch-manipulation"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">Notifications</h3>
                        <span className="text-xs text-orange-500 font-medium">Mark all as read</span>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100 dark:active:bg-gray-700 ${!notification.read ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''
                            }`}
                          onClick={() => setShowNotifications(false)}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/notifications"
                      className="block px-4 py-3 text-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors border-t border-gray-100 dark:border-gray-700 active:bg-orange-100"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>

              {/* Cart - Always Visible */}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group active:scale-95 touch-manipulation"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="relative" ref={profileRef}>
                {user ? (
                  <>
                    <button
                      className="hidden md:flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group active:scale-95"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      aria-label="User menu"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                            <span className="font-bold text-orange-600 dark:text-orange-400 text-sm lg:text-base">
                              {user.name?.charAt(0) || "U"}
                            </span>
                          </div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 lg:w-2.5 lg:h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                          {user.name?.split(" ")[0] || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Gold Member
                        </p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''} hidden lg:block`} />
                    </button>

                    {/* Mobile Profile Icon */}
                    <button
                      onClick={() => navigate("/profile")}
                      className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95 touch-manipulation"
                      aria-label="User menu"
                    >
                      <UserCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    {/* Profile Dropdown - Desktop */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-64 lg:w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {user.name?.charAt(0) || "U"}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                                {user.name || "User"}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user.email || ""}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                                  Gold Tier
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="py-2 max-h-64 overflow-y-auto">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group active:bg-gray-100 dark:active:bg-gray-700"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${item.color}`}>
                                {item.icon}
                              </div>
                              <span className="flex-1 text-sm">{item.label}</span>
                              {item.badge && (
                                <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                          <button
                            onClick={logout}
                            className="flex items-center w-full px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group rounded-lg active:bg-red-100 dark:active:bg-red-900/20"
                          >
                            <LogOut size={18} className="mr-3" />
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Desktop Login Button */}
                    <button
                      onClick={() => navigate("/login")}
                      className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95"
                    >
                      <UserCircle size={20} />
                      <span className="text-sm lg:text-base">Sign In</span>
                    </button>

                    {/* Mobile Login Button */}
                    <button
                      onClick={() => navigate("/login")}
                      className="md:hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-3 py-2 rounded-xl shadow-lg shadow-orange-500/30 active:scale-95 touch-manipulation"
                    >
                      <UserCircle size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen Search */}
        {isSearchMobile && (
          <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsSearchMobile(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close search"
              >
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Search</h3>
              <div className="w-10"></div>
            </div>
            <form onSubmit={handleSearch} className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-orange-500 transition-all text-base"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Search
              </button>
            </form>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Popular searches: "Pizza", "Burger", "Pasta", "Salad"
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Appetizers", "Main Course", "Desserts", "Drinks", "Breakfast", "Lunch"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    navigate(`/search?q=${item}`);
                    setIsSearchMobile(false);
                  }}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Sidebar Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden fixed inset-y-0 left-0 z-50 w-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          style={{ height: '100dvh' }}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">The Naivedyam</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hotel & Fine Dining</p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
            >
              <X size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="h-[calc(100dvh-80px)] overflow-y-auto pb-32">
            {/* User Section */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              {user ? (
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{user.name?.charAt(0) || "U"}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                        Gold Member
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleMobileNavigation("/login")}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 active:scale-95 mb-4"
                >
                  Sign In / Register
                </button>
              )}
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-bold text-orange-600 dark:text-orange-400">4.8★</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                </div>
                <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-bold text-orange-600 dark:text-orange-400">50+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Dishes</div>
                </div>
                <div className="text-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-bold text-orange-600 dark:text-orange-400">24/7</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Service</div>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="p-5">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                Navigation
              </h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleMobileNavigation(item.path)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all active:scale-95 ${isActive(item.path)
                      ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive(item.path) ? 'text-orange-500' : 'text-gray-500'}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="text-xs font-medium bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                About Us
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {aboutItems.slice(0, 4).map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleMobileNavigation(item.path)}
                    className="flex flex-col items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${item.path.includes('team') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      item.path.includes('awards') ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                        'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      }`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-white text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`flex items-center gap-2 p-3 rounded-xl transition-all active:scale-95 ${action.color}`}
                  >
                    {action.icon}
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Features */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                Hotel Features
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {hotelFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="text-orange-500 mb-1">{feature.icon}</div>
                    <span className="text-xs text-gray-700 dark:text-gray-300 text-center">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                Contact Us
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Phone size={16} className="text-orange-500" />
                  <span>+91 9399741051</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Mail size={16} className="text-orange-500" />
                  <span>info@thenaivedyam.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <MapPin size={16} className="text-orange-500" />
                  <span>123 Luxury Avenue, NYC</span>
                </div>
              </div>
            </div>

            {/* Logout Button (if logged in) */}
            {user && (
              <div className="p-5 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors active:bg-red-100"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;