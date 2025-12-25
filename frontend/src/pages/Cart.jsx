import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ChefHat, 
  Truck, 
  Shield, 
  Gift, 
  Clock, 
  CreditCard, 
  Heart,
  Tag,
  Sparkles,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, totalPrice, navigate, axios, fetchCartData } = useContext(AppContext);
  const [updatingItems, setUpdatingItems] = useState({});

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-500/10 to-amber-500/10 dark:from-orange-900/20 dark:to-amber-900/20 rounded-full flex items-center justify-center mb-8">
            <ShoppingBag className="w-16 h-16 text-orange-500 dark:text-orange-400" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any delicious items yet. Explore our menu and discover something tasty!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 inline-flex items-center gap-2"
            >
              <ChefHat size={20} />
              Explore Menu
            </Link>
            <Link
              to="/"
              className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:from-gray-900 hover:to-black dark:hover:from-gray-600 dark:hover:to-gray-700 text-white rounded-xl font-semibold shadow-lg shadow-gray-500/30 transition-all duration-300"
            >
              Go to Home
            </Link>
          </div>
          
          {/* Popular Suggestions */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Popular This Week
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { name: "Butter Chicken", price: "₹349", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300" },
                { name: "Paneer Tikka", price: "₹299", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w-300" },
                { name: "Garlic Naan", price: "₹99", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300" }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-orange-600 dark:text-orange-400 font-bold">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuId}`);
      if (data.success) {
        toast.success(
          <div className="flex items-center gap-2">
            <Trash2 size={16} />
            Item removed from cart
          </div>,
          {
            icon: '🗑️',
            duration: 2000
          }
        );
        fetchCartData();
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (menuId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(menuId);
      return;
    }

    setUpdatingItems(prev => ({ ...prev, [menuId]: true }));
    
    try {
      const { data } = await axios.put(`/api/cart/update/${menuId}`, {
        quantity: newQuantity
      });
      
      if (data.success) {
        fetchCartData();
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingItems(prev => ({ ...prev, [menuId]: false }));
    }
  };

  const applyCoupon = () => {
    toast(
      <div className="text-center">
        <p className="font-bold mb-2">Apply Coupon</p>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
              Apply
            </button>
            <button className="bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      </div>,
      {
        duration: 5000,
        icon: '🎟️'
      }
    );
  };

  const estimatedDelivery = new Date(Date.now() + 45 * 60000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your <span className="text-orange-600 dark:text-orange-400">Shopping</span> Cart
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} • Review your order
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Items Container */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Cart Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Order Summary
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Items in your cart
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/menu")}
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
                  >
                    + Add More Items
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {cart.items.map((item) => (
                  <div key={item._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Item Image */}
                      <div className="relative">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover shadow-lg"
                        />
                        {item.menuItem.spicy && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                            🌶️ Spicy
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {item.menuItem.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                              {item.menuItem.description || "Delicious dish prepared with care"}
                            </p>
                            {item.menuItem.category && (
                              <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 rounded-full text-xs">
                                {item.menuItem.category}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.menuItem._id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg text-red-500 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        {/* Quantity Controls & Price */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.menuItem._id, item.quantity - 1)}
                                disabled={updatingItems[item.menuItem._id]}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-lg disabled:opacity-50"
                              >
                                <Minus size={18} />
                              </button>
                              <span className="px-4 py-2 font-medium text-gray-900 dark:text-white min-w-[40px] text-center">
                                {updatingItems[item.menuItem._id] ? (
                                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                ) : (
                                  item.quantity
                                )}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.menuItem._id, item.quantity + 1)}
                                disabled={updatingItems[item.menuItem._id]}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-lg disabled:opacity-50"
                              >
                                <Plus size={18} />
                              </button>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              × ₹{item.menuItem.price}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                              ₹{item.menuItem.price * item.quantity}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ₹{item.menuItem.price} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Notes */}
              <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={18} className="text-orange-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Special Instructions</span>
                </div>
                <textarea
                  placeholder="Add cooking instructions, allergies, or special requests..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  rows="2"
                />
              </div>
            </div>

            {/* Security & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 border border-orange-500/10">
                <div className="flex items-center gap-3">
                  <Shield className="text-green-500" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Secure Payment</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 border border-orange-500/10">
                <div className="flex items-center gap-3">
                  <Truck className="text-blue-500" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Fast Delivery</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Est. {estimatedDelivery}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 border border-orange-500/10">
                <div className="flex items-center gap-3">
                  <Gift className="text-purple-500" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Earn Rewards</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{Math.floor(totalPrice)} points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Order Summary Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h3>

                {/* Pricing Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                    <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax & Charges</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{(totalPrice * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <button
                      onClick={applyCoupon}
                      className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-lg hover:from-orange-500/10 hover:to-amber-500/10 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Tag size={18} className="text-orange-500" />
                        <span className="text-orange-600 dark:text-orange-400 font-medium">
                          Apply Coupon Code
                        </span>
                      </div>
                      <Sparkles size={16} className="text-orange-500" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">Total Amount</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Inclusive of all taxes</div>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      ₹{(totalPrice * 1.05).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 mb-4 flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </button>

                {/* Payment Options */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">We accept</p>
                  <div className="flex gap-2">
                    {['visa', 'mastercard', 'paypal', 'upi'].map((method, idx) => (
                      <div key={idx} className="w-10 h-7 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        {method === 'upi' ? '💳' : method.toUpperCase().charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Estimated Delivery</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{estimatedDelivery} • 45-60 mins</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save for Later */}
              <div className="mt-6">
                <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-orange-500 dark:hover:border-orange-500 transition-colors">
                  <Heart size={18} className="text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Save Cart for Later</span>
                </button>
              </div>

              {/* Need Help */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Need help?{' '}
                  <button className="text-orange-600 dark:text-orange-400 hover:underline font-medium">
                    Contact Support
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;