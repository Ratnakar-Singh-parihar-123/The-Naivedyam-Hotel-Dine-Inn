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
  Settings
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

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Close dropdowns when clicking outside
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

    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
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
        setIsProfileOpen(false);
        setIsMenuOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Navigation items with icons
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} />, badge: "Popular", featured: true },
    { path: "/menu", label: "Menu", icon: <BookOpen size={20} />, badge: "New", featured: true },
    { path: "/rooms", label: "Rooms", icon: <Hotel size={20} />, badge: "Luxury", featured: true },
    { path: "/book-table", label: "Book Table", icon: <Calendar size={20} />, badge: "Hot" },
    // { path: "/services", label: "Services", icon: <Sparkles size={20} /> },
    // { path: "/offers", label: "Offers", icon: <Tag size={20} />, badge: "50% OFF" },
  ];

  // About dropdown items
  const aboutItems = [
    { path: "/about", label: "Our Story", icon: <Heart size={18} />, desc: "Learn about our journey" },
    { path: "/team", label: "Our Team", icon: <Users size={18} />, desc: "Meet our talented chefs" },
    { path: "/awards", label: "Awards", icon: <Award size={18} />, desc: "Our achievements", badge: "25+" },
    { path: "/testimonials", label: "Testimonials", icon: <MessageSquare size={18} />, desc: "Customer stories" },
    { path: "/careers", label: "Careers", icon: <TrendingUp size={18} />, desc: "Join our team", badge: "Hiring" },
    { path: "/contact", label: "Contact", icon: <Phone size={18} />, desc: "Get in touch" },
  ];

  // User menu items
  const userMenuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <UserCircle size={18} />, color: "text-blue-600" },
    { path: "/my-bookings", label: "My Bookings", icon: <Calendar size={18} />, color: "text-green-600" },
    { path: "/my-orders", label: "My Orders", icon: <Package size={18} />, color: "text-orange-600", badge: "3" },
    { path: "/wishlist", label: "Wishlist", icon: <Heart size={18} />, color: "text-pink-600", badge: "12" },
    { path: "/wallet", label: "Wallet", icon: <CreditCard size={18} />, color: "text-purple-600", badge: "$125" },
    { path: "/security", label: "Security", icon: <ShieldCheck size={18} />, color: "text-emerald-600" },
    { path: "/settings", label: "Settings", icon: <Settings size={18} />, color: "text-gray-600" },
  ];

  // Quick actions for mobile
  const quickActions = [
    { label: "Track Order", icon: <Package size={20} />, action: () => navigate("/track-order"), color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
    { label: "Gift Cards", icon: <Gift size={20} />, action: () => navigate("/gift-cards"), color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30" },
    { label: "Help Center", icon: <HelpCircle size={20} />, action: () => navigate("/help"), color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
    { label: "Live Chat", icon: <MessageSquare size={20} />, action: () => navigate("/chat"), color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30" },
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
      setSearchQuery("");
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Mobile navigation handler
  const handleMobileNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setActiveMobileSection("main");
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
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-1.5 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>Open: 11AM - 11PM</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <MapPin size={14} />
              <span>123 Luxury Avenue, NYC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={14} />
              <span>+91 9399741051</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5">
              <Tag size={14} />
              <span>15% Off First Order • Use Code: WELCOME15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-gray-200 dark:border-gray-800'
        : 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
        }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center flex-1">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden mr-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>

              <Link to="/" className="flex items-center group">
                <div className="relative flex items-center justify-center">
                  {/* Main Logo */}
                  <div
                    className="
      flex items-center justify-center
      h-10 sm:h-12
      px-4 sm:px-5
      rounded-xl
      bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600
      shadow-md shadow-orange-500/30
      transition-all duration-300
      hover:shadow-orange-500/50
    "
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <ChefHat className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />

                      <span
                        className="
          text-white font-bold
          text-base sm:text-lg
          tracking-tight whitespace-nowrap
        "
                      >
                        The
                        <span className="text-amber-200 ml-1">Naivedyam</span>
                      </span>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div
                    className="
      absolute
      -bottom-1.5 -right-1.5
      sm:-bottom-2 sm:-right-2
      w-6 h-6 sm:w-7 sm:h-7
      bg-blue-500
      rounded-full
      flex items-center justify-center
      shadow-md
    "
                  >
                    <UtensilsCrossed className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                </div>

              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 mx-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 font-semibold group ${isActive(item.path)
                    ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 shadow-lg shadow-orange-500/10"
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5"
                    }`}
                >
                  <span className="mr-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`absolute -top-1 -right-1 text-white text-xs px-2 py-0.5 rounded-full ${item.featured ? 'bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse' : 'bg-gradient-to-r from-orange-500 to-amber-500'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              {/* About Dropdown */}
              <div className="relative" ref={aboutDropdownRef}>
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 font-semibold group ${isAboutDropdownOpen || location.pathname.startsWith('/about') ||
                    location.pathname.startsWith('/team') || location.pathname.startsWith('/testimonials')
                    ? "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5"
                    }`}
                >
                  <Info size={20} className="mr-2" />
                  <span>About</span>
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAboutDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-white">About Naivedyam</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Discover luxury dining & hospitality
                      </p>
                    </div>
                    <div className="py-2">
                      {aboutItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5 transition-colors group"
                          onClick={() => setIsAboutDropdownOpen(false)}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${item.path.includes('team') ? 'bg-blue-100 dark:bg-blue-900/30' :
                            item.path.includes('awards') ? 'bg-amber-100 dark:bg-amber-900/30' :
                              'bg-orange-100 dark:bg-orange-900/30'
                            }`}>
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.label}</span>
                              {item.badge && (
                                <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.desc}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors" />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700 z-50 animate-slideDown">
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for dishes, rooms, or services..."
                        className="w-full pl-10 pr-24 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 transition-all text-sm"
                        autoFocus
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>Try: "Butter Chicken", "Suite Room", "Spa"</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                        <span className="text-sm text-orange-500 font-medium">Mark all as read</span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${!notification.read ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/notifications"
                      className="block px-4 py-3 text-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors border-t border-gray-100 dark:border-gray-700"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors group"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="relative" ref={profileRef}>
                {user ? (
                  <>
                    <button
                      className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      aria-label="User menu"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                            <span className="font-bold text-orange-600 dark:text-orange-400">
                              {user.name?.charAt(0) || "U"}
                            </span>
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                          {user.name?.split(" ")[0] || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Gold Member
                        </p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-200 dark:border-gray-700 z-50 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {user.name?.charAt(0) || "U"}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 dark:text-white truncate">
                                {user.name || "User"}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {user.email || ""}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                                  Gold Tier
                                </span>
                                <span className="text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                  250 Points
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${item.color}`}>
                                {item.icon}
                              </div>
                              <span className="flex-1">{item.label}</span>
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
                            className="flex items-center w-full px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group rounded-lg"
                          >
                            <LogOut size={18} className="mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95"
                    >
                      <UserCircle size={20} />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="lg:hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-4 py-2 rounded-xl shadow-lg shadow-orange-500/30 active:scale-95"
                    >
                      <UserCircle size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900 dark:text-white">The Naivedyam</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hotel & Fine Dining</p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="h-[calc(100vh-80px)] overflow-y-auto pb-24">
            {activeMobileSection === "main" ? (
              <div className="p-6">
                {/* User Profile */}
                {user ? (
                  <div className="mb-6 p-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/20">
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
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => handleMobileNavigation("/dashboard")} className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                        <UserCircle size={18} />
                        <span className="text-sm font-medium">Profile</span>
                      </button>
                      <button onClick={() => handleMobileNavigation("/my-orders")} className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Package size={18} />
                        <span className="text-sm font-medium">Orders</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <button
                      onClick={() => handleMobileNavigation("/login")}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all duration-300 active:scale-95"
                    >
                      Sign In / Register
                    </button>
                  </div>
                )}

                {/* Navigation */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                    Navigation
                  </h3>
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleMobileNavigation(item.path)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${isActive(item.path)
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

                {/* Quick Actions */}
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all hover:scale-105 ${action.color}`}
                      >
                        {action.icon}
                        <span className="text-xs font-medium mt-2">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* About Section */}
                <button
                  onClick={() => setActiveMobileSection("about")}
                  className="w-full flex items-center justify-between p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Info size={20} className="text-gray-500" />
                    <span className="font-medium">About Us</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </div>
            ) : (
              <div className="p-6">
                <button
                  onClick={() => setActiveMobileSection("main")}
                  className="flex items-center gap-2 mb-6 p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500"
                >
                  <ChevronRight size={20} className="rotate-180" />
                  <span className="font-medium">Back</span>
                </button>
                <div className="space-y-2">
                  {aboutItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleMobileNavigation(item.path)}
                      className="w-full flex items-center justify-between p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>

      {/* Add these animations to your global CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Navbar;