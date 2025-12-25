import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  LockIcon,
  MailIcon,
  User2Icon,
  EyeIcon,
  EyeOffIcon,
  ChefHat,
  Sparkles,
  Shield,
  CheckCircle,
  Award
} from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { ChevronRight } from "lucide-react";


const Signup = () => {
  const { navigate, axios, loading, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field
    if (name === "password") {
      validatePassword(value);
      checkPasswordMatch(value, formData.confirmPassword);
    } else if (name === "confirmPassword") {
      checkPasswordMatch(formData.password, value);
    } else if (name === "email") {
      validateEmail(value);
    } else if (name === "name") {
      validateName(value);
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (confirmPassword && password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
    } else if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
    }
  };

  const validateName = (name) => {
    if (name.length < 2) {
      setErrors(prev => ({ ...prev, name: "Name must be at least 2 characters" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (data?.success) {
        toast.success(data.message || "Registered successfully!", {
          icon: '🎉',
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#fff',
          }
        });

        // Show welcome toast with benefits
        setTimeout(() => {
          toast.success(
            <div>
              <p className="font-bold">Welcome to The Naivedyam!</p>
              <p className="text-sm">Get 15% off your first order + 250 bonus points</p>
            </div>,
            {
              duration: 4000,
              icon: '🌟'
            }
          );
        }, 500);

        navigate("/login");
      } else {
        toast.error(data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    if (passwordStrength === 4) return "bg-green-500";
    return "bg-gray-200";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
    return "";
  };

  const benefits = [
    { icon: <Award size={16} />, text: "Earn reward points on every order" },
    { icon: <ChefHat size={16} />, text: "Exclusive access to premium recipes" },
    { icon: <Sparkles size={16} />, text: "15% off your first booking" },
    { icon: <Shield size={16} />, text: "Priority customer support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-amber-50/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Side - Benefits & Info */}
          <div className="lg:w-1/2 max-w-lg">
            <div className="text-center lg:text-left mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 mb-6">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Join <span className="text-orange-600 dark:text-orange-400">The Naivedyam</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Hotel & Dine Inn
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Create your account to unlock exclusive benefits and start your culinary journey with us.
              </p>
            </div>

            {/* Benefits List */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-orange-500" /> Member Benefits
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      {benefit.icon}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-8 bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-6 border border-orange-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                  RP
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Rahul Patel</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gold Member since 2020</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "The Naivedyam has transformed my dining experience. The rewards program and exclusive access are amazing!"
              </p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:w-1/2 max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Create Account
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Join our family of food lovers
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      <User2Icon size={20} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={onChangeHandler}
                      required
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500'
                        } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>
                  )}
                </div>

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
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500'
                        } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
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
                      className={`w-full pl-12 pr-12 py-3 rounded-xl border ${errors.password
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

                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Password strength:</span>
                        <span className={`text-xs font-medium ${passwordStrength === 1 ? 'text-red-500' :
                            passwordStrength === 2 ? 'text-yellow-500' :
                              passwordStrength === 3 ? 'text-blue-500' :
                                passwordStrength === 4 ? 'text-green-500' : 'text-gray-500'
                          }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${passwordStrength * 25}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      <LockIcon size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={onChangeHandler}
                      required
                      className={`w-full pl-12 pr-12 py-3 rounded-xl border ${errors.confirmPassword
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500'
                        } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-colors`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 ml-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <Link to="/terms" className="text-orange-600 dark:text-orange-400 hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-orange-600 dark:text-orange-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
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
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle size={20} />
                      Create Free Account
                    </div>
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-orange-600 dark:text-orange-400 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Sign In
                      <ChevronRight size={16} />
                    </Link>
                  </p>
                </div>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">Or continue with</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
              </div>

              {/* Social Signup Options */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Facebook</span>
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                <Shield size={12} />
                Your data is secured with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;