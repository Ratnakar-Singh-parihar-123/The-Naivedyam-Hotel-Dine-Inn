import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { 
  ShoppingCart, 
  Star, 
  Clock, 
  Flame, 
  Leaf, 
  ChefHat,
  Heart,
  Eye,
  Plus,
  Minus,
  Shield,
  TrendingUp,
  Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

const MenuCard = ({ menu, viewMode = "grid" }) => {
  const { navigate, addToCart, user } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Calculate discount price if applicable
  const discountPrice = menu.discountPercentage 
    ? menu.price - (menu.price * menu.discountPercentage / 100)
    : null;

  // Format preparation time
  const formatPrepTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  // Handle add to cart with loading state
  const handleAddToCart = async () => {
    if (!menu.isAvailable) return;
    
    setIsAddingToCart(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      for (let i = 0; i < quantity; i++) {
        addToCart(menu._id);
      }
      
      toast.success(`${quantity}x "${menu.name}" added to cart!`, {
        icon: '🛒',
        duration: 3000,
      });
      
      // Reset quantity
      setQuantity(1);
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted 
        ? "Removed from favorites" 
        : "Added to favorites!",
      {
        icon: isWishlisted ? '💔' : '❤️',
        duration: 2000,
      }
    );
  };

  // Render stars for rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'fill-gray-300 text-gray-300'
        }`}
      />
    ));
  };

  // Handle quantity changes
  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  if (viewMode === "list") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex">
          {/* Image Section */}
          <div className="relative w-1/3 min-h-[200px]">
            <div
              onClick={() => navigate(`/menu-details/${menu._id}`)}
              className="relative h-full w-full overflow-hidden cursor-pointer"
            >
              <img
                src={menu.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"}
                alt={menu.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                {menu.isVegetarian && (
                  <span className="flex items-center gap-1 bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    <Leaf size={10} />
                    Veg
                  </span>
                )}
                {menu.isSpicy && (
                  <span className="flex items-center gap-1 bg-gradient-to-r from-red-500/90 to-orange-500/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    <Flame size={10} />
                    Spicy
                  </span>
                )}
              </div>
              
              {/* Quick View Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsQuickViewOpen(true);
                }}
                className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white"
              >
                <Eye size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            
            {/* Chef's Special Badge */}
            {menu.isChefSpecial && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <ChefHat size={12} />
                Chef's Pick
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 
                    onClick={() => navigate(`/menu-details/${menu._id}`)}
                    className="text-xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer line-clamp-1"
                  >
                    {menu.name}
                  </h3>
                  
                  {menu.isPopular && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-600 dark:text-pink-400 text-xs font-medium px-2 py-0.5 rounded-full">
                      <TrendingUp size={10} />
                      Popular
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {menu.description}
                </p>
              </div>
              
              {/* Wishlist Button */}
              <button
                onClick={toggleWishlist}
                className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                <Heart
                  size={20}
                  className={isWishlisted 
                    ? "fill-red-500 text-red-500" 
                    : "text-gray-400 hover:text-red-500"
                  }
                />
              </button>
            </div>

            {/* Rating and Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(menu.rating || 4.5)}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {menu.rating || 4.5}
                  {menu.reviewCount && ` (${menu.reviewCount})`}
                </span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                {menu.prepTime && (
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatPrepTime(menu.prepTime)}
                  </span>
                )}
                
                {menu.calories && (
                  <span className="flex items-center gap-1">
                    <Flame size={14} />
                    {menu.calories} cal
                  </span>
                )}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${discountPrice ? discountPrice.toFixed(2) : menu.price.toFixed(2)}
                  </span>
                  {discountPrice && (
                    <>
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        ${menu.price.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 py-0.5 rounded-full">
                        -{menu.discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
                
                {/* Quantity Selector */}
                {menu.isAvailable && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= 10}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {!menu.isAvailable ? (
                  <div className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-medium">
                    Currently Unavailable
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                        <div className="absolute inset-0 rounded-xl bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700">
      {/* Image Section */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <div
          onClick={() => navigate(`/menu-details/${menu._id}`)}
          className="relative h-full w-full cursor-pointer"
        >
          <img
            src={menu.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"}
            alt={menu.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80";
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <div className="flex flex-wrap gap-1">
              {menu.isVegetarian && (
                <span className="flex items-center gap-1 bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  <Leaf size={10} />
                  Vegetarian
                </span>
              )}
              {menu.isSpicy && (
                <span className="flex items-center gap-1 bg-gradient-to-r from-red-500/90 to-orange-500/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  <Flame size={10} />
                  Spicy
                </span>
              )}
              {menu.isGlutenFree && (
                <span className="flex items-center gap-1 bg-gradient-to-r from-blue-500/90 to-cyan-500/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  <Shield size={10} />
                  Gluten-Free
                </span>
              )}
            </div>
            
            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className="w-9 h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white"
            >
              <Heart
                size={18}
                className={isWishlisted 
                  ? "fill-red-500 text-red-500" 
                  : "text-gray-700 dark:text-gray-300 hover:text-red-500"
                }
              />
            </button>
          </div>
          
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsQuickViewOpen(true);
            }}
            className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white"
          >
            <Eye size={18} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        
        {/* Chef's Special Badge */}
        {menu.isChefSpecial && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <ChefHat size={12} />
            Chef's Pick
          </div>
        )}
        
        {/* Discount Badge */}
        {discountPrice && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            -{menu.discountPercentage}%
          </div>
        )}
        
        {/* Popular Badge */}
        {menu.isPopular && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
            <TrendingUp size={10} />
            Trending
          </div>
        )}
        
        {/* Unavailable Overlay */}
        {!menu.isAvailable && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-white font-bold text-lg mb-2">Currently Unavailable</div>
              <button
                onClick={() => toast("We'll notify you when it's back!", { icon: '🔔' })}
                className="text-sm text-orange-300 hover:text-orange-200 font-medium"
              >
                Notify Me
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h3
              onClick={() => navigate(`/menu-details/${menu._id}`)}
              className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer line-clamp-1 flex-1"
            >
              {menu.name}
            </h3>
            
            {menu.isPremium && (
              <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-medium px-2 py-0.5 rounded-full ml-2">
                <Sparkles size={10} />
                Premium
              </span>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
            {menu.description}
          </p>
        </div>

        {/* Rating and Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(menu.rating || 4.5)}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                {menu.rating || 4.5}
              </span>
            </div>
            
            {menu.prepTime && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock size={12} />
                {formatPrepTime(menu.prepTime)}
              </span>
            )}
          </div>
          
          {menu.calories && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Flame size={12} />
              {menu.calories} cal
            </span>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              ${discountPrice ? discountPrice.toFixed(2) : menu.price.toFixed(2)}
            </span>
            {discountPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${menu.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {menu.isAvailable ? (
              <>
                {/* Quantity Selector */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-medium text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isAddingToCart ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Add</span>
                    </>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </>
            ) : (
              <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-sm font-medium">
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal (Simplified) */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Quick view content would go here */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Quick View</h3>
                <button
                  onClick={() => setIsQuickViewOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  ✕
                </button>
              </div>
              <p>Quick view feature coming soon!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;