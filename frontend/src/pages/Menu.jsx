import { useContext, useEffect, useState } from "react";
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
  Share2
} from "lucide-react";
import MenuCard from "../components/MenuCard";

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

  // Responsive breakpoints
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Categories with icons and colors
  const categories = [
    { 
      id: "all", 
      name: "All", 
      icon: <ChefHat size={isMobile ? 14 : 18} />, 
      count: menus.length,
      color: "bg-gradient-to-r from-orange-500 to-amber-500",
      textColor: "text-orange-600 dark:text-orange-400"
    },
    { 
      id: "veg", 
      name: "Veg", 
      icon: <Leaf size={isMobile ? 14 : 18} />, 
      count: menus.filter(m => m.category === 'veg').length,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      textColor: "text-green-600 dark:text-green-400"
    },
    { 
      id: "nonveg", 
      name: "Non-Veg", 
      icon: <Beef size={isMobile ? 14 : 18} />, 
      count: menus.filter(m => m.category === 'nonveg').length,
      color: "bg-gradient-to-r from-red-500 to-rose-500",
      textColor: "text-red-600 dark:text-red-400"
    },
    { 
      id: "seafood", 
      name: "Seafood", 
      icon: <Fish size={isMobile ? 14 : 18} />, 
      count: menus.filter(m => m.category === 'seafood').length,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    { 
      id: "appetizers", 
      name: "Starters", 
      icon: <Salad size={isMobile ? 14 : 18} />, 
      count: menus.filter(m => m.category === 'appetizers').length,
      color: "bg-gradient-to-r from-lime-500 to-green-500",
      textColor: "text-lime-600 dark:text-lime-400"
    },
    { 
      id: "maincourse", 
      name: "Mains", 
      icon: <Pizza size={isMobile ? 14 : 18} />, 
      count: menus.filter(m => m.category === 'maincourse').length,
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    { 
      id: "desserts", 
      name: "Desserts", 
      icon: <IceCream size={isMobile ? 14 : 18} />, 
      count: menus.filter(m => m.category === 'desserts').length,
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
      textColor: "text-pink-600 dark:text-pink-400"
    },
    { 
      id: "beverages", 
      name: "Drinks", 
      icon: <Coffee size={isMobile ? 14 : 18} />, 
      count: menus.filter(m => m.category === 'beverages').length,
      color: "bg-gradient-to-r from-purple-500 to-violet-500",
      textColor: "text-purple-600 dark:text-purple-400"
    },
  ];

  // Sort options
  const sortOptions = [
    { id: "popular", name: "Popular", icon: <TrendingUp size={isMobile ? 14 : 16} /> },
    { id: "price-low", name: "Price: Low", icon: <Tag size={isMobile ? 14 : 16} /> },
    { id: "price-high", name: "Price: High", icon: <Tag size={isMobile ? 14 : 16} /> },
    { id: "rating", name: "Top Rated", icon: <Star size={isMobile ? 14 : 16} /> },
    { id: "newest", name: "New", icon: <Sparkles size={isMobile ? 14 : 16} /> },
  ];

  // Quick filters for mobile
  const quickFilters = [
    { id: "spicy", name: "🌶️ Spicy", filter: () => setSearchQuery("spicy") },
    { id: "veg", name: "🥗 Veg", filter: () => setActiveCategory("veg") },
    { id: "bestseller", name: "⭐ Bestseller", filter: () => setSearchQuery("bestseller") },
    { id: "quick", name: "⚡ Quick", filter: () => setMinRating(4) },
  ];

  // Filter and sort menus
  useEffect(() => {
    let filtered = [...menus];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(menu =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        menu.category?.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [searchQuery, menus, activeCategory, sortBy, priceRange, minRating]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("popular");
    setPriceRange([0, 1000]);
    setMinRating(0);
    setShowFilters(false);
    setShowMobileCategories(false);
    setShowMobileSort(false);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  const featuredDishes = menus.filter(menu => menu.featured).slice(0, 3);

  // Mobile-friendly stats
  const mobileStats = [
    { count: menus.length, label: "Dishes", icon: "🍽️" },
    { count: menus.filter(m => m.spicy).length, label: "Spicy", icon: "🌶️" },
    { count: menus.filter(m => m.category === 'veg').length, label: "Veg", icon: "🥗" },
    { count: "30min", label: "Avg Prep", icon: "⏱️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pb-8">
      {/* Sticky Header for Mobile */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 shadow-lg shadow-black/5 lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-500" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Menu
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuickFilters(!showQuickFilters)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <SlidersHorizontal size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                {viewMode === "grid" ? 
                  <List size={18} className="text-gray-700 dark:text-gray-300" /> : 
                  <Grid3x3 size={18} className="text-gray-700 dark:text-gray-300" />
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
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters Bar - Mobile */}
          {showQuickFilters && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {quickFilters.map(filter => (
                <button
                  key={filter.id}
                  onClick={filter.filter}
                  className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-900/20 dark:to-amber-900/20 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium"
                >
                  {filter.name}
                </button>
              ))}
              <button
                onClick={() => setShowFilters(true)}
                className="flex-shrink-0 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium flex items-center gap-1"
              >
                <Filter size={14} />
                More
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-12">
        {/* Hero Header - Desktop */}
        <div className="hidden lg:block text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-6 shadow-lg shadow-orange-500/30">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-orange-600 dark:text-orange-400">Exquisite</span> Menu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover {menus.length}+ handcrafted dishes prepared with passion by our master chefs. 
            Good {getTimeOfDay()}! What will you savor today?
          </p>

          {/* Quick Stats - Desktop */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full">
              <Flame size={16} className="text-orange-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {menus.filter(m => m.spicy).length} Spicy Options
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full">
              <Leaf size={16} className="text-green-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {menus.filter(m => m.category === 'veg').length} Vegetarian
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full">
              <Clock size={16} className="text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Ready in 15-30 mins
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-full">
              <Award size={16} className="text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                4.8★ Rating
              </span>
            </div>
          </div>

          {/* Featured Dishes - Desktop */}
          {featuredDishes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 justify-center">
                <Star className="text-amber-500" size={24} />
                Chef's Specials Today
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {featuredDishes.map(dish => (
                  <div key={dish._id} className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 border border-orange-500/20 hover:scale-[1.02] transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {dish.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{dish.name}</h3>
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
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.count}</div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Category Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileCategories(!showMobileCategories)}
            className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-orange-500" />
              <span className="font-medium text-gray-900 dark:text-white">Categories</span>
              <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">
                {categories.find(c => c.id === activeCategory)?.name}
              </span>
            </div>
            {showMobileCategories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Categories - Mobile Expandable */}
        {showMobileCategories && (
          <div className="lg:hidden mb-6">
            <div className="grid grid-cols-4 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowMobileCategories(false);
                  }}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${activeCategory === cat.id
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700"
                    }`}
                >
                  <div className={`p-2 rounded-full ${activeCategory === cat.id ? 'bg-white/20' : cat.color + '/20'} mb-1`}>
                    <div className={activeCategory === cat.id ? "text-white" : cat.textColor}>
                      {cat.icon}
                    </div>
                  </div>
                  <span className="text-xs font-medium">{cat.name}</span>
                  <span className="text-[10px] mt-0.5 opacity-75">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Search and Filter Bar */}
        <div className="hidden lg:block mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
            {/* Main Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for dishes, ingredients, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-gray-900 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
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
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeCategory === cat.id
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                    >
                      {cat.icon}
                      <span>{cat.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600'}`}>
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
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-lg hover:from-gray-900 hover:to-black transition-all"
                >
                  <Filter size={18} />
                  Filters
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-orange-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Rating: {minRating === 0 ? "Any" : `${minRating}+ stars`}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[0, 3, 4, 4.5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${minRating === rating
                              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                        >
                          {rating === 0 ? "Any" : `${rating}+`}
                          {rating > 0 && <Star size={12} className="inline ml-1" />}
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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl z-50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileSort(!showMobileSort)}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg"
              >
                <Tag size={16} className="text-orange-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {sortOptions.find(s => s.id === sortBy)?.name}
                </span>
              </button>
              {filteredMenus.length > 0 && (
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                  {filteredMenus.length} items
                </span>
              )}
            </div>
            <button
              onClick={handleClearSearch}
              className="px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium text-sm"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Mobile Sort Options Modal */}
        {showMobileSort && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end">
            <div className="bg-white dark:bg-gray-900 rounded-t-2xl w-full max-h-[70vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sort By</h3>
                  <button onClick={() => setShowMobileSort(false)}>
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setShowMobileSort(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 ${sortBy === option.id
                        ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {option.icon}
                      <span className="font-medium text-gray-900 dark:text-white">{option.name}</span>
                    </div>
                    {sortBy === option.id && <CheckCircle size={18} className="text-orange-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="hidden lg:flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {searchQuery ? "Search Results" : "All Dishes"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredMenus.length > 0 ? (
                <>
                  Found{" "}
                  <span className="font-bold text-orange-600 dark:text-orange-400">
                    {filteredMenus.length}
                  </span>
                  {filteredMenus.length === 1 ? " delicious dish" : " delicious dishes"}
                  {searchQuery && ` for "${searchQuery}"`}
                  {activeCategory !== "all" && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
                </>
              ) : (
                "No dishes found. Try different filters."
              )}
            </p>
          </div>

          {filteredMenus.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock size={16} />
                <span>Avg. prep time: 20 mins</span>
              </div>
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-all font-medium"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Menu Grid */}
        {filteredMenus.length > 0 ? (
          <div className={`${viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6" 
            : "space-y-4"
          }`}>
            {filteredMenus.map((menu) => (
              <div key={menu._id} className={viewMode === "list" ? "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700" : ""}>
                <MenuCard menu={menu} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mb-6">
              <ChefHat className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No dishes found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              We couldn't find any dishes matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={handleClearSearch}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
            >
              Show All Dishes
            </button>
          </div>
        )}

        {/* Promotional Banner */}
        {filteredMenus.length > 8 && (
          <div className="mt-12 mb-8">
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-6 lg:p-8 text-center text-white shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">Hungry for more?</h3>
                  <p className="text-sm lg:text-base opacity-90">
                    Sign up for our loyalty program and get 15% off + free dessert!
                  </p>
                </div>
                <button className="px-6 lg:px-8 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
                  Join The Naivedyam Club
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
};

export default Menu;