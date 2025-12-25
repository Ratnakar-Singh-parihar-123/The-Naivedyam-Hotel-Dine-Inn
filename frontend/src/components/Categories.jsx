import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { ChevronRight, Sparkles, Filter, Search } from "lucide-react";

const Categories = () => {
  const { navigate, categories } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCategories, setVisibleCategories] = useState(8);
  
  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load more categories
  const loadMore = () => {
    setVisibleCategories(prev => Math.min(prev + 6, categories.length));
  };

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/menu?category=${categoryId}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:to-yellow-500/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              Food Categories
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Explore Our
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Delicious Categories</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover handcrafted dishes from our carefully curated culinary categories, 
            each prepared with passion and premium ingredients
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {filteredCategories.slice(0, visibleCategories).map((cat, index) => (
            <div
              key={cat._id}
              className={`group relative cursor-pointer ${
                activeCategory === cat._id ? "scale-[1.02]" : ""
              }`}
              onClick={() => handleCategoryClick(cat._id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-100 dark:border-gray-800 group-hover:border-orange-500/50 dark:group-hover:border-orange-500/50 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-500 h-full">
                
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cat.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Item Count Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      {cat.itemCount || Math.floor(Math.random() * 15) + 5} items
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {cat.description || "Explore our delicious selection of dishes in this category"}
                  </p>
                  
                  {/* Popular Items */}
                  <div className="flex flex-wrap gap-2">
                    {["Popular", "Chef's Pick", "Vegetarian"].slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 text-xs font-medium bg-gradient-to-r from-orange-500/10 to-yellow-500/10 text-orange-600 dark:text-orange-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:via-orange-500/10 group-hover:to-orange-500/5 rounded-3xl transition-all duration-500 pointer-events-none"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-orange-500/0 to-yellow-500/0 group-hover:from-orange-500/10 group-hover:to-yellow-500/10 rounded-3xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCategories < filteredCategories.length && (
          <div className="text-center mb-12">
            <button
              onClick={loadMore}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 text-gray-800 dark:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <span>Load More Categories</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No Categories Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try searching with different keywords
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Statistics Bar */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Categories", value: categories.length },
              { label: "Menu Items", value: "150+" },
              { label: "Chef Specials", value: "25+" },
              { label: "Customer Favorites", value: "50+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-orange-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;