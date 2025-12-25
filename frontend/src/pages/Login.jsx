import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LockIcon, 
  MailIcon, 
  EyeIcon, 
  EyeOffIcon,
  ChefHat,
  Sparkles,
  Shield,
  KeyRound,
  UserCheck,
  Coffee,
  Award,
  Smartphone,
  AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { loading, setLoading, axios, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  // state for input value
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  // handle change input value
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);
      
      const { data } = await axios.post("/api/auth/login", {
        ...formData,
        rememberMe
      });

      if (data.success) {
        setUser(data.user);
        
        // Show personalized welcome message
        toast.success(
          <div>
            <p className="font-bold">Welcome back, {data.user?.name?.split(" ")[0] || "Guest"}!</p>
            <p className="text-sm">You have {data.user?.points || 0} reward points</p>
          </div>,
          {
            icon: '👋',
            duration: 3000,
            style: {
              background: '#10B981',
              color: '#fff',
            }
          }
        );

        // Show benefits toast
        setTimeout(() => {
          toast(
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-amber-500" />
              <span>Check out today's special offers!</span>
            </div>,
            {
              icon: '🌟',
              duration: 2000
            }
          );
        }, 500);

        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(errorMessage, {
        icon: '❌',
        duration: 4000
      });
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handler
  const handleForgotPassword = () => {
    toast(
      <div className="text-center">
        <p className="font-bold mb-2">Reset Password</p>
        <p className="text-sm">Enter your email to receive a reset link</p>
        <div className="mt-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button className="mt-2 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
            Send Reset Link
          </button>
        </div>
      </div>,
      {
        duration: 6000,
        icon: '🔐'
      }
    );
  };

  const features = [
    { icon: <Award size={16} />, text: "Access reward points" },
    { icon: <Coffee size={16} />, text: "Personalized recommendations" },
    { icon: <Sparkles size={16} />, text: "Exclusive member deals" },
    { icon: <Shield size={16} />, text: "Secure booking history" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50/20 to-orange-50/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Side - Welcome & Features */}
          <div className="lg:w-1/2 max-w-lg">
            <div className="text-center lg:text-left mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-6">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to <span className="text-orange-600 dark:text-orange-400">The Naivedyam</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                Hotel & Dine Inn
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Sign in to access your personalized dining experience and manage your bookings.
              </p>
            </div>

            {/* Features List */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <KeyRound className="text-orange-500" /> Member Access
              </h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">5K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
              {/* Login Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Sign In
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Access your account
                </p>
              </div>

              {/* Social Login Quick Options */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      <MailIcon size={20} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={onChangeHandler}
                      required
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500'
                      } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      <LockIcon size={20} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={onChangeHandler}
                      required
                      className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                        errors.password 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500'
                      } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-colors`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Options Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-orange-600 dark:text-orange-400 hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <UserCheck size={20} />
                      Sign In
                    </div>
                  )}
                </button>
              </form>

              {/* Signup Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-orange-600 dark:text-orange-400 font-semibold hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              {/* Guest Login Option */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
                >
                  Continue as guest →
                </button>
              </div>
            </div>

            {/* Security & Mobile App */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 mb-2">
                  <Shield size={20} />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Secure login with SSL encryption
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 mb-2">
                  <Smartphone size={20} />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Available on mobile app
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;