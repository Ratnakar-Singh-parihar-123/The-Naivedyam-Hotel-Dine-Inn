import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  User, 
  MessageSquare,
  CheckCircle,
  Star,
  Sparkles,
  Headphones,
  Calendar,
  Globe,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactMethod: "email",
    preferredTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Reset form success state after 5 seconds
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here
      // const response = await axios.post('/api/contact', formData);
      
      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        contactMethod: "email",
        preferredTime: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact information sections
  const contactSections = {
    general: [
      { icon: <MapPin className="w-5 h-5" />, title: "Main Restaurant", value: "123 Gourmet Avenue, Culinary District", subvalue: "New York, NY 10001" },
      { icon: <Phone className="w-5 h-5" />, title: "Reservations", value: "+1 (555) 123-4567", subvalue: "Available 24/7" },
      { icon: <Mail className="w-5 h-5" />, title: "General Inquiries", value: "info@luxedine.com", subvalue: "Response within 24 hours" },
      { icon: <Clock className="w-5 h-5" />, title: "Opening Hours", value: "Mon-Sun: 11:00 AM - 11:00 PM", subvalue: "Kitchen closes at 10:30 PM" },
    ],
    hotel: [
      { icon: <MapPin className="w-5 h-5" />, title: "Hotel Reception", value: "456 Luxury Boulevard", subvalue: "Same building, separate entrance" },
      { icon: <Phone className="w-5 h-5" />, title: "Hotel Desk", value: "+1 (555) 987-6543", subvalue: "24-hour reception" },
      { icon: <Mail className="w-5 h-5" />, title: "Hotel Bookings", value: "hotel@luxedine.com", subvalue: "For room reservations" },
      { icon: <Headphones className="w-5 h-5" />, title: "Concierge", value: "concierge@luxedine.com", subvalue: "Personalized assistance" },
    ],
    corporate: [
      { icon: <User className="w-5 h-5" />, title: "Event Manager", value: "events@luxedine.com", subvalue: "For private dining & events" },
      { icon: <Calendar className="w-5 h-5" />, title: "Business Inquiries", value: "business@luxedine.com", subvalue: "Partnerships & collaborations" },
      { icon: <Globe className="w-5 h-5" />, title: "Media Relations", value: "media@luxedine.com", subvalue: "Press & media inquiries" },
      { icon: <Star className="w-5 h-5" />, title: "VIP Services", value: "vip@luxedine.com", subvalue: "Premium guest services" },
    ]
  };

  const contactTypes = [
    { id: "general", label: "General", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "hotel", label: "Hotel", icon: <Headphones className="w-4 h-4" /> },
    { id: "corporate", label: "Corporate", icon: <User className="w-4 h-4" /> },
  ];

  const contactMethods = [
    { value: "email", label: "Email", desc: "Get response within 24 hours" },
    { value: "phone", label: "Phone Call", desc: "We'll call you back within 2 hours" },
    { value: "whatsapp", label: "WhatsApp", desc: "Instant messaging available" },
  ];

  const socialMedia = [
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", handle: "@luxedine", color: "hover:text-pink-600" },
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", handle: "/luxedine", color: "hover:text-blue-600" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", handle: "@luxedine", color: "hover:text-sky-500" },
    { icon: <Youtube className="w-5 h-5" />, name: "YouTube", handle: "LuxeDine", color: "hover:text-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80&blend=000000&blend-mode=multiply"
            alt="LuxeDine Restaurant"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-400">Get In Touch</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Connect
              </span>
              <br />
              <span className="text-white">With Excellence</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your experience matters to us. Reach out for reservations, inquiries, 
              or simply to share your thoughts about your visit.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {[
            { value: "24/7", label: "Support Available", icon: <Headphones className="w-6 h-6" /> },
            { value: "< 2h", label: "Response Time", icon: <Clock className="w-6 h-6" /> },
            { value: "98%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6" /> },
            { value: "50+", label: "Team Members", icon: <User className="w-6 h-6" /> },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 mb-3">
                <div className="text-orange-500">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-1">
            {/* Contact Type Tabs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 mb-8">
              {contactTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center gap-3 px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === type.id
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className={activeTab === type.id ? "text-white" : "text-gray-500"}>
                    {type.icon}
                  </span>
                  <span className="font-medium">{type.label}</span>
                  {activeTab === type.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="space-y-6">
                {contactSections[activeTab].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <div className="text-orange-500">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-900 dark:text-gray-200 font-medium">
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.subvalue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Preview */}
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Interactive map coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
              {isSubmitted ? (
                /* Success State */
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Message Sent Successfully! 🎉
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Fill out the form below and we'll get back to you as soon as possible
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Preferred Contact Method
                        </label>
                        <select
                          name="contactMethod"
                          value={formData.contactMethod}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        >
                          {contactMethods.map((method) => (
                            <option key={method.value} value={method.value}>
                              {method.label} - {method.desc}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Subject *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          placeholder="What is this regarding?"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        * Required fields
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                        <div className="absolute inset-0 rounded-xl bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: "What are your reservation policies?",
                    a: "We recommend booking 48 hours in advance. For groups of 6+, please call our reservations line."
                  },
                  {
                    q: "Do you accommodate dietary restrictions?",
                    a: "Yes! Our chefs can accommodate most dietary needs. Please mention any restrictions when booking."
                  },
                  {
                    q: "Is there parking available?",
                    a: "Valet parking is available for restaurant guests. Hotel guests receive complimentary parking."
                  },
                  {
                    q: "What's your cancellation policy?",
                    a: "Cancellations made 24+ hours in advance receive a full refund. Within 24 hours, a 50% fee applies."
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.q}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Prefer to Call?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Our dedicated team is available 24/7 to assist you with reservations, 
              inquiries, and special requests.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now: +1 (555) 123-4567</span>
              </a>
              <a
                href="mailto:info@luxedine.com"
                className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-orange-500 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;