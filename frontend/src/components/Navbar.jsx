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
  HelpCircle
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

  const [notifications] = useState([
    { id: 1, text: "Your table reservation is confirmed", time: "10 min ago", read: false },
    { id: 2, text: "Special discount on Italian dishes", time: "1 hour ago", read: false },
    { id: 3, text: "Order #1234 is being prepared", time: "2 hours ago", read: true }
  ]);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const aboutDropdownRef = useRef(null);

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
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
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast.success("Light mode activated", {
        duration: 1500,
        icon: '☀️',
        style: {
          background: '#363636',
          color: '#fff',
        }
      });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast.success("Dark mode activated", {
        duration: 1500,
        icon: '🌙',
        style: {
          background: '#363636',
          color: '#fff',
        }
      });
    }
    setIsDarkMode(!isDarkMode);
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
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
    { path: "/", label: "Home", icon: <Home size={18} />, badge: "Popular" },
    { path: "/menu", label: "Menu", icon: <BookOpen size={18} />, badge: "New" },
    { path: "/rooms", label: "Rooms", icon: <Hotel size={18} />, featured: true },
    { path: "/book-table", label: "Book", icon: <Calendar size={18} /> },
    { path: "/services", label: "Services", icon: <Sparkles size={18} /> },
  ];

  // About dropdown items
  const aboutItems = [
    { path: "/about", label: "Our Story", icon: <Info size={16} />, desc: "Learn about our journey" },
    { path: "/team", label: "Our Team", icon: <Users size={16} />, desc: "Meet our talented chefs" },
    { path: "/awards", label: "Awards", icon: <Award size={16} />, desc: "Our achievements" },
    { path: "/testimonials", label: "Testimonials", icon: <Star size={16} />, desc: "Customer stories" },
    { path: "/careers", label: "Careers", icon: <Globe size={16} />, desc: "Join our team", badge: "Hiring" },
    { path: "/contact", label: "Contact", icon: <Phone size={16} />, desc: "Get in touch" },
  ];

  // Mobile menu sections
  const mobileSections = {
    main: {
      title: "Main Navigation",
      items: navItems
    },
    about: {
      title: "About Us",
      items: [
        { path: "/about", label: "About Us", icon: <Info size={18} /> },
        { path: "/team", label: "Our Team", icon: <Users size={18} /> },
        { path: "/testimonials", label: "Testimonials", icon: <Star size={18} /> },
        { path: "/careers", label: "Careers", icon: <Globe size={18} />, badge: "Hiring" },
        { path: "/contact", label: "Contact", icon: <Phone size={18} /> },
      ]
    },
    quick: {
      title: "Quick Actions",
      items: [
        { label: "Track Order", icon: <Package size={16} />, action: () => navigate("/track-order") },
        { label: "Gift Cards", icon: <Gift size={16} />, action: () => navigate("/gift-cards") },
        { label: "Help Center", icon: <HelpCircle size={16} />, action: () => navigate("/help") },
        { label: "FAQ", icon: <Info size={16} />, action: () => navigate("/faq") },
      ]
    }
  };

  // Check if a link is active
  const isActive = (path) => {
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

  // Mobile-specific functions
  const handleMobileNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setActiveMobileSection("main");
  };

  return (
    <>
      {/* Top Announcement Bar - Mobile Optimized */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 text-[10px] xs:text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between sm:justify-center gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
              <Clock size={10} className="xs:w-3 xs:h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Open: 11AM - 11PM</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
              <MapPin size={12} className="sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">123 Luxury Avenue, NYC</span>
            </div>
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
              <Phone size={10} className="xs:w-3 xs:h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">+91 9399741051</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 sm:gap-2">
              <Tag size={12} className="sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">15% Off First Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 xs:h-16 sm:h-20">
            {/* Left - Logo and Mobile Menu Button */}
            <div className="flex items-center flex-1 sm:flex-none">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden mr-1.5 xs:mr-2 sm:mr-3 p-1 xs:p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={18} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={18} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              <Link to="/" className="flex items-center group touch-manipulation">
                <div className="relative">
                  <div className="w-28 xs:w-32 h-8 xs:h-9 sm:w-40 sm:h-12 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow duration-300">
                    <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 px-1 sm:px-0">
                      <ChefHat className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-7 text-white" />
                      <span className="text-white font-bold text-sm xs:text-base  tracking-tight truncate">
                        The<span className="text-amber-300"> Naivedyam</span>
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 xs:-bottom-1.5 xs:-right-1.5 sm:-bottom-2 sm:-right-2 w-4 h-4 xs:w-5 xs:h-5 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <UtensilsCrossed className="w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Center - Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 mx-2 xl:mx-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center px-3 py-2 xs:px-4 xs:py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold group ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/10"
                      : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5"
                  }`}
                >
                  <span className="mr-1.5 xs:mr-2 sm:mr-2.5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="hidden sm:inline">{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.featured && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </Link>
              ))}

              {/* About Dropdown */}
              <div className="relative" ref={aboutDropdownRef}>
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className={`flex items-center px-3 py-2 xs:px-4 xs:py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold group ${
                    isAboutDropdownOpen || location.pathname.startsWith('/about') || 
                    location.pathname.startsWith('/team') || location.pathname.startsWith('/testimonials') ||
                    location.pathname.startsWith('/careers')
                      ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/10"
                      : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5"
                  }`}
                >
                  <span className="mr-1.5 xs:mr-2 sm:mr-2.5 group-hover:scale-110 transition-transform">
                    <Info size={18} />
                  </span>
                  <span className="hidden sm:inline">About</span>
                  <ChevronDown className={`w-3 h-3 xs:w-4 xs:h-4 ml-1 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* About Dropdown Menu */}
                {isAboutDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl py-3 border border-gray-100 dark:border-gray-700 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-white">About Naivedyam</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Discover our story & values
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
                          <span className="mr-3 text-gray-500 group-hover:text-orange-500 transition-colors">
                            {item.icon}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.label}</span>
                              {item.badge && (
                                <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-1.5 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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

            {/* Right - Actions */}
            <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 lg:space-x-3">
              {/* Search Button - Mobile First */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1 xs:p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative touch-manipulation"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-1 xs:p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative touch-manipulation"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                ) : (
                  <Moon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
                )}
              </button>

              {/* Notifications - Hidden on smallest screens */}
              <div className="hidden sm:relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-1 xs:p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative touch-manipulation"
                  aria-label="Notifications"
                >
                  <Bell className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[8px] xs:text-[10px] sm:text-xs rounded-full w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold animate-ping-once">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl py-2 sm:py-3 border border-gray-100 dark:border-gray-700 z-50 animate-fadeIn">
                    <div className="px-3 sm:px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">Notifications</h3>
                        <span className="text-xs sm:text-sm text-orange-500 font-medium">Mark all as read</span>
                      </div>
                    </div>
                    <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-l-4 ${
                            notification.read 
                              ? 'border-transparent' 
                              : 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/10'
                          }`}
                        >
                          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/notifications"
                      className="block px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors border-t border-gray-100 dark:border-gray-700"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-1 xs:p-1.5 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg sm:rounded-xl transition-colors group touch-manipulation"
                aria-label="Shopping cart"
              >
                <ShoppingCart
                  className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[8px] xs:text-[10px] sm:text-xs rounded-full w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-6 sm:h-6 flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* User Profile - Desktop */}
              <div className="relative" ref={profileRef}>
                {user ? (
                  <>
                    <button
                      className="hidden lg:flex items-center gap-1.5 xs:gap-2 p-1 xs:p-1.5 pr-2 xs:pr-3 sm:pr-4 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group touch-manipulation"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      aria-label="User menu"
                    >
                      <div className="relative">
                        <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-orange-500/30 group-hover:border-orange-500 transition-colors">
                          <UserCircle className="w-full h-full text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 xs:-bottom-1 xs:-right-1 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      </div>
                      <div className="text-left hidden xl:block">
                        <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate max-w-[80px]">
                          {user.name?.split(" ")[0] || "User"}
                        </p>
                        <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate max-w-[80px]">
                          {user.role || "Premium Member"}
                        </p>
                      </div>
                      <ChevronDown className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown - Desktop */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl py-2 sm:py-3 border border-gray-100 dark:border-gray-700 z-50 animate-fadeIn">
                        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                              <span className="text-white font-bold text-xs xs:text-sm sm:text-lg">
                                {user.name?.charAt(0) || "U"}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                                {user.name || "User"}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user.email || ""}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                                <span className="text-[9px] xs:text-[10px] sm:text-xs font-medium bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 px-1.5 sm:px-2 py-0.5 rounded-full">
                                  Gold Member
                                </span>
                                <span className="text-[9px] xs:text-[10px] sm:text-xs font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 px-1.5 sm:px-2 py-0.5 rounded-full">
                                  250 Points
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="py-1 sm:py-2">
                          {[
                            { path: "/dashboard", label: "My Dashboard", icon: <UserCircle size={16} /> },
                            { path: "/my-bookings", label: "My Bookings", icon: <Calendar size={16} /> },
                            { path: "/my-orders", label: "My Orders", icon: <Package size={16} /> },
                            { path: "/wallet", label: "Wallet", icon: <Wallet size={16} />, badge: "$125" },
                            { path: "/settings", label: "Settings", icon: <Shield size={16} /> }
                          ].map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-amber-500/5 transition-colors group"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <span className="mr-2 sm:mr-3 text-gray-500 group-hover:text-orange-500 transition-colors">
                                {item.icon}
                              </span>
                              <span className="flex-1">{item.label}</span>
                              {item.badge && (
                                <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                        <button
                          onClick={logout}
                          className="flex items-center w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-500/5 hover:to-red-500/5 transition-colors group"
                        >
                          <LogOut size={16} className="mr-2 sm:mr-3" />
                          Logout
                        </button>
                      </div>
                    )}

                    {/* Mobile Profile Icon */}
                    <button
                      onClick={() => navigate("/profile")}
                      className="lg:hidden p-1 xs:p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative touch-manipulation"
                      aria-label="User menu"
                    >
                      <UserCircle size={18} className="xs:w-5 xs:h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </>
                ) : (
                  <>
                    {/* Desktop Login Button */}
                    <button
                      onClick={() => navigate("/login")}
                      className="hidden lg:flex group relative bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs xs:text-sm sm:text-base px-2.5 xs:px-3 sm:px-6 py-1.5 xs:py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95 touch-manipulation"
                    >
                      <span>Sign In</span>
                    </button>

                    {/* Mobile Login Button */}
                    <button
                      onClick={() => navigate("/login")}
                      className="lg:hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs xs:text-sm px-2 xs:px-3 py-1 xs:py-1.5 rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/30 active:scale-95 touch-manipulation"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-2 xs:py-3 sm:py-4 animate-slideDown">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for dishes, rooms, or services..."
                  className="w-full pl-8 xs:pl-10 sm:pl-12 pr-16 xs:pr-20 sm:pr-24 py-2 xs:py-3 sm:py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-300 shadow-lg text-xs xs:text-sm sm:text-base"
                  autoFocus
                />
                <Search className="absolute left-2 xs:left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-400" />
                <div className="absolute right-1.5 xs:right-2 sm:right-2 top-1/2 transform -translate-y-1/2 flex gap-1 xs:gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="px-1.5 xs:px-2 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-[10px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2 xs:px-3 sm:px-5 py-1 xs:py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[10px] xs:text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-full xs:w-80 sm:w-96 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <ChefHat className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                  The Naivedyam
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hotel & Dine Inn
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="h-[calc(100vh-73px)] sm:h-[calc(100vh-89px)] overflow-y-auto">
            {/* Mobile Menu Sections */}
            <div className="p-4 sm:p-6">
              {activeMobileSection === "main" ? (
                <>
                  {/* User Profile Section */}
                  {user ? (
                    <div className="mb-6 p-4 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-xl border border-orange-500/10">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg sm:text-xl">
                              {user.name?.charAt(0) || "U"}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white truncate">
                            {user.name || "User"}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email || ""}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-[10px] font-medium bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                              Gold Member
                            </span>
                            <span className="text-[10px] font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                              250 Points
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          onClick={() => handleMobileNavigation("/dashboard")}
                          className="flex items-center justify-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <UserCircle size={16} />
                          <span className="text-xs font-medium">Profile</span>
                        </button>
                        <button
                          onClick={() => handleMobileNavigation("/my-orders")}
                          className="flex items-center justify-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Package size={16} />
                          <span className="text-xs font-medium">Orders</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <button
                        onClick={() => handleMobileNavigation("/login")}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 active:scale-95"
                      >
                        Sign In / Register
                      </button>
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                        Get exclusive deals & 15% off first order
                      </p>
                    </div>
                  )}

                  {/* Main Navigation Links */}
                  <div className="space-y-2 mb-6">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                      Main Navigation
                    </h3>
                    {mobileSections.main.items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleMobileNavigation(item.path)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${isActive(item.path) ? 'text-orange-500' : 'text-gray-500'}`}>
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="text-[10px] font-medium bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* About Section */}
                  <div className="mb-6">
                    <button
                      onClick={() => setActiveMobileSection("about")}
                      className="w-full flex items-center justify-between p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Info size={18} className="text-gray-500" />
                        <span className="font-medium">About Us</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                      Quick Actions
                    </h3>
                    {mobileSections.quick.items.map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : activeMobileSection === "about" ? (
                <div>
                  {/* Back Button */}
                  <button
                    onClick={() => setActiveMobileSection("main")}
                    className="flex items-center gap-2 mb-6 p-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <ChevronRight size={20} className="rotate-180" />
                    <span className="font-medium">Back</span>
                  </button>

                  {/* About Links */}
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                      About The Naivedyam
                    </h3>
                    {mobileSections.about.items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleMobileNavigation(item.path)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="text-[10px] font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Mobile Menu Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {isDarkMode ? (
                      <Sun size={20} className="text-amber-400" />
                    ) : (
                      <Moon size={20} className="text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                  >
                    <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                </div>
                {user && (
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>© 2024 The Naivedyam</span>
                  <span>•</span>
                  <span>All rights reserved</span>
                </div>
              </div>
            </div>
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
    </>
  );
};

export default Navbar;