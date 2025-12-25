import { useContext, useEffect, useState, useRef } from "react";
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
  Users,
  ChefHat,
  Award,
  Heart,
  ArrowRight,
  Shield,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Wine,
  Music,
  Tv,
  Bath,
  Wind,
  Droplets,
  Zap
} from "lucide-react";

const Hero = () => {
  const { navigate } = useContext(AppContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState("restaurant");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  // High-quality optimized images with fallbacks
  const heroImages = {
    restaurant: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=1920&q=80"
    ],
    hotel: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1564501049418-3c27787d01e8?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80"
    ]
  };

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    heroRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => heroRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate background images
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentImage(prev => (prev + 1) % heroImages[activeTab].length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeTab, isAutoPlaying]);

  // Stats with animations
  const stats = {
    restaurant: [
      { label: "Years Excellence", value: "15+", icon: Award, color: "from-orange-500 to-yellow-500", delay: "100" },
      { label: "Happy Customers", value: "10K+", icon: Users, color: "from-pink-500 to-rose-500", delay: "200" },
      { label: "Menu Items", value: "50+", icon: Utensils, color: "from-green-500 to-emerald-500", delay: "300" },
      { label: "Awards Won", value: "12", icon: TrophyIcon, color: "from-purple-500 to-violet-500", delay: "400" }
    ],
    hotel: [
      { label: "Luxury Rooms", value: "45+", icon: Bed, color: "from-blue-500 to-cyan-500", delay: "100" },
      { label: "Years Experience", value: "20+", icon: Award, color: "from-indigo-500 to-blue-500", delay: "200" },
      { label: "Happy Guests", value: "15K+", icon: Users, color: "from-teal-500 to-emerald-500", delay: "300" },
      { label: "Awards Won", value: "18", icon: TrophyIcon, color: "from-purple-500 to-pink-500", delay: "400" }
    ]
  };

  // Content for both modes
  const content = {
    restaurant: {
      title: "Savor Every Flavorful Moment",
      subtitle: "Where culinary artistry meets exceptional dining experience",
      description: "Experience handcrafted dishes made from locally-sourced ingredients, served in an atmosphere of elegance and warmth by our award-winning chefs.",
      cta1: { text: "Explore Our Menu", path: "/menu", icon: Utensils, variant: "primary" },
      cta2: { text: "Book a Table", path: "/book-table", icon: Calendar, variant: "secondary" },
      features: [
        { icon: ChefHat, text: "Award-Winning Chef", subtext: "Michelin Star Chef" },
        { icon: Wine, text: "Fine Wine Selection", subtext: "500+ Labels" },
        { icon: Heart, text: "Organic Ingredients", subtext: "Farm-to-Table" },
        { icon: Shield, text: "Hygiene Certified", subtext: "5-Star Rating" }
      ]
    },
    hotel: {
      title: "Experience Ultimate Luxury",
      subtitle: "Where every stay becomes a cherished memory",
      description: "Indulge in premium accommodations with breathtaking views, world-class amenities, and unparalleled hospitality in the heart of the city.",
      cta1: { text: "View Rooms & Suites", path: "/rooms", icon: Bed, variant: "primary" },
      cta2: { text: "Book Your Stay", path: "/book-room", icon: Calendar, variant: "secondary" },
      features: [
        { icon: Wifi, text: "High-Speed WiFi", subtext: "Free Unlimited" },
        { icon: Car, text: "Valet Parking", subtext: "24/7 Service" },
        { icon: Coffee, text: "Premium Breakfast", subtext: "Included Free" },
        { icon: Dumbbell, text: "Fitness Center", subtext: "State-of-Art" }
      ]
    }
  };

  const currentContent = content[activeTab];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ height: 'calc(150vh - 70px)' }}
    >
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages[activeTab].map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover transition-all duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`
            }}
          />
        ))}
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                activeTab === "restaurant" ? "bg-orange-500/30" : "bg-blue-500/30"
              } animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Dynamic Light Effects */}
        <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          activeTab === "restaurant" ? "bg-orange-500/20" : "bg-blue-500/20"
        }`}></div>
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          activeTab === "restaurant" ? "bg-yellow-500/10" : "bg-purple-500/10"
        }`}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-white animate-fadeInUp">
            {/* Business Type Toggle - Enhanced */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="inline-flex bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-full p-1 border border-white/20 shadow-2xl">
                <button
                  onClick={() => {
                    setActiveTab("restaurant");
                    setCurrentImage(0);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    activeTab === "restaurant" 
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Utensils size={18} />
                  <span className="font-semibold text-sm sm:text-base">Restaurant</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("hotel");
                    setCurrentImage(0);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    activeTab === "hotel" 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Bed size={18} />
                  <span className="font-semibold text-sm sm:text-base">Hotel</span>
                </button>
              </div>
              
              {/* Rating Badge */}
              <div className="flex items-center gap-2 backdrop-blur-xl bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="font-bold">{activeTab === "restaurant" ? "4.8" : "4.9"}</span>
                <span className="text-sm opacity-90">/5.0</span>
                <span className="text-xs opacity-75 ml-1">(2.5K+ reviews)</span>
              </div>
            </div>

            {/* Title Section */}
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className={`block bg-clip-text text-transparent bg-gradient-to-r animate-gradient ${
                  activeTab === "restaurant" 
                    ? "from-orange-300 via-yellow-300 to-orange-300" 
                    : "from-blue-300 via-purple-300 to-blue-300"
                }`}>
                  {currentContent.title.split(' ')[0]}
                </span>
                <span className="block text-white mt-2">
                  {currentContent.title.split(' ').slice(1).join(' ')}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 mb-6 font-medium max-w-2xl leading-relaxed">
              {currentContent.subtitle}
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed opacity-90">
              {currentContent.description}
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {currentContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl border border-white/10 transition-all duration-300 hover:scale-105 cursor-default"
                >
                  <div className={`p-1.5 rounded-lg ${
                    activeTab === "restaurant" 
                      ? "bg-orange-500/20 group-hover:bg-orange-500/30" 
                      : "bg-blue-500/20 group-hover:bg-blue-500/30"
                  }`}>
                    <feature.icon className={`w-4 h-4 ${
                      activeTab === "restaurant" ? "text-orange-400" : "text-blue-400"
                    }`} />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-white">{feature.text}</div>
                    <div className="text-xs text-gray-400">{feature.subtext}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => navigate(currentContent.cta1.path)}
                className={`group relative font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-2 min-w-[180px] ${
                  activeTab === "restaurant"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:shadow-orange-500/40"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-blue-500/40"
                }`}
              >
                <span className="text-sm sm:text-base">{currentContent.cta1.text}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => navigate(currentContent.cta2.path)}
                className="group bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2 min-w-[180px]"
              >
                <span className="text-sm sm:text-base">{currentContent.cta2.text}</span>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>{activeTab === "restaurant" ? "Open Today: 11AM - 11PM" : "24/7 Reception"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>123 Luxury Avenue</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+91 9399741051</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Featured (Hidden on mobile) */}
          <div className="hidden lg:block">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats[activeTab].map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ animationDelay: `${stat.delay}ms` }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                        <stat.icon className={`w-5 h-5 ${
                          stat.color.includes('orange') || stat.color.includes('yellow') ? 'text-orange-400' : 
                          stat.color.includes('blue') || stat.color.includes('cyan') ? 'text-blue-400' : 
                          'text-white'
                        }`} />
                      </div>
                      <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Card */}
            <div className="relative group">
              <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${
                activeTab === "restaurant" 
                  ? "bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500" 
                  : "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
              }`}></div>
              
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 overflow-hidden">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {activeTab === "restaurant" ? "🍽️ Chef's Special" : "🏨 Featured Suite"}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {activeTab === "restaurant" 
                        ? "Truffle Infused Pasta with Gold Leaf & Caviar" 
                        : "Presidential Suite with Private Infinity Pool"}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                    activeTab === "restaurant" 
                      ? "bg-orange-500/20" 
                      : "bg-blue-500/20"
                  }`}>
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-white text-sm font-bold ml-1">4.9</span>
                  </div>
                </div>

                {/* Price & Details */}
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold mb-1">
                      <span className={activeTab === "restaurant" ? "text-orange-400" : "text-blue-400"}>
                        {activeTab === "restaurant" ? "₹1,299" : "₹24,999"}
                      </span>
                      {activeTab === "hotel" && (
                        <span className="text-sm text-gray-400 ml-2">/ night</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      {activeTab === "restaurant" ? "Serves 2 | 45 mins prep" : "3 Nights Min | All Inclusive"}
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className="flex gap-2">
                    {activeTab === "restaurant" ? (
                      <>
                        <Wine className="w-5 h-5 text-purple-400" />
                        <Music className="w-5 h-5 text-pink-400" />
                        <Tv className="w-5 h-5 text-blue-400" />
                      </>
                    ) : (
                      <>
                        <Bath className="w-5 h-5 text-cyan-400" />
                        <Wind className="w-5 h-5 text-emerald-400" />
                        <Droplets className="w-5 h-5 text-blue-400" />
                      </>
                    )}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => navigate(activeTab === "restaurant" ? "/menu" : "/rooms")}
                  className={`w-full ${
                    activeTab === "restaurant" 
                      ? "bg-orange-500/20 hover:bg-orange-500/30" 
                      : "bg-blue-500/20 hover:bg-blue-500/30"
                  } text-white py-3.5 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:gap-3 group/btn hover:scale-[1.02]`}
                >
                  <span>{activeTab === "restaurant" ? "Order Now" : "Book Now"}</span>
                  <Zap className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats (Only show on mobile) */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-8">
          {stats[activeTab].slice(0, 4).map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </div>
              <div className="text-xs text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Slider Dots */}
            <div className="flex items-center gap-2">
              {heroImages[activeTab].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImage(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentImage 
                      ? `w-8 h-2 ${
                          activeTab === "restaurant" ? "bg-orange-500" : "bg-blue-500"
                        }` 
                      : "w-2 h-2 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Scroll Indicator */}
            <button
              onClick={() => {
                const nextSection = document.getElementById("next-section");
                if (nextSection) {
                  nextSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              aria-label="Scroll down"
            >
              <span className="text-sm font-medium hidden sm:block">Explore More</span>
              <div className="animate-bounce">
                <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
            </button>

            {/* Auto Play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-white/80 hover:text-white transition-colors p-2"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-current rounded-sm animate-pulse"></div>
                  <div className="w-1 h-3 bg-current rounded-sm animate-pulse delay-150"></div>
                </div>
              ) : (
                <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-current ml-0.5"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Next Section Anchor */}
      <div id="next-section" className="absolute bottom-0" />
    </section>
  );
};

// Custom Trophy Icon Component
const TrophyIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default Hero;