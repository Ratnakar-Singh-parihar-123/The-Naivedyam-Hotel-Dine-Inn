import { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";
import { 
  Filter, 
  Search, 
  Sparkles, 
  ChefHat, 
  Star, 
  Flame, 
  Leaf, 
  Clock,
  DollarSign,
  TrendingUp,
  X,
  Grid,
  List,
  ChevronDown,
  RefreshCw
} from "lucide-react";

const Menus = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [menus]);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(menus.map(menu => menu.category))];
    return ["all", ...uniqueCategories];
  }, [menus]);

  // Filter and sort menus
  const filteredMenus = useMemo(() => {
    let filtered = [...menus];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(menu =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(menu => menu.category === selectedCategory);
    }

    // Apply price filter
    filtered = filtered.filter(menu => 
      menu.price >= priceRange[0] && menu.price <= priceRange[1]
    );

    // Apply sorting
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
        filtered.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));
    }

    return filtered;
  }, [menus, searchQuery, selectedCategory, priceRange, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => ({
    totalItems: menus.length,
    averagePrice: (menus.reduce((sum, menu) => sum + menu.price, 0) / menus.length).toFixed(2),
    averageRating: (menus.reduce((sum, menu) => sum + (menu.rating || 0), 0) / menus.length).toFixed(1),
    vegetarianCount: menus.filter(menu => menu.isVegetarian).length,
    spicyCount: menus.filter(menu => menu.isSpicy).length,
  }), [menus]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 100]);
    setSortBy("popular");
  };

  const formatCategory = (cat) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'vegetarian':
        return <Leaf className="w-4 h-4 text-green-500" />;
      case 'spicy':
        return <Flame className="w-4 h-4 text-red-500" />;
      case 'chef':
        return <ChefHat className="w-4 h-4 text-orange-500" />;
      default:
        return <Star className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:to-yellow-500/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              Culinary Excellence
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
            Discover Our <span className="text-yellow-500 dark:text-yellow-400">Exquisite</span> Menu
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg px-4">
            Explore our handcrafted dishes, each prepared with passion and the finest ingredients
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Total Items", value: stats.totalItems, icon: <ChefHat className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" },
              { label: "Avg Price", value: `$${stats.averagePrice}`, icon: <DollarSign className="w-4 h-4" />, color: "from-green-500 to-emerald-500" },
              { label: "Avg Rating", value: `${stats.averageRating}/5`, icon: <Star className="w-4 h-4" />, color: "from-yellow-500 to-amber-500" },
              { label: "Trending", value: `${filteredMenus.length} items`, icon: <TrendingUp className="w-4 h-4" />, color: "from-orange-500 to-red-500" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 sm:mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for dishes, ingredients, or categories..."
                className="w-full pl-12 pr-24 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl text-base"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="px-3 sm:px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 text-sm"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-xl animate-slideDown">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-orange-500" />
                  Filter Options
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {getCategoryIcon(category)}
                        <span className="text-sm">
                          {category === "all" ? "All Categories" : formatCategory(category)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>$0</span>
                      <span>$100+</span>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Sort By
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "popular", label: "Most Popular", icon: <Flame className="w-4 h-4" /> },
                      { value: "rating", label: "Highest Rated", icon: <Star className="w-4 h-4" /> },
                      { value: "price-low", label: "Price: Low to High", icon: <DollarSign className="w-4 h-4" /> },
                      { value: "price-high", label: "Price: High to Low", icon: <DollarSign className="w-4 h-4" /> },
                      { value: "newest", label: "Newest First", icon: <Clock className="w-4 h-4" /> },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                          sortBy === option.value
                            ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className={sortBy === option.value ? "text-orange-500" : "text-gray-500"}>
                          {option.icon}
                        </span>
                        <span className="text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    View Mode
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        viewMode === "grid"
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                      <span className="text-sm">Grid</span>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        viewMode === "list"
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <List className="w-4 h-4" />
                      <span className="text-sm">List</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active Filters:
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 rounded-full text-sm">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")} className="ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                {formatCategory(selectedCategory)}
                <button onClick={() => setSelectedCategory("all")} className="ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 100) && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 rounded-full text-sm">
                Price: ${priceRange[0]} - ${priceRange[1]}
                <button onClick={() => setPriceRange([0, 100])} className="ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {filteredMenus.length} {filteredMenus.length === 1 ? 'Item' : 'Items'} Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {searchQuery ? `Results for "${searchQuery}"` : 'Showing all menu items'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors"
              >
                <option value="popular">Sort by: Popular</option>
                <option value="rating">Sort by: Rating</option>
                <option value="price-low">Sort by: Price Low to High</option>
                <option value="price-high">Sort by: Price High to Low</option>
                <option value="newest">Sort by: Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading delicious dishes...</p>
          </div>
        ) : filteredMenus.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 sm:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No Items Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          /* Menu Grid/List */
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" 
            : "space-y-4 sm:space-y-6"
          }>
            {filteredMenus.map((menu) => (
              <MenuCard 
                key={menu._id} 
                menu={menu} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Pagination (Optional - Add if needed) */}
        {filteredMenus.length > 0 && (
          <div className="mt-12 flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Showing {Math.min(filteredMenus.length, 12)} of {filteredMenus.length} items
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all duration-300">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus;