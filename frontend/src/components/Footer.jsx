import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CreditCard, 
  Shield, 
  Truck, 
  Heart,
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin,
  ChefHat,
  Hotel,
  ArrowRight,
  Send,
  Star
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "MasterCard", icon: "💳" },
    { name: "PayPal", icon: "🔗" },
    { name: "Apple Pay", icon: "🍎" },
    { name: "Google Pay", icon: "🔷" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={20} />, url: "#", color: "hover:text-blue-600" },
    { name: "Instagram", icon: <Instagram size={20} />, url: "#", color: "hover:text-pink-600" },
    { name: "Twitter", icon: <Twitter size={20} />, url: "#", color: "hover:text-sky-500" },
    { name: "YouTube", icon: <Youtube size={20} />, url: "#", color: "hover:text-red-600" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, url: "#", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black"></div>
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-t border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 px-4 py-2 rounded-full mb-4">
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  <span className="text-sm font-semibold text-yellow-400">Stay Updated</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Join Our Culinary Community
                </h3>
                <p className="text-gray-400">
                  Get exclusive offers, new menu announcements, and VIP event invitations
                </p>
              </div>
              
              <div>
                {isSubscribed ? (
                  <div className="text-center p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Welcome Aboard! 🎉</h4>
                    <p className="text-gray-300">Check your inbox for a special welcome gift!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="relative group">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="flex-1 bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                        required
                      />
                      <button
                        type="submit"
                        className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center justify-center gap-2"
                      >
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 rounded-xl bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      We respect your privacy. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      The<span className="text-yellow-400"> Naivedyam</span>
                    </h2>
                    <p className="text-sm text-gray-400">Hotel & Dine Inn</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Where culinary excellence meets luxury accommodation. Creating unforgettable experiences since 2005.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                    <span className="text-gray-300">123 Luxury Avenue, City Center, NY 10001</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-300">+91 9399741051</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-300">info@luxedine.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-300">Open 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-500" />
                Restaurant
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Our Menu", href: "/menu" },
                  { label: "Book a Table", href: "/book-table", featured: true },
                  { label: "Chef's Specials", href: "/specials" },
                  { label: "Wine Collection", href: "/wine" },
                  { label: "Private Dining", href: "/private-dining" },
                  { label: "Cooking Classes", href: "/classes" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                      {item.featured && (
                        <span className="text-xs bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 py-0.5 rounded-full">
                          Hot
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hotel Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-blue-500" />
                Hotel
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Rooms & Suites", href: "/rooms" },
                  { label: "Book a Stay", href: "/book-room", featured: true },
                  { label: "Spa & Wellness", href: "/spa" },
                  { label: "Conference Rooms", href: "/conference" },
                  { label: "Special Packages", href: "/packages" },
                  { label: "Gallery", href: "/gallery" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                      {item.featured && (
                        <span className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Careers", href: "/careers", badge: "We're hiring!" },
                  { label: "Press & Media", href: "/press" },
                  { label: "Sustainability", href: "/sustainability" },
                  { label: "Awards", href: "/awards" },
                  { label: "Contact Us", href: "/contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className={`w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 hover:border-orange-500/30 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Trust Features */}
              <div className="space-y-6">
                <h4 className="text-white font-bold text-lg mb-4">Why Choose Us</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Shield className="w-5 h-5 text-green-400" />, text: "100% Safe & Secure" },
                    { icon: <Truck className="w-5 h-5 text-blue-400" />, text: "Fast Delivery" },
                    { icon: <CreditCard className="w-5 h-5 text-purple-400" />, text: "Secure Payments" },
                    { icon: <Heart className="w-5 h-5 text-pink-400" />, text: "Premium Quality" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {feature.icon}
                      <span className="text-sm text-gray-400">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">We Accept</h4>
                <div className="flex flex-wrap gap-3">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-800 flex items-center gap-2"
                    >
                      <span className="text-xl">{method.icon}</span>
                      <span className="text-sm text-gray-400">{method.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards & Recognition */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">Awards & Recognition</h4>
                <div className="space-y-3">
                  {[
                    "★ ★ ★ ★ ★ 4.9/5 Google Reviews",
                    "Michelin Star 2024",
                    "Travelers' Choice 2023",
                    "Best Luxury Hotel 2024"
                  ].map((award, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      {award}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-950/50 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} The Naivedyam Hotel & Dine Inn. All rights reserved.
                  <span className="mx-2">•</span>
                  Made with <Heart className="w-4 h-4 text-red-500 inline mx-1" fill="currentColor" /> in New York
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Cookie Policy
                </a>
                <a href="/accessibility" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Accessibility
                </a>
                <a href="/sitemap" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;