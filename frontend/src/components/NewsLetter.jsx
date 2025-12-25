import { useState } from "react";
import { Send, Mail, Sparkles, CheckCircle, Gift } from "lucide-react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here
      // const response = await axios.post('/api/newsletter', { email });
      
      setIsSubmitted(true);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Benefits list
  const benefits = [
    { icon: "🎁", text: "Exclusive offers & discounts" },
    { icon: "🍽️", text: "New menu announcements" },
    { icon: "⭐", text: "VIP event invitations" },
    { icon: "👨‍🍳", text: "Chef's special recipes" },
  ];

  return (
    <section className="relative overflow-hidden py-24 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left animate-fadeInLeft">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-400">
                Stay Updated
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Never Miss
              </span>
              <br />
              <span className="text-white">A Delicious Update</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
              Join our culinary community and be the first to know about exclusive offers, 
              new menu launches, special events, and chef secrets delivered straight to your inbox.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">{benefit.icon}</span>
                  </div>
                  <span className="text-slate-200 font-medium group-hover:text-white transition-colors">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-slate-400">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-slate-400">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">Zero</div>
                <div className="text-sm text-slate-400">Spam</div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="animate-fadeInRight">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
              {/* Success State */}
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Welcome to the Family! 🎉
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Check your inbox for a special welcome gift from our chef!
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white font-medium px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                  >
                    Subscribe Another Email
                  </button>
                </div>
              ) : (
                <>
                  {/* Form Header */}
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                      <Mail className="w-10 h-10 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Join Our Newsletter
                    </h3>
                    <p className="text-slate-300">
                      Get weekly culinary inspiration
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-2 border-slate-700/50 focus:border-orange-500 text-white placeholder-slate-500 rounded-2xl px-6 py-5 text-lg outline-none transition-all duration-300 focus:shadow-2xl focus:shadow-orange-500/20"
                        disabled={isLoading}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-pink-500/0 rounded-2xl group-hover:from-orange-500/5 group-hover:to-pink-500/5 transition-all duration-300 pointer-events-none"></div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-5 px-6 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe Now</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                      <div className="absolute inset-0 rounded-2xl bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </form>

                  {/* Privacy Note */}
                  <p className="text-center text-slate-400 text-sm mt-6">
                    We respect your privacy. Unsubscribe at any time.
                  </p>

                  {/* Special Offer */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl border border-orange-500/20">
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5 text-orange-400" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          First-time subscribers get 15% off!
                        </p>
                        <p className="text-xs text-slate-300">
                          Discount code sent immediately after confirmation
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Testimonials */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { name: "Sarah", text: "Best food updates!" },
                { name: "Mike", text: "Love the recipes" },
                { name: "Emma", text: "Exclusive deals" },
                { name: "John", text: "Always fresh content" },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-white">
                      {testimonial.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 animate-float">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
      </div>
      <div className="absolute bottom-20 left-10 animate-float delay-1000">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
      </div>
      <div className="absolute top-1/3 left-1/4 animate-float delay-500">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
      </div>
    </section>
  );
};

export default Newsletter;