import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { 
  ChevronRight, 
  Star, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Bed, 
  Utensils,
  Calendar,
  Phone,
  Sparkles,
  CheckCircle,
  Users
} from "lucide-react";

const Hero = () => {
  const { navigate } = useContext(AppContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState("restaurant"); // "restaurant" or "hotel"
  
  // Array of high-quality images for both restaurant and hotel
  const heroImages = {
    restaurant: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80&blend=000000&blend-mode=multiply&blend-alpha=40",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80&blend=000000&blend-mode=multiply&blend-alpha=40",
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1600&q=80&blend=000000&blend-mode=multiply&blend-alpha=40",
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=1600&q=80&blend=000000&blend-mode=multiply&blend-alpha=40"
    ],
    hotel: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80&blend=000000&blend-mode=multiply&blend-alpha=40",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80&blend=000000&blend-mode=multiply&blend-alpha=40",
      "https://images.unsplash.com/photo-1564501049418-3c27787d01e8?auto=format&fit=crop&w=1600&q=80&blend=000000&blend-mode=multiply&blend-alpha=40",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80&blend=000000&blend-mode=multiply&blend-alpha=40"
    ]
  };

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages[activeTab].length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  // Stats data for both
  const stats = {
    restaurant: [
      { label: "Years of Excellence", value: "15+", icon: Star },
      { label: "Happy Customers", value: "10K+", icon: Users },
      { label: "Menu Items", value: "50+", icon: Utensils },
      { label: "Awards Won", value: "12", icon: Sparkles }
    ],
    hotel: [
      { label: "Luxury Rooms", value: "45+", icon: Bed },
      { label: "Years Experience", value: "20+", icon: Star },
      { label: "Happy Guests", value: "15K+", icon: Users },
      { label: "Awards Won", value: "18", icon: Sparkles }
    ]
  };

  const restaurantContent = {
    title: "Savor Every Flavorful Moment",
    subtitle: "Where culinary artistry meets exceptional dining",
    description: "Experience handcrafted dishes made from locally-sourced ingredients, served in an atmosphere of elegance and warmth.",
    cta1: { text: "Explore Our Menu", path: "/menu", icon: Utensils },
    cta2: { text: "Book a Table", path: "/book-table", icon: Calendar }
  };

  const hotelContent = {
    title: "Experience Luxury & Comfort",
    subtitle: "Where every stay becomes a cherished memory",
    description: "Indulge in premium accommodations with breathtaking views, world-class amenities, and unparalleled hospitality.",
    cta1: { text: "View Rooms", path: "/rooms", icon: Bed },
    cta2: { text: "Book Now", path: "/book-room", icon: Calendar }
  };

  const content = activeTab === "restaurant" ? restaurantContent : hotelContent;

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Images with Slider Effect */}
      <div className="absolute inset-0">
        {heroImages[activeTab].map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl animate-pulse ${
            activeTab === "restaurant" ? "bg-orange-500/10" : "bg-blue-500/10"
          }`}></div>
          <div className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
            activeTab === "restaurant" ? "bg-yellow-500/10" : "bg-purple-500/10"
          }`}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-15">
        {/* Business Type Toggle */}
        <div className="flex justify-center ">
          <div className="inline-flex bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              onClick={() => setActiveTab("restaurant")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "restaurant" 
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Utensils size={18} />
              <span className="font-medium">Restaurant</span>
            </button>
            <button
              onClick={() => setActiveTab("hotel")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === "hotel" 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Bed size={18} />
              <span className="font-medium">Hotel</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white animate-fadeInUp">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border ${
              activeTab === "restaurant" 
                ? "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/30" 
                : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30"
            }`}>
              <Star className={`w-4 h-4 ${
                activeTab === "restaurant" ? "text-orange-400" : "text-blue-400"
              }`} fill="currentColor" />
              <span className="text-sm font-medium">
                Rated {activeTab === "restaurant" ? "4.8/5" : "4.9/5"} on Google
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
              <span className={`block bg-clip-text text-transparent animate-gradient ${
                activeTab === "restaurant" 
                  ? "bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400" 
                  : "bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
              }`}>
                {activeTab === "restaurant" ? "Savor Every" : "Experience Luxury"}
              </span>
              <span className="block mt-2">{activeTab === "restaurant" ? "Flavorful Moment" : "& Comfort"}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 mb-4 font-medium">
              {content.subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-5 max-w-xl leading-relaxed">
              {content.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-8">
              {activeTab === "restaurant" ? (
                <>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm">Farm-to-Table Ingredients</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm">Award-Winning Chef</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm">Wine Pairing Available</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm">24/7 Room Service</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm">Spa & Wellness Center</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm">Free Airport Shuttle</span>
                  </div>
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => navigate(content.cta1.path)}
                className={`group relative font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-2 ${
                  activeTab === "restaurant"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-orange-500/30"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-blue-500/30"
                }`}
              >
                <span>{content.cta1.text}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              <button
                onClick={() => navigate(content.cta2.path)}
                className="group bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>{content.cta2.text}</span>
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Info Bar */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span>{activeTab === "restaurant" ? "Open Today: 11AM - 11PM" : "24/7 Reception"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>123 Luxury Avenue, City Center</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Featured */}
          <div className="hidden lg:block">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats[activeTab].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      activeTab === "restaurant" 
                        ? "bg-orange-500/20" 
                        : "bg-blue-500/20"
                    }`}>
                      <stat.icon className={`w-5 h-5 ${
                        activeTab === "restaurant" ? "text-orange-400" : "text-blue-400"
                      }`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Featured Card */}
            <div className="relative group">
              <div className={`absolute -inset-1 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity ${
                activeTab === "restaurant" 
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500" 
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              }`}></div>
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {activeTab === "restaurant" ? "Chef's Special" : "Featured Suite"}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {activeTab === "restaurant" ? "Truffle Pasta with Gold Leaf" : "Presidential Suite with Ocean View"}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    activeTab === "restaurant" 
                      ? "bg-orange-500/20" 
                      : "bg-blue-500/20"
                  }`}>
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-white text-sm font-medium">4.9</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-4">
                  <span className={activeTab === "restaurant" ? "text-orange-400" : "text-blue-400"}>
                    {activeTab === "restaurant" ? "$24.99" : "$399/night"}
                  </span>
                  {activeTab === "hotel" && (
                    <span className="text-sm text-gray-400 ml-2">Breakfast included</span>
                  )}
                </div>
                <button
                  onClick={() => navigate(activeTab === "restaurant" ? "/menu" : "/rooms")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <span>{activeTab === "restaurant" ? "Order Now" : "Book Now"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => document.getElementById("next-section")?.scrollIntoView({ behavior: "smooth" })}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>

        {/* Image Slider Dots */}
        <div className="absolute bottom-8 right-8 hidden lg:flex gap-2">
          {heroImages[activeTab].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage 
                  ? `w-8 ${activeTab === "restaurant" ? "bg-orange-500" : "bg-blue-500"}` 
                  : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next Section Anchor */}
      <div id="next-section" className="absolute bottom-0" />
    </section>
  );
};

export default Hero;