import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  Home, 
  CreditCard, 
  Calendar, 
  FileText, 
  ChevronRight,
  RefreshCw,
  ShoppingBag,
  AlertCircle,
  Star,
  Download,
  MessageCircle,
  MapPin,
  Receipt
} from "lucide-react";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { axios, user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'confirmed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'preparing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'on-the-way': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    'delivered': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  };

  const statusIcons = {
    'pending': <Clock className="w-4 h-4" />,
    'confirmed': <CheckCircle className="w-4 h-4" />,
    'preparing': <Package className="w-4 h-4" />,
    'on-the-way': <Truck className="w-4 h-4" />,
    'delivered': <CheckCircle className="w-4 h-4" />,
    'cancelled': <AlertCircle className="w-4 h-4" />
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Placed' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'on-the-way', label: 'On the Way' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const filters = [
    { key: 'all', label: 'All Orders', count: orders.length },
    { key: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { key: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'on-the-way', label: 'On the Way', count: orders.filter(o => o.status === 'on-the-way').length },
    { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { key: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const handleTrackOrder = (order) => {
    toast.success(`Tracking order #${order.orderId}`, {
      icon: '🚚',
      duration: 2000
    });
  };

  const handleReorder = (order) => {
    toast.success(
      <div>
        <p className="font-bold">Reorder Added!</p>
        <p className="text-sm">Items from order #{order.orderId} added to cart</p>
      </div>,
      {
        icon: '🔄',
        duration: 3000
      }
    );
  };

  const handleDownloadInvoice = (order) => {
    toast.success("Invoice downloaded successfully", {
      icon: '📄',
      duration: 2000
    });
  };

  const handleRateOrder = (order) => {
    toast(
      <div className="text-center">
        <p className="font-bold mb-2">Rate Your Order</p>
        <div className="flex justify-center gap-1 mb-3">
          {[1,2,3,4,5].map(star => (
            <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <textarea
          placeholder="Add a comment (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
          rows="2"
        />
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
          Submit Review
        </button>
      </div>,
      {
        duration: 6000,
        icon: '⭐'
      }
    );
  };

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const getStatusPercentage = (status) => {
    const stepIndex = statusSteps.findIndex(step => step.key === status);
    return stepIndex >= 0 ? ((stepIndex + 1) / statusSteps.length) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/5 to-amber-50/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-6">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-orange-600 dark:text-orange-400">Orders</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track, manage, and review all your past and current orders in one place
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{orders.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Delivered</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {orders.filter(o => ['pending', 'confirmed', 'preparing', 'on-the-way'].includes(o.status)).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              ₹{orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeFilter === filter.key ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
            <button
              onClick={fetchMyOrders}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No orders found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              {activeFilter === 'all'
                ? "You haven't placed any orders yet. Start your culinary journey with us!"
                : `You don't have any ${activeFilter} orders at the moment.`}
            </p>
            {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
              >
                View All Orders
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Order #{order.orderId || order._id.slice(-8).toUpperCase()}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColors[order.status]}`}>
                          {statusIcons[order.status]}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        ₹{order.totalAmount.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Progress */}
                {!['cancelled', 'delivered'].includes(order.status) && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50">
                    <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Order Progress</span>
                      <span>{Math.round(getStatusPercentage(order.status))}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                        style={{ width: `${getStatusPercentage(order.status)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      {statusSteps.map((step, index) => {
                        const isActive = statusSteps.findIndex(s => s.key === order.status) >= index;
                        const isCurrent = order.status === step.key;
                        
                        return (
                          <div key={step.key} className="text-center w-20">
                            <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs mb-1 ${
                              isActive
                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                            }`}>
                              {index + 1}
                            </div>
                            <div className={`text-xs ${isCurrent ? 'font-bold text-orange-600 dark:text-orange-400' : 'text-gray-500'}`}>
                              {step.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order Details */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Items */}
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <ShoppingBag size={18} />
                        Order Items
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.menuItem?.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae4b?w=100"}
                                alt={item.menuItem?.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{item.menuItem?.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  Qty: {item.quantity} × ₹{item.price}
                                </div>
                              </div>
                            </div>
                            <div className="font-bold text-gray-900 dark:text-white">
                              ₹{(item.quantity * item.price).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Information */}
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <FileText size={18} />
                        Order Details
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="text-gray-500 mt-0.5" size={16} />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Delivery Address</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm">{order.address}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-gray-500" size={16} />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Payment Method</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm">
                              {order.paymentMethod} • {order.paymentStatus || 'Paid'}
                            </div>
                          </div>
                        </div>
                        {order.deliveryPerson && (
                          <div className="flex items-center gap-3">
                            <Truck className="text-gray-500" size={16} />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Delivery Partner</div>
                              <div className="text-gray-600 dark:text-gray-400 text-sm">{order.deliveryPerson}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex flex-wrap gap-3">
                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                      <button
                        onClick={() => handleTrackOrder(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium"
                      >
                        <Truck size={16} />
                        Track Order
                      </button>
                    )}
                    
                    {order.status === 'delivered' && (
                      <>
                        <button
                          onClick={() => handleRateOrder(order)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-lg font-medium"
                        >
                          <Star size={16} />
                          Rate Order
                        </button>
                        <button
                          onClick={() => handleReorder(order)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium"
                        >
                          <RefreshCw size={16} />
                          Reorder
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => handleDownloadInvoice(order)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:from-gray-900 hover:to-black dark:hover:from-gray-600 dark:hover:to-gray-700 text-white rounded-lg font-medium"
                    >
                      <Download size={16} />
                      Invoice
                    </button>
                    
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium ml-auto"
                    >
                      <MessageCircle size={16} />
                      Get Help
                      <ChevronRight size={16} className={`transition-transform ${selectedOrder === order._id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {/* Help Section */}
                  {selectedOrder === order._id && (
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Need help with this order? Contact our support team.
                      </p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600">
                          Call Support
                        </button>
                        <button className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                          Live Chat
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;