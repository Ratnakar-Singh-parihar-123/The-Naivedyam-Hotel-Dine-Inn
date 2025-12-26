import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  CreditCard, 
  Heart, 
  Award,
  Star,
  History,
  Settings,
  LogOut,
  Edit2,
  Camera,
  Save,
  ChevronRight,
  Globe,
  Moon,
  ShieldCheck,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    country: 'India',
    language: 'English',
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      promotionalEmails: true,
      darkMode: false,
      newsletter: true
    },
    loyaltyPoints: 1250,
    membershipLevel: 'Gold',
    joinDate: '2023-01-15',
    totalBookings: 12,
    totalSpent: 85600
  });

  const [stats, setStats] = useState({
    upcomingBookings: 2,
    pastBookings: 10,
    cancelledBookings: 1,
    pendingReviews: 3,
    favoriteHotels: 8
  });

  const tabs = [
    { id: 'profile', label: 'Personal Info', icon: <User size={20} /> },
    { id: 'bookings', label: 'My Bookings', icon: <Calendar size={20} /> },
    { id: 'reviews', label: 'My Reviews', icon: <Star size={20} /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
    { id: 'preferences', label: 'Preferences', icon: <Settings size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard size={20} /> },
    { id: 'loyalty', label: 'Loyalty Program', icon: <Award size={20} /> }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (preference) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference]
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the profile data
    console.log('Profile saved:', profileData);
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
  };

  const getMembershipColor = () => {
    switch(profileData.membershipLevel) {
      case 'Platinum': return 'bg-gradient-to-r from-gray-700 to-gray-900';
      case 'Gold': return 'bg-gradient-to-r from-amber-500 to-yellow-500';
      case 'Silver': return 'bg-gradient-to-r from-gray-400 to-gray-600';
      default: return 'bg-gradient-to-r from-blue-500 to-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className={`rounded-3xl overflow-hidden shadow-xl mb-8 ${getMembershipColor()}`}>
            <div className="p-8 text-white">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/30 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
                        {profileData.name.charAt(0)}
                      </div>
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-lg hover:scale-105 transition-transform">
                        <Camera size={20} />
                      </button>
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full">
                        <Award size={16} />
                        <span className="font-semibold">{profileData.membershipLevel} Member</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="fill-white" />
                        <span className="font-semibold">{profileData.loyaltyPoints} Points</span>
                      </div>
                    </div>
                    <p className="text-white/80">
                      Member since {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          // Reset form if needed
                        }}
                        className="px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
                      >
                        <Save size={20} />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl font-medium flex items-center gap-2"
                    >
                      <Edit2 size={20} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden sticky top-8">
                <div className="p-4">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl mb-2 transition-all ${
                        activeTab === tab.id 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          activeTab === tab.id 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {tab.icon}
                        </div>
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      <ChevronRight size={18} />
                    </button>
                  ))}
                </div>
                
                <div className="border-t p-4">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium"
                  >
                    <LogOut size={20} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Calendar className="text-blue-600 dark:text-blue-400" size={18} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
                        <div className="font-bold">{stats.upcomingBookings}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <History className="text-green-600 dark:text-green-400" size={18} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Past Stays</div>
                        <div className="font-bold">{stats.pastBookings}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <Heart className="text-amber-600 dark:text-amber-400" size={18} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Favorites</div>
                        <div className="font-bold">{stats.favoriteHotels}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Star className="text-purple-600 dark:text-purple-400" size={18} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
                        <div className="font-bold">{stats.pendingReviews}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <User size={16} />
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl font-medium">
                            {profileData.name}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Mail size={16} />
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl font-medium">
                            {profileData.email}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <Phone size={16} />
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl font-medium">
                            {profileData.phone}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <input
                            type="date"
                            value={profileData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl font-medium">
                            {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <MapPin size={16} />
                          Address
                        </label>
                        {isEditing ? (
                          <textarea
                            value={profileData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 h-24"
                            rows={3}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl font-medium">
                            {profileData.address}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Account Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                      <div className="text-3xl font-bold mb-2">{profileData.totalBookings}</div>
                      <div className="text-blue-100">Total Bookings</div>
                      <div className="text-sm text-blue-200 mt-2">Across all hotels</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                      <div className="text-3xl font-bold mb-2">₹{profileData.totalSpent.toLocaleString()}</div>
                      <div className="text-green-100">Total Spent</div>
                      <div className="text-sm text-green-200 mt-2">Lifetime value</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                      <div className="text-3xl font-bold mb-2">{profileData.loyaltyPoints}</div>
                      <div className="text-purple-100">Loyalty Points</div>
                      <div className="text-sm text-purple-200 mt-2">Available for rewards</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Preferences</h2>
                  
                  <div className="space-y-6">
                    {/* Notification Preferences */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Bell size={20} />
                        Notification Preferences
                      </h3>
                      <div className="space-y-4">
                        {[
                          { 
                            label: 'Email Notifications', 
                            description: 'Receive booking confirmations and updates via email',
                            field: 'emailNotifications'
                          },
                          { 
                            label: 'SMS Notifications', 
                            description: 'Get important alerts via SMS',
                            field: 'smsNotifications'
                          },
                          { 
                            label: 'Promotional Emails', 
                            description: 'Receive special offers and discounts',
                            field: 'promotionalEmails'
                          },
                          { 
                            label: 'Newsletter', 
                            description: 'Monthly newsletter with travel tips',
                            field: 'newsletter'
                          }
                        ].map((pref) => (
                          <div key={pref.field} className="flex items-center justify-between p-4 border rounded-xl">
                            <div>
                              <h4 className="font-medium">{pref.label}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{pref.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={profileData.preferences[pref.field]}
                                onChange={() => handlePreferenceChange(pref.field)}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Display Preferences */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Globe size={20} />
                        Display & Language
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Language</label>
                          <select
                            value={profileData.language}
                            onChange={(e) => handleInputChange('language', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Country</label>
                          <select
                            value={profileData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Theme Preference */}
                    <div className="flex items-center justify-between p-4 border rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Moon className="text-gray-600 dark:text-gray-400" size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium">Dark Mode</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark theme</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={profileData.preferences.darkMode}
                          onChange={() => handlePreferenceChange('darkMode')}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ShieldCheck size={20} />
                    Security Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                        <h3 className="text-lg font-bold text-green-800 dark:text-green-300">Security Status: Excellent</h3>
                      </div>
                      <p className="text-green-700 dark:text-green-400">
                        Your account is well protected. All security features are active and up to date.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Lock className="text-blue-600 dark:text-blue-400" size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium">Change Password</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Shield className="text-purple-600 dark:text-purple-400" size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-red-600">Inactive</span>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <Bell className="text-amber-600 dark:text-amber-400" size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium">Login Alerts</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new logins</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600">Active</span>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <History className="text-red-600 dark:text-red-400" size={20} />
                          </div>
                          <div>
                            <h4 className="font-medium">Login History</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">View recent account activity</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'loyalty' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Award size={20} />
                    Loyalty Program
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Membership Card */}
                    <div className={`rounded-2xl p-6 text-white ${getMembershipColor()}`}>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold">{profileData.membershipLevel} Member</h3>
                          <p className="text-white/80">Since {profileData.joinDate}</p>
                        </div>
                        <div className="text-4xl font-bold">{profileData.loyaltyPoints}</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{profileData.totalBookings}</div>
                          <div className="text-sm text-white/80">Bookings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{stats.pastBookings}</div>
                          <div className="text-sm text-white/80">Nights</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">₹{profileData.totalSpent.toLocaleString()}</div>
                          <div className="text-sm text-white/80">Spent</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress to Next Tier */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">Progress to Platinum</h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">5000 points needed</span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                          style={{ width: `${(profileData.loyaltyPoints / 5000) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {5000 - profileData.loyaltyPoints} more points to reach Platinum
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-bold mb-4">Your Benefits</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-xl">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                            </div>
                            <div className="font-medium">Free Room Upgrade</div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Available on select bookings</p>
                        </div>
                        
                        <div className="p-4 border rounded-xl">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <CheckCircle className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <div className="font-medium">Early Check-in</div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">From 12 PM onwards</p>
                        </div>
                        
                        <div className="p-4 border rounded-xl">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                              <CheckCircle className="text-purple-600 dark:text-purple-400" size={20} />
                            </div>
                            <div className="font-medium">Welcome Drink</div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Complimentary on arrival</p>
                        </div>
                        
                        <div className="p-4 border rounded-xl">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                              <CheckCircle className="text-amber-600 dark:text-amber-400" size={20} />
                            </div>
                            <div className="font-medium">Late Check-out</div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Until 2 PM (subject to availability)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">My Bookings</h2>
                  <div className="text-center py-12">
                    <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                      <Calendar size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">No bookings yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Start your journey by booking your first hotel stay!
                    </p>
                    <button
                      onClick={() => navigate('/hotels')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Browse Hotels
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Favorite Hotels</h2>
                  <div className="text-center py-12">
                    <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                      <Heart size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">No favorites yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Save your favorite hotels for quick access!
                    </p>
                    <button
                      onClick={() => navigate('/hotels')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Explore Hotels
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">My Reviews</h2>
                  <div className="text-center py-12">
                    <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                      <Star size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">No reviews yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Share your experiences by reviewing hotels you've stayed at!
                    </p>
                    <button
                      onClick={() => navigate('/hotels')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
                  <div className="text-center py-12">
                    <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                      <CreditCard size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">No payment methods</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Add a payment method for faster checkout!
                    </p>
                    <button
                      onClick={() => navigate('/profile?tab=payment')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Add Payment Method
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;