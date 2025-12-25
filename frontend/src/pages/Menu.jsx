import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X, Filter, ChefHat, Star, Flame, Leaf, Clock, Tag, TrendingUp, Salad, Beef, Fish, Coffee, IceCream, Pizza } from "lucide-react";
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

  // Categories
  const categories = [
    { id: "all", name: "All Dishes", icon: <ChefHat size={18} />, count: menus.length },
    { id: "veg", name: "Vegetarian", icon: <Leaf size={18} />, count: menus.filter(m => m.category === 'veg').length },
    { id: "nonveg", name: "Non-Veg", icon: <Beef size={18} />, count: menus.filter(m => m.category === 'nonveg').length },
    { id: "seafood", name: "Seafood", icon: <Fish size={18} />, count: menus.filter(m => m.category === 'seafood').length },
    { id: "appetizers", name: "Appetizers", icon: <Salad size={18} />, count: menus.filter(m => m.category === 'appetizers').length },
    { id: "maincourse", name: "Main Course", icon: <Pizza size={18} />, count: menus.filter(m => m.category === 'maincourse').length },
    { id: "desserts", name: "Desserts", icon: <IceCream size={18} />, count: menus.filter(m => m.category === 'desserts').length },
    { id: "beverages", name: "Beverages", icon: <Coffee size={18} />, count: menus.filter(m => m.category === 'beverages').length },
  ];

  // Sort options
  const sortOptions = [
    { id: "popular", name: "Most Popular", icon: <TrendingUp size={16} /> },
    { id: "price-low", name: "Price: Low to High", icon: <Tag size={16} /> },
    { id: "price-high", name: "Price: High to Low", icon: <Tag size={16} /> },
    { id: "rating", name: "Highest Rated", icon: <Star size={16} /> },
    { id: "newest", name: "Newest First", icon: <Flame size={16} /> },
  ];

  // Filter and sort menus
  useEffect(() => {
    let filtered = [...menus];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(menu =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default: // popular
        filtered.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredMenus(filtered);
  }, [searchQuery, menus, activeCategory, sortBy, priceRange, minRating]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("popular");
    setPriceRange([0, 1000]);
    setMinRating(0);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };

  const featuredDishes = menus.filter(menu => menu.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-6">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-orange-600 dark:text-orange-400">Exquisite</span> Menu
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover {menus.length}+ handcrafted dishes prepared with passion by our master chefs. 
            Good {getTimeOfDay()}! What will you savor today?
          </p>

          {/* Quick Stats */}
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
          </div>

          {/* Featured Dishes */}
          {featuredDishes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 justify-center">
                <Star className="text-amber-500" size={24} />
                Chef's Specials Today
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {featuredDishes.map(dish => (
                  <div key={dish._id} className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 border border-orange-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                        {dish.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{dish.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">₹{dish.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
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
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Rating: {minRating === 0 ? "Any" : `${minRating}+ stars`}
                    </label>
                    <div className="flex items-center gap-2">
                      {[0, 3, 4, 4.5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`px-3 py-1.5 rounded-lg ${minRating === rating
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

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenus.map((menu) => (
              <MenuCard menu={menu} key={menu._id} />
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
          <div className="mt-16 mb-8">
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-8 text-center text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Hungry for more?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Sign up for our loyalty program and get 15% off your first order + free dessert!
              </p>
              <button className="px-8 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Join The Naivedyam Club
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;