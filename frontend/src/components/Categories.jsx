import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { 
  ChevronRight, 
  Sparkles, 
  Filter, 
  Search, 
  X,
  Clock,
  Flame,
  Award,
  Leaf,
  Zap,
  Star,
  TrendingUp,
  ChefHat,
  Wheat,
  Coffee,
  Pizza,
  Cake,
  Salad,
  Beef,
  Fish,
  Soup,
  IceCream,
  Wine,
  Utensils,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Categories = () => {
  const { navigate, categories: initialCategories } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCategories, setVisibleCategories] = useState(6);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const containerRef = useRef(null);

  // Demo categories with icons and colors if initialCategories is empty
  const demoCategories = [
    { _id: "1", name: "Appetizers", icon: <Salad />, color: "from-green-500 to-emerald-500", count: 12, description: "Start your meal with these delicious bites", popular: true },
    { _id: "2", name: "Main Course", icon: <Beef />, color: "from-red-500 to-orange-500", count: 24, description: "Hearty and satisfying main dishes", popular: true },
    { _id: "3", name: "Seafood Special", icon: <Fish />, color: "from-blue-500 to-cyan-500", count: 15, description: "Fresh catch from the sea", trending: true },
    { _id: "4", name: "Italian Pasta", icon: <Pizza />, color: "from-yellow-500 to-amber-500", count: 18, description: "Authentic Italian pasta dishes", chefPick: true },
    { _id: "5", name: "Vegetarian", icon: <Leaf />, color: "from-green-400 to-teal-500", count: 20, description: "Plant-based delicious options", healthy: true },
    { _id: "6", name: "Desserts", icon: <Cake />, color: "from-pink-500 to-rose-500", count: 14, description: "Sweet treats to end your meal", popular: true },
    { _id: "7", name: "Beverages", icon: <Coffee />, color: "from-brown-500 to-amber-900", count: 22, description: "Refreshing drinks and cocktails", trending: true },
    { _id: "8", name: "Soups", icon: <Soup />, color: "from-orange-400 to-yellow-500", count: 10, description: "Warm and comforting soups", healthy: true },
    { _id: "9", name: "BBQ Grill", icon: <Flame />, color: "from-red-600 to-orange-600", count: 16, description: "Smoky grilled specialties", popular: true },
    { _id: "10", name: "Asian Fusion", icon: <Utensils />, color: "from-purple-500 to-pink-500", count: 19, description: "Modern Asian cuisine", trending: true },
    { _id: "11", name: "Breakfast", icon: <Wheat />, color: "from-yellow-400 to-orange-400", count: 13, description: "Morning delights", healthy: true },
    { _id: "12", name: "Ice Creams", icon: <IceCream />, color: "from-blue-300 to-cyan-300", count: 8, description: "Creamy frozen desserts", popular: true },
  ];

  const categories = initialCategories.length > 0 ? initialCategories : demoCategories;

  // Filters
  const filters = [
    { id: "all", label: "All", icon: <Sparkles size={16} /> },
    { id: "popular", label: "Popular", icon: <TrendingUp size={16} /> },
    { id: "trending", label: "Trending", icon: <Zap size={16} /> },
    { id: "healthy", label: "Healthy", icon: <Leaf size={16} /> },
    { id: "chef", label: "Chef's Pick", icon: <ChefHat size={16} /> },
  ];

  // Filter categories based on search and selected filter
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "popular") return matchesSearch && category.popular;
    if (selectedFilter === "trending") return matchesSearch && category.trending;
    if (selectedFilter === "healthy") return matchesSearch && category.healthy;
    if (selectedFilter === "chef") return matchesSearch && category.chefPick;
    
    return matchesSearch;
  });

  // Load more categories
  const loadMore = () => {
    setVisibleCategories(prev => Math.min(prev + 6, categories.length));
  };

  // Handle category click with animation
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Add click animation
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.classList.add("scale-95");
      setTimeout(() => element.classList.remove("scale-95"), 300);
    }
    
    setTimeout(() => {
      navigate(`/menu?category=${categoryId}`);
    }, 500);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSelectedFilter("all");
  };

  // Scroll to categories
  const scrollToCategories = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Featured categories for mobile carousel
  const featuredCategories = categories.slice(0, 4);

  return (
    <section 
      ref={containerRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:to-yellow-500/20 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full mb-4 sm:mb-6 border border-orange-500/20">
            <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-orange-500" />
            <span className="text-xs xs:text-sm font-semibold text-orange-600 dark:text-orange-400">
              Culinary Collection
            </span>
          </div>
          
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Explore Our
            </span>
            <span className="block text-gray-900 dark:text-white mt-1 sm:mt-2">
              Food Categories
            </span>
          </h2>
          
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg xs:max-w-xl sm:max-w-2xl mx-auto px-2 leading-relaxed">
            Discover handcrafted dishes from our carefully curated culinary categories, 
            each prepared with passion and premium ingredients
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6 sm:mb-8">
            <div className={`relative group transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <div className="absolute left-3 xs:left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Search className={`w-4 h-4 xs:w-5 xs:h-5 transition-colors ${isSearchFocused ? 'text-orange-500' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                placeholder="Search categories (Italian, Vegan, Desserts...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 xs:pl-12 pr-10 xs:pr-12 py-3 xs:py-4 text-sm xs:text-base bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl xs:rounded-2xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 xs:right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex justify-center gap-2 sm:gap-3 px-2 min-w-max">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 whitespace-nowrap ${
                    selectedFilter === filter.id
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className={`${selectedFilter === filter.id ? 'text-white' : 'text-orange-500'}`}>
                    {filter.icon}
                  </span>
                  <span className="text-xs xs:text-sm font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Featured Carousel */}
        <div className="lg:hidden mb-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Featured</h3>
            <button
              onClick={scrollToCategories}
              className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400 font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide px-2">
            {featuredCategories.map((cat) => (
              <div
                key={cat._id}
                className="flex-shrink-0 w-40 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-lg"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3`}>
                  {cat.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{cat.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{cat.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                    {cat.count} items
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <AnimatePresence>
          {filteredCategories.length > 0 ? (
            <>
              <motion.div 
                layout
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
              >
                {filteredCategories.slice(0, visibleCategories).map((cat, index) => (
                  <motion.div
                    id={`category-${cat._id}`}
                    key={cat._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group relative cursor-pointer transition-all duration-300 ${
                      activeCategory === cat._id ? 'ring-2 ring-orange-500 ring-offset-2' : ''
                    }`}
                    onClick={() => handleCategoryClick(cat._id)}
                  >
                    {/* Card Container */}
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800 group-hover:border-orange-500/50 dark:group-hover:border-orange-500/50 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-500 h-full">
                      
                      {/* Header with Icon */}
                      <div className="relative p-5 sm:p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                            <div className="text-white">
                              {cat.icon || <Utensils className="w-6 h-6" />}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            <span className="text-xs font-semibold text-gray-800 dark:text-white">
                              {cat.count || Math.floor(Math.random() * 15) + 5}
                            </span>
                          </div>
                        </div>

                        {/* Category Name */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
                          {cat.name}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {cat.description || "Explore our delicious selection of dishes in this category"}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {cat.popular && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 dark:text-red-400 rounded-full">
                              <Flame className="w-3 h-3" />
                              Popular
                            </span>
                          )}
                          {cat.trending && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 rounded-full">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </span>
                          )}
                          {cat.chefPick && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-500/10 to-amber-500/10 text-yellow-600 dark:text-yellow-400 rounded-full">
                              <Award className="w-3 h-3" />
                              Chef's Pick
                            </span>
                          )}
                          {cat.healthy && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 rounded-full">
                              <Leaf className="w-3 h-3" />
                              Healthy
                            </span>
                          )}
                        </div>

                        {/* Action Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Click to explore
                          </span>
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 group-hover:from-orange-500/20 group-hover:to-yellow-500/20 transition-all duration-300">
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:via-orange-500/10 group-hover:to-orange-500/5 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none"></div>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute -z-10 -inset-2 bg-gradient-to-r from-orange-500/0 to-yellow-500/0 group-hover:from-orange-500/10 group-hover:to-yellow-500/10 rounded-2xl sm:rounded-3xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {visibleCategories < filteredCategories.length && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-10 sm:mb-12"
                >
                  <button
                    onClick={loadMore}
                    className="group inline-flex items-center gap-2 xs:gap-3 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 text-gray-800 dark:text-white font-semibold px-6 xs:px-8 py-3 xs:py-4 rounded-full sm:rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 active:scale-95"
                  >
                    <span className="text-sm xs:text-base">Load More Categories</span>
                    <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            /* Empty State */
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="max-w-sm mx-auto px-4">
                <div className="w-20 h-20 xs:w-24 xs:h-24 mx-auto mb-4 xs:mb-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 xs:w-12 xs:h-12 text-orange-500" />
                </div>
                <h3 className="text-xl xs:text-2xl font-bold text-gray-900 dark:text-white mb-2 xs:mb-3">
                  No Categories Found
                </h3>
                <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 mb-4 xs:mb-6">
                  Try searching with different keywords or clear filters
                </p>
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-5 xs:px-6 py-2.5 xs:py-3 rounded-full hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  Clear Search
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Our Culinary Numbers
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Quality and variety that defines our excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4">
            {[
              { 
                label: "Total Categories", 
                value: categories.length, 
                icon: <Utensils className="w-5 h-5" />,
                color: "from-orange-500 to-yellow-500",
                description: "Variety of cuisines"
              },
              { 
                label: "Menu Items", 
                value: "150+", 
                icon: <Award className="w-5 h-5" />,
                color: "from-green-500 to-emerald-500",
                description: "Signature dishes"
              },
              { 
                label: "Chef Specials", 
                value: "25+", 
                icon: <ChefHat className="w-5 h-5" />,
                color: "from-blue-500 to-cyan-500",
                description: "Exclusive creations"
              },
              { 
                label: "Customer Favorites", 
                value: "50+", 
                icon: <Star className="w-5 h-5" fill="currentColor" />,
                color: "from-purple-500 to-pink-500",
                description: "Top rated dishes"
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 p-4 xs:p-5 sm:p-6 hover:border-orange-500/30 transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-3 xs:mb-4">
                    <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div className="text-2xl xs:text-3xl sm:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm xs:text-base font-bold text-gray-900 dark:text-white mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View Menu CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:to-yellow-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-orange-500/20">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Ready to Explore Our Full Menu?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto">
              Browse our complete menu with detailed descriptions, prices, and chef recommendations
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="group inline-flex items-center gap-2 xs:gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-6 xs:px-8 py-3 xs:py-4 rounded-full sm:rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 active:scale-95"
            >
              <span className="text-sm xs:text-base">View Full Menu</span>
              <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;