import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { 
  CreditCard, 
  Home, 
  Wallet, 
  Shield, 
  Truck, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Lock, 
  Gift, 
  Sparkles,
  ChevronRight,
  AlertCircle,
  Smartphone,
  Building,
  User,
  Phone,
  Mail,
  Calendar,
  Receipt
} from "lucide-react";

const Checkout = () => {
  const { totalPrice, axios, navigate, cart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pay_at_hotel");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [saveAddress, setSaveAddress] = useState(true);

  // Sample saved addresses
  const savedAddresses = [
    {
      id: 1,
      type: "home",
      title: "Home",
      address: "123 Luxury Avenue, New York, NY 10001",
      phone: "+91 9399741051",
      isDefault: true
    },
    {
      id: 2,
      type: "work",
      title: "Work",
      address: "456 Business Street, Manhattan, NY 10017",
      phone: "+1 (555) 123-4567",
      isDefault: false
    },
    {
      id: 3,
      type: "hotel",
      title: "The Naivedyam Hotel",
      address: "789 Resort Lane, Downtown, NY 10002",
      phone: "+1 (555) 987-6543",
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: "pay_at_hotel",
      name: "Pay at Hotel/Restaurant",
      icon: <Building size={20} />,
      description: "Pay when you collect or upon delivery",
      badge: "Recommended"
    },
    {
      id: "online_payment",
      name: "Online Payment",
      icon: <CreditCard size={20} />,
      description: "Pay now using cards, UPI, or wallets",
      badge: "Secure"
    },
    {
      id: "wallet",
      name: "Naivedyam Wallet",
      icon: <Wallet size={20} />,
      description: "Use your wallet balance",
      badge: "Balance: ₹1,250"
    },
    {
      id: "upi",
      name: "UPI Payment",
      icon: <Smartphone size={20} />,
      description: "Google Pay, PhonePe, Paytm",
      badge: "Instant"
    }
  ];

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      time: "45-60 minutes",
      price: "Free",
      icon: <Truck size={20} />
    },
    {
      id: "express",
      name: "Express Delivery",
      time: "25-35 minutes",
      price: "₹49",
      icon: <Sparkles size={20} />
    },
    {
      id: "scheduled",
      name: "Scheduled Delivery",
      time: "Choose your time",
      price: "Free",
      icon: <Calendar size={20} />
    }
  ];

  const deliveryTips = [
    { icon: "🏨", text: "Hotel guests get 15% off room service" },
    { icon: "🎁", text: "Add gift message for ₹99" },
    { icon: "🎂", text: "Free dessert on orders above ₹999" },
    { icon: "⭐", text: "Earn 2x reward points this week" }
  ];

  useEffect(() => {
    if (savedAddresses.length > 0 && !selectedAddress) {
      const defaultAddress = savedAddresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
        setAddress(defaultAddress.address);
      }
    }
  }, []);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const validCoupons = ["NAIVEDYAM15", "WELCOME20", "HOTEL10"];
    if (validCoupons.includes(couponCode.toUpperCase())) {
      const discount = couponCode.toUpperCase() === "NAIVEDYAM15" ? 15 : 
                     couponCode.toUpperCase() === "WELCOME20" ? 20 : 10;
      
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: discount,
        amount: (totalPrice * discount / 100).toFixed(2)
      });
      
      toast.success(
        <div className="flex items-center gap-2">
          <Gift size={18} />
          <span>{discount}% discount applied!</span>
        </div>,
        {
          icon: '🎉',
          duration: 3000
        }
      );
    } else {
      toast.error("Invalid coupon code", { icon: '❌' });
    }
  };

  const calculateTotals = () => {
    const subtotal = totalPrice;
    const deliveryCharge = deliveryOption === "express" ? 49 : 0;
    const discount = appliedCoupon ? parseFloat(appliedCoupon.amount) : 0;
    const tax = (subtotal * 0.05); // 5% tax
    const total = subtotal + deliveryCharge - discount + tax;

    return {
      subtotal: subtotal.toFixed(2),
      deliveryCharge: deliveryCharge.toFixed(2),
      discount: discount.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const totals = calculateTotals();

  const handleCheckout = async () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address", { icon: '📍' });
      return;
    }

    if (!cart?.items?.length) {
      toast.error("Your cart is empty", { icon: '🛒' });
      navigate("/menu");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        address,
        paymentMethod,
        deliveryOption,
        specialInstructions,
        couponCode: appliedCoupon?.code,
        saveAddress
      };

      const { data } = await axios.post("/api/order/place", orderData);
      
      if (data.success) {
        toast.success(
          <div className="text-center">
            <p className="font-bold text-lg mb-2">Order Confirmed! 🎉</p>
            <p className="text-sm">Order #{data.order.orderId}</p>
            <p className="text-sm">Estimated delivery: 45-60 minutes</p>
          </div>,
          {
            duration: 5000,
            icon: '✅'
          }
        );

        // Clear cart and redirect
        setTimeout(() => {
          navigate("/my-orders");
        }, 2000);
      } else {
        toast.error(data.message || "Order failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Something went wrong! Please try again.",
        { icon: '❌' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Secure <span className="text-orange-600 dark:text-orange-400">Checkout</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete your order in just a few steps
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Address Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MapPin className="text-orange-500" />
                Delivery Details
              </h2>

              {/* Saved Addresses */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Select Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {savedAddresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddress(addr.id);
                        setAddress(addr.address);
                      }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddress === addr.id
                          ? "border-orange-500 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {addr.type === "home" ? <Home size={18} className="text-blue-500" /> :
                         addr.type === "work" ? <Building size={18} className="text-green-500" /> :
                         <Building size={18} className="text-orange-500" />}
                        <span className="font-medium text-gray-900 dark:text-white">{addr.title}</span>
                        {addr.isDefault && (
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Default</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{addr.address}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Address */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Or Enter New Address</h3>
                <div className="space-y-4">
                  <textarea
                    rows={4}
                    value={address}
                    placeholder="Enter your complete delivery address with landmarks..."
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-none"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <input
                        type="text"
                        placeholder="Recipient Name"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveAddress"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Save this address for future orders
                </label>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Truck className="text-orange-500" />
                Delivery Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deliveryOptions.map(option => (
                  <div
                    key={option.id}
                    onClick={() => setDeliveryOption(option.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      deliveryOption === option.id
                        ? "border-orange-500 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {option.icon}
                      <span className="font-medium text-gray-900 dark:text-white">{option.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={14} className="inline mr-1" />
                        {option.time}
                      </div>
                      <div className={`font-medium ${
                        option.price === "Free" ? "text-green-600" : "text-gray-900 dark:text-white"
                      }`}>
                        {option.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Instructions */}
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertCircle size={18} className="text-orange-500" />
                  Special Instructions
                </h3>
                <textarea
                  rows={3}
                  value={specialInstructions}
                  placeholder="Add cooking instructions, allergies, or delivery notes..."
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CreditCard className="text-orange-500" />
                Payment Method
              </h2>
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "border-orange-500 bg-gradient-to-r from-orange-500/5 to-amber-500/5"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 mt-0.5 ${
                        paymentMethod === method.id
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}></div>
                      <div>
                        <div className="flex items-center gap-2">
                          {method.icon}
                          <span className="font-medium text-gray-900 dark:text-white">{method.name}</span>
                          <span className="text-xs bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                            {method.badge}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{method.description}</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>

              {/* Security Assurance */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-500/10">
                <div className="flex items-center gap-3">
                  <Shield className="text-green-500" size={24} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Secure Payment</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your payment information is encrypted with 256-bit SSL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Order Summary Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Receipt className="text-orange-500" />
                  Order Summary
                </h2>

                {/* Items Preview */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    {cart?.items?.length || 0} {cart?.items?.length === 1 ? 'Item' : 'Items'}
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {cart?.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.menuItem?.image}
                            alt={item.menuItem?.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">
                              {item.menuItem?.name}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          ₹{(item.menuItem?.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                    <span className={`font-medium ${
                      totals.deliveryCharge === "0.00" ? "text-green-600" : "text-gray-900 dark:text-white"
                    }`}>
                      {totals.deliveryCharge === "0.00" ? "Free" : `₹${totals.deliveryCharge}`}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Discount ({appliedCoupon.code})
                      </span>
                      <span className="font-medium text-green-600">-₹{totals.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax & Charges</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{totals.tax}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 font-medium rounded-lg hover:from-orange-500/20 hover:to-amber-500/20 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Try: NAIVEDYAM15, WELCOME20, HOTEL10
                  </p>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">Total Amount</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Inclusive of all taxes</div>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      ₹{totals.total}
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={loading || !cart?.items?.length}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Order...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Lock size={20} />
                      {paymentMethod === "pay_at_hotel" ? "Confirm Order" : "Pay Now"}
                    </div>
                  )}
                </button>

                {/* Security & Guarantee */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <Shield size={12} className="inline mr-1" />
                    100% Secure Payment • 30-min Refund Policy
                  </p>
                </div>
              </div>

              {/* Delivery Tips */}
              <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-6 border border-orange-500/10">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="text-orange-500" />
                  Quick Tips
                </h3>
                <div className="space-y-3">
                  {deliveryTips.map((tip, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-xl">{tip.icon}</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{tip.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Estimated delivery: 45-60 minutes
                    </span>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="mt-6 text-center">
                <button className="text-sm text-orange-600 dark:text-orange-400 hover:underline font-medium">
                  Need help? Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;