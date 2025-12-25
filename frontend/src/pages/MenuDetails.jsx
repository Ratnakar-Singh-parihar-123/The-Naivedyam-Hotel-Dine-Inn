import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { 
  ArrowLeft, 
  CheckCircle, 
  ShoppingCart, 
  XCircle, 
  ChefHat, 
  Clock, 
  Flame, 
  Leaf, 
  Star, 
  TrendingUp, 
  Shield, 
  Truck, 
  Heart,
  Plus,
  Minus,
  Share2,
  Info,
  Award,
  Users,
  Calendar,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate, addToCart, cart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  const menu = menus.find((item) => item._id === id);

  // Calculate if item is in cart
  const itemInCart = cart?.items?.find(item => item.menuItem?._id === id);
  const cartQuantity = itemInCart ? itemInCart.quantity : 0;

  // Menu options (could come from backend)
  const menuOptions = [
    { id: 1, name: "Regular", price: 0, description: "Standard serving" },
    { id: 2, name: "Large", price: 50, description: "40% larger portion" },
    { id: 3, name: "Extra Spicy", price: 20, description: "Add extra chili" },
    { id: 4, name: "Cheese Topping", price: 30, description: "Add grated cheese" },
  ];

  // Nutrition facts
  const nutritionFacts = [
    { label: "Calories", value: "450 kcal" },
    { label: "Protein", value: "25g" },
    { label: "Carbs", value: "45g" },
    { label: "Fat", value: "18g" },
    { label: "Fiber", value: "6g" },
    { label: "Sugar", value: "8g" },
  ];

  // Similar dishes
  const similarDishes = menus
    .filter(item => item.category === menu?.category && item._id !== id)
    .slice(0, 4);

  if (!menu) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-900/20 dark:to-amber-900/20 rounded-full flex items-center justify-center mb-8">
            <XCircle className="w-16 h-16 text-orange-500 dark:text-orange-400" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dish Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/menu")}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
            >
              Explore Menu
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:from-gray-900 hover:to-black dark:hover:from-gray-600 dark:hover:to-gray-700 text-white rounded-xl font-semibold shadow-lg shadow-gray-500/30 transition-all duration-300"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = (menu.price + (selectedOption?.price || 0)) * quantity;

  const handleAddToCart = () => {
    addToCart(menu._id, quantity);
    toast.success(
      <div className="flex items-center gap-2">
        <ShoppingCart size={18} />
        Added {quantity} {menu.name} to cart
      </div>,
      {
        icon: '🛒',
        duration: 3000,
        style: {
          background: '#10B981',
          color: '#fff',
        }
      }
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", { icon: '🔗' });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removed from favorites" : "Added to favorites",
      { icon: isFavorite ? '❤️‍🩹' : '❤️' }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Back Button & Actions */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to menu</span>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Share"
            >
              <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={handleFavorite}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Add to favorites"
            >
              <Heart 
                size={20} 
                className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Image & Stats */}
          <div className="space-y-8">
            {/* Image Section */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-[400px] object-cover"
              />
              
              {/* Availability Badge */}
              <div className="absolute top-6 right-6">
                {menu.isAvailable ? (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>Available Now</span>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                    <XCircle className="w-5 h-5" />
                    <span>Currently Unavailable</span>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{menu.rating || "4.5"}</span>
                      <span className="text-gray-300 text-sm">({menu.reviews || 120})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{menu.prepTime || "25"} min</span>
                    </div>
                    {menu.spicy && (
                      <div className="flex items-center gap-1">
                        <Flame size={16} className="text-red-400" />
                        <span>Spicy</span>
                      </div>
                    )}
                    {menu.veg && (
                      <div className="flex items-center gap-1">
                        <Leaf size={16} className="text-green-400" />
                        <span>Vegetarian</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 border border-orange-500/10">
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Popularity</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      #{menu.popularity || 1} in {menu.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl p-4 border border-blue-500/10">
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Chef's Pick</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Recommended by Chef Arvind</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Dishes */}
            {similarDishes.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users size={20} className="text-orange-500" />
                  You Might Also Like
                </h3>
                <div className="space-y-3">
                  {similarDishes.map(dish => (
                    <div 
                      key={dish._id}
                      onClick={() => navigate(`/menu/${dish._id}`)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors"
                    >
                      <img 
                        src={dish.image} 
                        alt={dish.name} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{dish.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">₹{dish.price}</p>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-8">
            {/* Title and Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {menu.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {menu.category} • Serves {menu.serves || 1-2} people
                  </p>
                </div>
                {menu.bestSeller && (
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    BEST SELLER
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-bold text-orange-600 dark:text-orange-400">
                  ₹{menu.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-lg">per serving</span>
                {menu.originalPrice && (
                  <span className="text-gray-400 dark:text-gray-500 line-through text-xl">
                    ₹{menu.originalPrice}
                  </span>
                )}
              </div>

              {/* Already in cart indicator */}
              {cartQuantity > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-green-700 dark:text-green-400 font-medium">
                      {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'} already in cart
                    </span>
                    <button
                      onClick={() => navigate("/cart")}
                      className="ml-auto text-sm text-orange-600 dark:text-orange-400 hover:underline"
                    >
                      View Cart
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-6">
                {["description", "ingredients", "nutrition"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-medium transition-colors relative ${
                      activeTab === tab
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              {activeTab === "description" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Info size={20} />
                    About This Dish
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {menu.description || "A delicious masterpiece crafted by our expert chefs using the finest ingredients. This dish represents the perfect balance of flavors, textures, and aromas that will transport your senses to culinary heaven."}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <ChefHat size={16} className="text-orange-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Prepared fresh daily</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Hygiene certified</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Key Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Fresh vegetables",
                      "Premium spices",
                      "Herbs & seasonings",
                      "Quality oils",
                      "Signature sauces"
                    ].map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-lg">
                    <AlertCircle size={18} className="text-orange-500 inline mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Contains dairy and gluten. Please inform about allergies.
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "nutrition" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Nutrition Facts (per serving)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {nutritionFacts.map((item, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Customization Options */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Customize Your Order
              </h3>
              <div className="space-y-3">
                {menuOptions.map(option => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption?.id === option.id
                        ? "border-orange-500 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedOption?.id === option.id
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{option.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                      </div>
                    </div>
                    <div className="text-orange-600 dark:text-orange-400 font-medium">
                      {option.price > 0 ? `+₹${option.price}` : "Free"}
                    </div>
                    <input
                      type="radio"
                      name="option"
                      checked={selectedOption?.id === option.id}
                      onChange={() => setSelectedOption(option)}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity & Total */}
            <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-orange-500/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-gray-900 dark:text-white font-semibold">Quantity</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">How many would you like?</div>
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-6 py-3 text-xl font-bold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Base Price</span>
                  <span className="font-medium">₹{menu.price} × {quantity}</span>
                </div>
                {selectedOption && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{selectedOption.name}</span>
                    <span className="font-medium">+₹{selectedOption.price}</span>
                  </div>
                )}
                <div className="border-t border-orange-500/20 pt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">Total Amount</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Inclusive of all taxes</div>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      ₹{totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={!menu.isAvailable}
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    menu.isAvailable
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 active:scale-95"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {menu.isAvailable ? `Add to Cart • ₹${totalPrice.toFixed(2)}` : "Currently Unavailable"}
                </button>
                <button
                  disabled={!menu.isAvailable}
                  onClick={() => {
                    handleAddToCart();
                    navigate("/checkout");
                  }}
                  className={`px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                    menu.isAvailable
                      ? "bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:from-gray-900 hover:to-black dark:hover:from-gray-600 dark:hover:to-gray-700 text-white shadow-lg active:scale-95"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border border-blue-500/10">
              <div className="flex items-center gap-3">
                <Truck className="text-blue-500" size={24} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Free Delivery</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">45-60 mins • Min. order ₹199</p>
                </div>
              </div>
              <Calendar className="text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;