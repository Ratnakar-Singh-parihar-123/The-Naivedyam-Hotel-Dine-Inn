import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

// Lazy loading for better performance
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const LoadingSpinner = lazy(() => import("./components/LoadingSpinner"));

// Public Pages
const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const HotelList = lazy(() => import("./pages/hotels/components/HotelList"));
const HotelDetail = lazy(() => import("./pages/hotels/components/HotelDetail"));
const Booking = lazy(() => import("./pages/hotels/components/Booking"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const BookTable = lazy(() => import("./pages/BookTable"));
const MyBookings = lazy(() => import("./pages/hotels/components/MyBookings"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Profile = lazy(() => import("./pages/hotels/components/Profile"));
const Reviews = lazy(() => import("./pages/hotels/components/Reviews"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const About = lazy(() => import("./pages/about/AboutPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AddCategory = lazy(() => import("./pages/admin/AddCategory"));
const AddHotel = lazy(() => import("./pages/admin/AddHotel"));
const Categories = lazy(() => import("./pages/admin/Categories"));
const Hotels = lazy(() => import("./pages/admin/Hotels"));
const Orders = lazy(() => import("./pages/admin/Orders"));
const Bookings = lazy(() => import("./pages/admin/Bookings"));
const Users = lazy(() => import("./pages/admin/Users"));
const ReviewsAdmin = lazy(() => import("./pages/admin/Reviews"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const Settings = lazy(() => import("./pages/admin/Settings"));

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, admin } = useContext(AppContext);
  
  if (requireAdmin && !admin) {
    return <Navigate to="/admin/login" />;
  }
  
  if (!requireAdmin && !user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  const location = useLocation();
  const { admin } = useContext(AppContext);
  
  const isAdminPath = location.pathname.startsWith("/admin");
  const isAuthPath = ["/login", "/signup", "/admin/login"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Suspense fallback={<LoadingSpinner />}>
        {!isAdminPath && !isAuthPath && <Navbar />}
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected User Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/book-table" element={
              <ProtectedRoute>
                <BookTable />
              </ProtectedRoute>
            } />
            <Route path="/booking/:id" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/my-bookings" element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } />
            <Route path="/my-orders" element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="add-hotel" element={<AddHotel />} />
              <Route path="categories" element={<Categories />} />
              <Route path="hotels" element={<Hotels />} />
              <Route path="orders" element={<Orders />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="users" element={<Users />} />
              <Route path="reviews" element={<ReviewsAdmin />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {!isAdminPath && !isAuthPath && <Footer />}
      </Suspense>
    </div>
  );
};

export default App;



/// new routes 
// import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
// import { Suspense, lazy } from "react";
// import { Toaster } from "react-hot-toast";
// import { useContext } from "react";
// import { AppContext } from "./context/AppContext";
// import LoadingSpinner from "./components/common/LoadingSpinner";

// // Lazy load components for better performance
// const Navbar = lazy(() => import("./components/layout/Navbar"));
// const Footer = lazy(() => import("./components/layout/Footer"));
// const Sidebar = lazy(() => import("./components/layout/Sidebar"));

// // Public Pages
// const Home = lazy(() => import("./pages/public/Home"));
// const Menu = lazy(() => import("./pages/public/Menu"));
// const Contact = lazy(() => import("./pages/public/Contact"));
// const About = lazy(() => import("./pages/public/About"));
// const Login = lazy(() => import("./pages/auth/Login"));
// const Signup = lazy(() => import("./pages/auth/Signup"));
// const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
// const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
// const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));

// // Hotel Pages
// const HotelList = lazy(() => import("./pages/hotels/HotelList"));
// const HotelDetail = lazy(() => import("./pages/hotels/HotelDetail"));
// const HotelSearch = lazy(() => import("./pages/hotels/HotelSearch"));
// const HotelBooking = lazy(() => import("./pages/hotels/HotelBooking"));
// const HotelAmenities = lazy(() => import("./pages/hotels/HotelAmenities"));
// const HotelReviews = lazy(() => import("./pages/hotels/HotelReviews"));

// // Restaurant Pages
// const RestaurantMenu = lazy(() => import("./pages/restaurant/Menu"));
// const RestaurantBooking = lazy(() => import("./pages/restaurant/Booking"));
// const RestaurantDetail = lazy(() => import("./pages/restaurant/Detail"));

// // User Pages
// const Cart = lazy(() => import("./pages/user/Cart"));
// const Checkout = lazy(() => import("./pages/user/Checkout"));
// const OrderSuccess = lazy(() => import("./pages/user/OrderSuccess"));
// const MyBookings = lazy(() => import("./pages/user/MyBookings"));
// const MyOrders = lazy(() => import("./pages/user/MyOrders"));
// const MyProfile = lazy(() => import("./pages/user/MyProfile"));
// const MyWishlist = lazy(() => import("./pages/user/MyWishlist"));
// const MyWallet = lazy(() => import("./pages/user/MyWallet"));
// const MyReviews = lazy(() => import("./pages/user/MyReviews"));

// // Admin Pages
// const AdminLayout = lazy(() => import("./pages/admin/layout/AdminLayout"));
// const AdminLogin = lazy(() => import("./pages/admin/auth/Login"));
// const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
// const AdminHotels = lazy(() => import("./pages/admin/hotels/List"));
// const AdminAddHotel = lazy(() => import("./pages/admin/hotels/Add"));
// const AdminEditHotel = lazy(() => import("./pages/admin/hotels/Edit"));
// const AdminHotelCategories = lazy(() => import("./pages/admin/hotels/Categories"));
// const AdminRooms = lazy(() => import("./pages/admin/rooms/List"));
// const AdminAddRoom = lazy(() => import("./pages/admin/rooms/Add"));
// const AdminBookings = lazy(() => import("./pages/admin/bookings/List"));
// const AdminBookingDetail = lazy(() => import("./pages/admin/bookings/Detail"));
// const AdminUsers = lazy(() => import("./pages/admin/users/List"));
// const AdminUserDetail = lazy(() => import("./pages/admin/users/Detail"));
// const AdminOrders = lazy(() => import("./pages/admin/orders/List"));
// const AdminOrderDetail = lazy(() => import("./pages/admin/orders/Detail"));
// const AdminReviews = lazy(() => import("./pages/admin/reviews/List"));
// const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
// const AdminSettings = lazy(() => import("./pages/admin/Settings"));
// const AdminReports = lazy(() => import("./pages/admin/Reports"));

// // Shared Components
// const NotFound = lazy(() => import("./pages/error/NotFound"));
// const Maintenance = lazy(() => import("./pages/error/Maintenance"));
// const ServerError = lazy(() => import("./pages/error/ServerError"));
// const Unauthorized = lazy(() => import("./pages/error/Unauthorized"));

// // Protected Route Components
// const ProtectedRoute = ({ children, requireAdmin = false, requireAuth = true }) => {
//   const { user, admin, isLoading } = useContext(AppContext);
  
//   if (isLoading) {
//     return <LoadingSpinner fullScreen />;
//   }
  
//   if (requireAdmin) {
//     return admin ? children : <Navigate to="/admin/login" />;
//   }
  
//   if (requireAuth && !user) {
//     return <Navigate to="/login" state={{ from: location.pathname }} />;
//   }
  
//   return children;
// };

// const GuestRoute = ({ children }) => {
//   const { user, isLoading } = useContext(AppContext);
  
//   if (isLoading) {
//     return <LoadingSpinner fullScreen />;
//   }
  
//   return !user ? children : <Navigate to="/" />;
// };

// // Layout Components
// const PublicLayout = () => (
//   <div className="flex flex-col min-h-screen">
//     <Navbar />
//     <main className="flex-grow">
//       <Outlet />
//     </main>
//     <Footer />
//   </div>
// );

// const UserLayout = () => {
//   const { user } = useContext(AppContext);
  
//   if (!user) return <Navigate to="/login" />;
  
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main className="flex-1 p-4 md:p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// const App = () => {
//   const location = useLocation();
//   const { admin } = useContext(AppContext);
  
//   const isAdminPath = location.pathname.startsWith("/admin");
//   const isAuthPath = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-email"].includes(location.pathname);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#1f2937',
//             color: '#fff',
//             borderRadius: '12px',
//             border: '1px solid #374151',
//             padding: '16px',
//           },
//           success: {
//             duration: 3000,
//             iconTheme: {
//               primary: '#10B981',
//               secondary: '#fff',
//             },
//             style: {
//               background: '#065f46',
//               border: '1px solid #10B981',
//             },
//           },
//           error: {
//             duration: 4000,
//             iconTheme: {
//               primary: '#EF4444',
//               secondary: '#fff',
//             },
//             style: {
//               background: '#7f1d1d',
//               border: '1px solid #EF4444',
//             },
//           },
//           loading: {
//             style: {
//               background: '#1f2937',
//               border: '1px solid #4b5563',
//             },
//           },
//         }}
//       />
      
//       <Suspense fallback={<LoadingSpinner fullScreen />}>
//         <Routes>
//           {/* Public Routes with Navbar & Footer */}
//           <Route element={<PublicLayout />}>
//             {/* Home & Main Pages */}
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
            
//             {/* Hotel Routes */}
//             <Route path="/hotels" element={<HotelList />} />
//             <Route path="/hotels/search" element={<HotelSearch />} />
//             <Route path="/hotel/:id" element={<HotelDetail />} />
//             <Route path="/hotel/:id/amenities" element={<HotelAmenities />} />
//             <Route path="/hotel/:id/reviews" element={<HotelReviews />} />
            
//             {/* Restaurant Routes */}
//             <Route path="/restaurants" element={<RestaurantDetail />} />
//             <Route path="/restaurants/:id" element={<RestaurantDetail />} />
//             <Route path="/restaurants/:id/menu" element={<RestaurantMenu />} />
//             <Route path="/restaurants/:id/book" element={<RestaurantBooking />} />
            
//             {/* Auth Routes (for guests only) */}
//             <Route path="/login" element={
//               <GuestRoute>
//                 <Login />
//               </GuestRoute>
//             } />
//             <Route path="/signup" element={
//               <GuestRoute>
//                 <Signup />
//               </GuestRoute>
//             } />
//             <Route path="/forgot-password" element={
//               <GuestRoute>
//                 <ForgotPassword />
//               </GuestRoute>
//             } />
//             <Route path="/reset-password/:token" element={
//               <GuestRoute>
//                 <ResetPassword />
//               </GuestRoute>
//             } />
//             <Route path="/verify-email/:token" element={
//               <GuestRoute>
//                 <VerifyEmail />
//               </GuestRoute>
//             } />
            
//             {/* Error Pages */}
//             <Route path="/maintenance" element={<Maintenance />} />
//             <Route path="/server-error" element={<ServerError />} />
//             <Route path="/unauthorized" element={<Unauthorized />} />
//           </Route>
          
//           {/* Protected User Routes with Sidebar */}
//           <Route element={
//             <ProtectedRoute>
//               <UserLayout />
//             </ProtectedRoute>
//           }>
//             {/* Booking & Order Management */}
//             <Route path="/book-now" element={<HotelSearch />} />
//             <Route path="/hotel/:id/book" element={<HotelBooking />} />
//             <Route path="/restaurant/:id/book-table" element={<RestaurantBooking />} />
//             <Route path="/booking/confirm" element={<OrderSuccess />} />
            
//             {/* User Dashboard Routes */}
//             <Route path="/my-bookings" element={<MyBookings />} />
//             <Route path="/my-orders" element={<MyOrders />} />
//             <Route path="/my-profile" element={<MyProfile />} />
//             <Route path="/my-wishlist" element={<MyWishlist />} />
//             <Route path="/my-wallet" element={<MyWallet />} />
//             <Route path="/my-reviews" element={<MyReviews />} />
            
//             {/* Shopping Cart */}
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/order-success/:id" element={<OrderSuccess />} />
//           </Route>
          
//           {/* Admin Routes */}
//           <Route path="/admin/login" element={
//             <GuestRoute>
//               <AdminLogin />
//             </GuestRoute>
//           } />
          
//           <Route path="/admin" element={
//             <ProtectedRoute requireAdmin>
//               <AdminLayout />
//             </ProtectedRoute>
//           }>
//             <Route index element={<Navigate to="dashboard" />} />
//             <Route path="dashboard" element={<AdminDashboard />} />
            
//             {/* Hotel Management */}
//             <Route path="hotels">
//               <Route index element={<AdminHotels />} />
//               <Route path="add" element={<AdminAddHotel />} />
//               <Route path="edit/:id" element={<AdminEditHotel />} />
//               <Route path="categories" element={<AdminHotelCategories />} />
//             </Route>
            
//             {/* Room Management */}
//             <Route path="rooms">
//               <Route index element={<AdminRooms />} />
//               <Route path="add" element={<AdminAddRoom />} />
//             </Route>
            
//             {/* Booking Management */}
//             <Route path="bookings">
//               <Route index element={<AdminBookings />} />
//               <Route path=":id" element={<AdminBookingDetail />} />
//             </Route>
            
//             {/* Order Management */}
//             <Route path="orders">
//               <Route index element={<AdminOrders />} />
//               <Route path=":id" element={<AdminOrderDetail />} />
//             </Route>
            
//             {/* User Management */}
//             <Route path="users">
//               <Route index element={<AdminUsers />} />
//               <Route path=":id" element={<AdminUserDetail />} />
//             </Route>
            
//             {/* Reviews Management */}
//             <Route path="reviews" element={<AdminReviews />} />
            
//             {/* Analytics & Reports */}
//             <Route path="analytics" element={<AdminAnalytics />} />
//             <Route path="reports" element={<AdminReports />} />
            
//             {/* Settings */}
//             <Route path="settings" element={<AdminSettings />} />
//           </Route>
          
//           {/* 404 - Catch All */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Suspense>
//     </div>
//   );
// };

// export default App;