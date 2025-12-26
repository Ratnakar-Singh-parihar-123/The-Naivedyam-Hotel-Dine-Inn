import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import {
  Search,
  X,
  Filter,
  ChefHat,
  Star,
  Flame,
  Leaf,
  Clock,
  Tag,
  TrendingUp,
  Salad,
  Beef,
  Fish,
  Coffee,
  IceCream,
  Pizza,
  Sparkles,
  Award,
  Shield,
  Users,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Grid3x3,
  List,
  Crown,
  Truck,
  Heart,
  Share2,
  CheckCircle
} from "lucide-react";
import MenuCard from "../components/MenuCard";
import { debounce } from "lodash";

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [showQuickFilters, setShowQuickFilters] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Responsive states
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Responsive breakpoints
  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Categories with icons and colors - Memoized for performance
  const categories = useMemo(() => [
    {
      id: "all",
      name: "All",
      icon: <ChefHat size={isMobile ? 16 : 20} />,
      count: menus.length,
      color: "bg-gradient-to-r from-orange-500 to-amber-500",
      textColor: "text-orange-600 dark:text-orange-400"
    },
    {
      id: "veg",
      name: "Veg",
      icon: <Leaf size={isMobile ? 16 : 20} />,
      count: menus.filter(m => m.category === 'veg').length,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      id: "nonveg",
      name: "Non-Veg",
      icon: <Beef size={isMobile ? 16 : 20} />,
      count: menus.filter(m => m.category === 'nonveg').length,
      color: "bg-gradient-to-r from-red-500 to-rose-500",
      textColor: "text-red-600 dark:text-red-400"
    },
    {
      id: "seafood",
      name: "Seafood",
      icon: <Fish size={isMobile ? 16 : 20} />,
      count: menus.filter(m => m.category === 'seafood').length,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: "appetizers",
      name: "Starters",
      icon: <Salad size={isMobile ? 16 : 20} />,
      count: menus.filter(m => m.category === 'appetizers').length,
      color: "bg-gradient-to-r from-lime-500 to-green-500",
      textColor: "text-lime-600 dark:text-lime-400"
    },
    {
      id: "maincourse",
      name: "Mains",
      icon: <Pizza size={isMobile ? 16 : 20} />,
      count: menus.filter(m => m.category === 'maincourse').length,
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: <IceCream size={isMobile ? 16 : 20} />,
      count: menus.filter(m => m.category === 'desserts').length,
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
      textColor: "text-pink-600 dark:text-pink-400"
    },
    {
      id: "beverages",
      name: "Drinks",
      icon: <Coffee size={isMobile ? 16 : 20} />,
      count: menus.filter(m => m.category === 'beverages').length,
      color: "bg-gradient-to-r from-purple-500 to-violet-500",
      textColor: "text-purple-600 dark:text-purple-400"
    },
  ], [menus, isMobile]);

  // Sort options
  const sortOptions = useMemo(() => [
    { id: "popular", name: "Popular", icon: <TrendingUp size={16} /> },
    { id: "price-low", name: "Price: Low to High", icon: <Tag size={16} /> },
    { id: "price-high", name: "Price: High to Low", icon: <Tag size={16} /> },
    { id: "rating", name: "Top Rated", icon: <Star size={16} /> },
    { id: "newest", name: "New Arrivals", icon: <Sparkles size={16} /> },
  ], []);

  // Quick filters for mobile
  const quickFilters = useMemo(() => [
    { id: "spicy", name: "🌶️ Spicy", filter: () => setSearchQuery("spicy"), icon: "🌶️" },
    { id: "veg", name: "🥗 Veg", filter: () => setActiveCategory("veg"), icon: "🥗" },
    { id: "bestseller", name: "⭐ Best Seller", filter: () => setSearchQuery("bestseller"), icon: "⭐" },
    { id: "quick", name: "⚡ Quick", filter: () => setMinRating(4), icon: "⚡" },
    { id: "chefspecial", name: "👨‍🍳 Chef's Pick", filter: () => setSearchQuery("chef"), icon: "👨‍🍳" },
  ], []);

  // Filter and sort menus - Debounced for performance
  useEffect(() => {
    const filterMenus = () => {
      let filtered = [...menus];

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(menu =>
          menu.name.toLowerCase().includes(query) ||
          menu.description?.toLowerCase().includes(query) ||
          menu.tags?.some(tag => tag.toLowerCase().includes(query)) ||
          menu.category?.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (activeCategory !== "all") {
        filtered = filtered.filter(menu => menu.category === activeCategory);
      }

      // Price filter
      filtered = filtered.filter(menu =>
        menu.price >= priceRange[0] && menu.price <= priceRange[1]
      );

      // Rating filter
      if (minRating > 0) {
        filtered = filtered.filter(menu => menu.rating >= minRating);
      }

      // Sort
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          break;
        default: // popular
          filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      }

      setFilteredMenus(filtered);
    };

    filterMenus();
  }, [searchQuery, menus, activeCategory, sortBy, priceRange, minRating]);

  // Featured dishes
  const featuredDishes = useMemo(() =>
    menus.filter(menu => menu.featured).slice(0, isMobile ? 2 : 3)
    , [menus, isMobile]);

  // Mobile-friendly stats
  const mobileStats = useMemo(() => [
    { count: menus.length, label: "Total", icon: "🍽️", color: "text-orange-600" },
    { count: menus.filter(m => m.spicy).length, label: "Spicy", icon: "🌶️", color: "text-red-600" },
    { count: menus.filter(m => m.category === 'veg').length, label: "Vegetarian", icon: "🥗", color: "text-green-600" },
    { count: "25min", label: "Avg Prep", icon: "⏱️", color: "text-blue-600" },
  ], [menus]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("popular");
    setPriceRange([0, 1000]);
    setMinRating(0);
    setShowFilters(false);
    setShowMobileCategories(false);
    setShowMobileSort(false);
    setShowQuickFilters(false);
  }, []);

  const getTimeOfDay = useCallback(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  }, []);

  // Grid columns based on screen size
  const getGridColumns = useCallback(() => {
    if (isMobile) return viewMode === "grid" ? "grid-cols-2" : "grid-cols-1";
    if (isTablet) return viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1";
    return viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1";
  }, [isMobile, isTablet, viewMode]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-8">
      {/* Sticky Header for Mobile */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg'
          : 'bg-white dark:bg-gray-900'
        } border-b border-gray-100 dark:border-gray-800 lg:hidden`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  Menu
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {filteredMenus.length} items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuickFilters(!showQuickFilters)}
                className={`p-2 rounded-lg transition-colors ${showQuickFilters
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
              >
                <SlidersHorizontal size={18} />
              </button>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {viewMode === "grid" ?
                  <List size={18} /> :
                  <Grid3x3 size={18} />
                }
              </button>
            </div>
          </div>

          {/* Quick Search Bar - Mobile */}
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters Bar - Mobile */}
          {showQuickFilters && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {quickFilters.map(filter => (
                <button
                  key={filter.id}
                  onClick={filter.filter}
                  className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-900/20 dark:to-amber-900/20 hover:from-orange-500/20 hover:to-amber-500/20 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium transition-all active:scale-95"
                >
                  {filter.name}
                </button>
              ))}
              <button
                onClick={() => setShowFilters(true)}
                className="flex-shrink-0 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <Filter size={14} />
                More
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-8">
        {/* Hero Header - Desktop */}
        <div className="hidden lg:block text-center mb-8 lg:mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Exquisite</span> Menu
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 px-4">
            Discover {menus.length}+ handcrafted dishes prepared with passion by our master chefs.
            Good {getTimeOfDay()}! What will you savor today?
          </p>

          {/* Quick Stats - Desktop */}
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm">
              <Flame size={16} className="text-orange-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                {menus.filter(m => m.spicy).length} Spicy Options
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm">
              <Leaf size={16} className="text-green-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                {menus.filter(m => m.category === 'veg').length} Vegetarian
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm">
              <Clock size={16} className="text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                Ready in 15-30 mins
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm">
              <Award size={16} className="text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                4.8★ Rating
              </span>
            </div>
          </div>

          {/* Featured Dishes - Desktop */}
          {featuredDishes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 justify-center">
                <Star className="text-amber-500 animate-pulse" size={24} />
                <span>Chef's Specials Today</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {featuredDishes.map((dish, index) => (
                  <div
                    key={dish._id}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-4 border border-orange-500/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${index === 1 ? 'md:scale-105 relative z-10' : ''
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {dish.name.charAt(0)}
                        </div>
                        {dish.spicy && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">🌶️</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{dish.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">₹{dish.price}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium">{dish.rating || 4.5}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Stats Bar */}
        <div className="lg:hidden grid grid-cols-4 gap-2 mb-6">
          {mobileStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className={`text-lg font-bold ${stat.color}`}>{stat.count}</div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Category Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileCategories(!showMobileCategories)}
            className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-orange-500" />
              <span className="font-medium text-gray-900 dark:text-white">Categories</span>
              <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-medium">
                {categories.find(c => c.id === activeCategory)?.name}
              </span>
            </div>
            {showMobileCategories ?
              <ChevronUp size={18} className="text-gray-500" /> :
              <ChevronDown size={18} className="text-gray-500" />
            }
          </button>
        </div>

        {/* Categories - Mobile Expandable */}
        {showMobileCategories && (
          <div className="lg:hidden mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-4 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowMobileCategories(false);
                  }}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 active:scale-95 ${activeCategory === cat.id
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:shadow-md"
                    }`}
                >
                  <div className={`p-2 rounded-full ${activeCategory === cat.id
                      ? 'bg-white/20'
                      : cat.textColor.replace('text', 'bg') + '/20'
                    } mb-2`}>
                    <div className={activeCategory === cat.id ? "text-white" : cat.textColor}>
                      {cat.icon}
                    </div>
                  </div>
                  <span className="text-xs font-medium truncate w-full text-center">{cat.name}</span>
                  <span className={`text-[10px] mt-1 px-1.5 py-0.5 rounded-full ${activeCategory === cat.id
                      ? 'bg-white/20'
                      : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Search and Filter Bar */}
        <div className="hidden lg:block mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            {/* Main Search */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-xl blur"></div>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                placeholder="Search for dishes, ingredients, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 z-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Categories */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg ${activeCategory === cat.id
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                    >
                      <div className={`transition-transform duration-300 ${activeCategory === cat.id ? 'scale-110' : 'group-hover:scale-110'
                        }`}>
                        {cat.icon}
                      </div>
                      <span className="font-medium">{cat.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${activeCategory === cat.id
                          ? 'bg-white/20'
                          : 'bg-gray-200 dark:bg-gray-600'
                        }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort & Filter Button */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${showFilters
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  <Filter size={18} />
                  Filters
                </button>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 pr-10 cursor-pointer transition-colors"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Price Range:
                      <span className="ml-2 font-bold text-orange-600 dark:text-orange-400">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                      </span>
                    </label>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:shadow-lg"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:shadow-lg"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>₹0</span>
                      <span>₹500</span>
                      <span>₹1000</span>
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Minimum Rating
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[0, 3, 4, 4.5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${minRating === rating
                              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                        >
                          {rating === 0 ? (
                            <span>Any Rating</span>
                          ) : (
                            <>
                              <Star size={14} className={minRating === rating ? "text-white" : "text-amber-500"} />
                              <span>{rating}+ Stars</span>
                            </>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sort & Filter Bottom Bar */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileSort(!showMobileSort)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all"
                >
                  <Tag size={16} className="text-orange-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {sortOptions.find(s => s.id === sortBy)?.name}
                  </span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
                {filteredMenus.length > 0 && (
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                    {filteredMenus.length} items
                  </span>
                )}
              </div>
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all active:scale-95"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sort Options Modal */}
        {showMobileSort && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileSort(false)}
            />
            <div className="absolute bottom-0 w-full bg-white dark:bg-gray-900 rounded-t-2xl animate-in slide-in-from-bottom-2 duration-300">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sort By</h3>
                  <button
                    onClick={() => setShowMobileSort(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setShowMobileSort(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl mb-2 transition-all ${sortBy === option.id
                        ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${sortBy === option.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                        {option.icon}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{option.name}</span>
                    </div>
                    {sortBy === option.id && <CheckCircle size={18} className="text-orange-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Summary - Desktop */}
        <div className="hidden lg:flex flex-col sm:flex-row justify-between items-center mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : "All Dishes"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredMenus.length > 0 ? (
                <>
                  Found{" "}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                    {filteredMenus.length}
                  </span>
                  {filteredMenus.length === 1 ? " delicious dish" : " delicious dishes"}
                  {activeCategory !== "all" && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
                </>
              ) : (
                "No dishes found. Try adjusting your search or filters."
              )}
            </p>
          </div>

          {filteredMenus.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                <Clock size={16} />
                <span>Avg. prep time: 20 mins</span>
              </div>
              <button
                onClick={handleClearSearch}
                className="px-6 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-all font-medium shadow-sm hover:shadow-md active:scale-95"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Menu Grid */}
        {filteredMenus.length > 0 ? (
          <div className={`${viewMode === "grid"
            ? `grid ${getGridColumns()} gap-4 lg:gap-6`
            : "space-y-4"
            }`}>
            {filteredMenus.map((menu) => (
              <div
                key={menu._id}
                className={viewMode === "list"
                  ? "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  : "h-full"
                }
              >
                <MenuCard menu={menu} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 lg:py-24">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
                <ChefHat className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No dishes found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 px-4">
              We couldn't find any dishes matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={handleClearSearch}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 active:scale-95"
            >
              Show All Dishes
            </button>
          </div>
        )}

        {/* Promotional Banner */}
        {filteredMenus.length > 8 && (
          <div className="mt-12 mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">

              {/* overlay */}
              <div className="absolute inset-0 bg-black/10"></div>

              <div className="relative p-6 lg:p-8 text-white">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                      Hungry for more? 🍽️
                    </h3>
                    <p className="text-sm lg:text-base opacity-90 max-w-lg">
                      Sign up for our loyalty program and get <b>15% off</b> your first order + free dessert!
                    </p>
                  </div>

                  <button className="px-8 lg:px-10 py-3.5 bg-white text-orange-600 hover:bg-gray-100 rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                    Join The Naivedyam Club
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-24"></div>
    </div>
  );
};

export default Menu;