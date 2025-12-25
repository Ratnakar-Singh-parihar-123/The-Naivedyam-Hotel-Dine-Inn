import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Heart, TrendingUp } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Donald Jackman",
      role: "Food Critic & Blogger",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&h=400&auto=format&fit=crop",
      rating: 5,
      content: "The culinary experience here is absolutely phenomenal! Every dish tells a story of passion and expertise. The truffle pasta I had last week still haunts my dreams in the best way possible.",
      visitCount: "15+ visits",
      favorite: "Truffle Pasta",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Martinez",
      role: "Executive Chef",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&h=400&auto=format&fit=crop",
      rating: 5,
      content: "As a chef myself, I truly appreciate the attention to detail in every aspect. The flavor combinations are innovative yet respectful of traditional techniques. Their seafood risotto is a masterpiece!",
      visitCount: "Monthly regular",
      favorite: "Seafood Risotto",
      verified: true
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Restaurant Investor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
      rating: 4,
      content: "What sets this place apart is the consistency. Every visit delivers the same exceptional quality. The ambiance, service, and food create a perfect dining trifecta. A solid investment recommendation!",
      visitCount: "8 visits",
      favorite: "Wagyu Steak",
      verified: true
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      role: "Food Photographer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&auto=format&fit=crop",
      rating: 5,
      content: "Not only does the food taste incredible, but every plate is a work of art ready for the camera. The lighting in the restaurant makes food photography an absolute delight. Visual and culinary perfection!",
      visitCount: "12 visits",
      favorite: "Rainbow Salad",
      verified: true
    },
    {
      id: 5,
      name: "James Washington",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop",
      rating: 5,
      content: "I've hosted several business dinners here and each time my clients are thoroughly impressed. The private dining area and impeccable service make it my go-to for important meetings. Exceptional!",
      visitCount: "25+ visits",
      favorite: "Business Lunch Set",
      verified: true
    },
    {
      id: 6,
      name: "Lisa Patterson",
      role: "Food Tour Guide",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop",
      rating: 5,
      content: "This restaurant is always on my recommended list for food tours. The authenticity and quality never disappoint. Watching the open kitchen work is like seeing culinary ballet in action!",
      visitCount: "30+ visits",
      favorite: "Chef's Tasting Menu",
      verified: true
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Render stars
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-500/5 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:to-yellow-500/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              Customer Stories
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Loved
            </span>
            <span className="text-gray-900 dark:text-white"> by Food Lovers</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover why thousands of food enthusiasts keep coming back for more
          </p>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { value: "4.9/5", label: "Average Rating", icon: Star },
            { value: "2,500+", label: "Happy Customers", icon: Heart },
            { value: "98%", label: "Return Rate", icon: TrendingUp },
            { value: "150+", label: "5-Star Reviews", icon: Sparkles },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 mb-4">
                <stat.icon className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Testimonial Card */}
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
                          {/* Quote Icon */}
                          <Quote className="absolute top-6 right-6 w-12 h-12 text-orange-500/10" />
                          
                          {/* Content */}
                          <div className="mb-6">
                            <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                              "{testimonial.content}"
                            </p>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex gap-1">
                                {renderStars(testimonial.rating)}
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {testimonial.rating}/5
                              </span>
                            </div>
                          </div>

                          {/* Customer Info */}
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {testimonial.verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                  {testimonial.name}
                                </h3>
                                {testimonial.verified && (
                                  <span className="text-xs font-medium bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                                    Verified
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-2">{testimonial.role}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="text-xs font-medium bg-gradient-to-r from-orange-500/10 to-yellow-500/10 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                                  {testimonial.visitCount}
                                </span>
                                <span className="text-xs font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                                  Fav: {testimonial.favorite}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Image Side */}
                      <div className="hidden lg:block">
                        <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden group">
                          <img
                            src={`https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&h=600&crop=entropy&fit=crop&${index}`}
                            alt="Featured Dish"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          <div className="absolute bottom-6 left-6">
                            <span className="text-sm font-medium text-white/80">Featured Dish</span>
                            <h4 className="text-2xl font-bold text-white mt-1">{testimonial.favorite}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="group w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-orange-500 to-yellow-500'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="group w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500" />
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${
              isAutoPlaying 
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500' 
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                isAutoPlaying ? 'left-7' : 'left-1'
              }`}></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Auto-play {isAutoPlaying ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        {/* Featured Testimonial Cards (Mobile Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;