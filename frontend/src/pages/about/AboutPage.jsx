import React, { useState } from 'react';
import { 
  Star, 
  Award, 
  Users, 
  Clock, 
  MapPin, 
  Heart, 
  ChefHat, 
  Hotel, 
  Sparkles, 
  Globe, 
  Coffee, 
  Wine, 
  Music, 
  Leaf, 
  Shield,
  ThumbsUp,
  Truck,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronRight,
  Quote,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { number: '25+', label: 'Years Experience', icon: <Calendar size={24} /> },
    { number: '50K+', label: 'Happy Customers', icon: <Users size={24} /> },
    { number: '150+', label: 'Menu Items', icon: <ChefHat size={24} /> },
    { number: '45+', label: 'Luxury Rooms', icon: <Hotel size={24} /> },
    { number: '25+', label: 'Awards Won', icon: <Award size={24} /> },
    { number: '98%', label: 'Customer Satisfaction', icon: <ThumbsUp size={24} /> }
  ];

  const values = [
    {
      icon: <Heart size={28} className="text-red-500" />,
      title: 'Authenticity',
      description: 'Preserving traditional recipes while embracing modern culinary techniques'
    },
    {
      icon: <Shield size={28} className="text-blue-500" />,
      title: 'Quality',
      description: 'Using only the finest ingredients sourced from trusted local suppliers'
    },
    {
      icon: <Users size={28} className="text-green-500" />,
      title: 'Hospitality',
      description: 'Treating every guest like family with personalized attention'
    },
    {
      icon: <Leaf size={28} className="text-emerald-500" />,
      title: 'Sustainability',
      description: 'Eco-friendly practices and supporting local communities'
    }
  ];

  const features = [
    {
      category: 'Dining',
      items: [
        { icon: <ChefHat size={20} />, text: 'Multi-cuisine restaurant' },
        { icon: <Wine size={20} />, text: 'Premium bar & lounge' },
        { icon: <Coffee size={20} />, text: '24/7 coffee shop' },
        { icon: <Music size={20} />, text: 'Live music evenings' }
      ]
    },
    {
      category: 'Accommodation',
      items: [
        { icon: <Hotel size={20} />, text: 'Luxury suites with views' },
        { icon: <Sparkles size={20} />, text: 'Spa & wellness center' },
        { icon: <Globe size={20} />, text: 'Conference facilities' },
        { icon: <Truck size={20} />, text: 'Valet parking' }
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Mehta',
      role: 'Regular Guest',
      quote: 'The Naivedyam has been our family favorite for years. The food is consistently excellent!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      name: 'Priya Sharma',
      role: 'Food Blogger',
      quote: 'Their fusion dishes are revolutionary! Perfect blend of traditional and modern.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w-150'
    },
    {
      name: 'Amit Patel',
      role: 'Hotel Guest',
      quote: 'Stayed here for a week. Rooms are luxurious and service is impeccable.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    }
  ];

  const awards = [
    { year: '2024', name: 'Best Luxury Hotel Award', by: 'Travel Excellence' },
    { year: '2023', name: 'Culinary Innovation Award', by: 'Food & Hospitality' },
    { year: '2022', name: 'Sustainable Business Award', by: 'Green Hotels' },
    { year: '2021', name: 'Customer Service Excellence', by: 'Hospitality Today' }
  ];

  const team = [
    {
      name: 'Chef Arvind Sharma',
      role: 'Executive Chef',
      experience: '25+ years',
      specialty: 'Indian Fusion Cuisine',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Pastry Chef',
      experience: '15+ years',
      specialty: 'Desserts & Bakery',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400'
    },
    {
      name: 'Robert Chen',
      role: 'Hotel Manager',
      experience: '20+ years',
      specialty: 'Guest Experience',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
    },
    {
      name: 'Lisa Williams',
      role: 'Event Coordinator',
      experience: '12+ years',
      specialty: 'Weddings & Events',
      image: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-amber-900/10 dark:from-orange-900/30 dark:to-amber-900/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to <span className="text-orange-600 dark:text-orange-400">The Naivedyam</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-6">
              Hotel & Dine Inn
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Where traditional hospitality meets modern luxury. Experience the perfect blend 
              of exquisite dining, comfortable stays, and unforgettable memories.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/book-table">
                <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300">
                  Book a Table
                </button>
              </Link>
              <Link to="/rooms">
                <button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black dark:from-gray-700 dark:to-gray-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50 transition-all duration-300">
                  View Rooms
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['story', 'values', 'features', 'team', 'awards'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
            {activeTab === 'story' && (
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <p>
                      Founded in 1999 by the Sharma family, <span className="text-orange-600 dark:text-orange-400 font-semibold">The Naivedyam Hotel & Dine Inn</span> began as a small 
                      family-run restaurant serving authentic Indian cuisine. What started as a humble 
                      eatery has now blossomed into a premier destination for both dining and lodging.
                    </p>
                    <p>
                      Over the years, we've expanded our offerings to include luxury accommodation, 
                      transforming into a complete hospitality experience while staying true to our 
                      roots. Our name "Naivedyam" symbolizes the offering of food to the divine, 
                      reflecting our commitment to serving meals prepared with devotion and care.
                    </p>
                    <p>
                      Today, we proudly stand as a landmark in the city, known for our exceptional 
                      service, exquisite cuisine, and luxurious accommodations. Every corner of our 
                      establishment tells a story of tradition, innovation, and heartfelt hospitality.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600" 
                    alt="Restaurant Interior" 
                    className="rounded-lg shadow-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600" 
                    alt="Hotel Room" 
                    className="rounded-lg shadow-lg mt-8"
                  />
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Our Core Values
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="text-center p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  What We Offer
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {features.map((category, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {category.category}
                      </h3>
                      <div className="space-y-4">
                        {category.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                              {item.icon}
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Meet Our Team
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {team.map((member, index) => (
                    <div key={index} className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-orange-600 dark:text-orange-400 font-medium mb-2">
                          {member.role}
                        </p>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>{member.experience} experience</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ChefHat size={14} />
                            <span>Specialty: {member.specialty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'awards' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Recognition & Awards
                </h2>
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-4">
                    {awards.map((award, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-lg hover:from-orange-500/10 hover:to-amber-500/10 transition-all duration-300">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-3 py-1 rounded">
                          {award.year}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {award.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Awarded by {award.by}
                          </p>
                        </div>
                        <Award className="text-amber-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Guests Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="text-orange-500/30 mb-3" size={24} />
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Experience Luxury & Flavor
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you're looking for a fine dining experience or a luxurious stay, 
              The Naivedyam promises memories that last a lifetime.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300">
                  Get In Touch
                </button>
              </Link>
              <Link to="/menu">
                <button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black dark:from-gray-700 dark:to-gray-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50 transition-all duration-300">
                  View Our Menu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
              <p className="text-gray-300">
                123 Luxury Avenue<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
              <p className="text-gray-300">
                +91 9399741051<br />
                +1 (555) 123-4567
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
              <p className="text-gray-300">
                info@thenaivedyam.com<br />
                reservations@thenaivedyam.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;