import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Save,
  Globe,
  Bell,
  Shield,
  CreditCard,
  Mail,
  AlertCircle
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Hotel Booking',
    siteEmail: 'info@hotelbooking.com',
    sitePhone: '+91 9876543210',
    currency: 'INR',
    timezone: 'IST',
    enableBookings: true,
    enableReviews: true,
    requireVerification: true,
    taxRate: 18,
    commissionRate: 10,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: typeof value === 'boolean' ? !prev[field] : value
    }));
  };

  const handleSave = () => {
    // Save settings to API
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="text-blue-600" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure your hotel booking platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Globe size={20} />
              General Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  value={settings.siteEmail}
                  onChange={(e) => handleChange('siteEmail', e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={settings.sitePhone}
                  onChange={(e) => handleChange('sitePhone', e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg"
                >
                  <option value="IST">India Standard Time</option>
                  <option value="EST">Eastern Standard Time</option>
                  <option value="PST">Pacific Standard Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleChange('taxRate', e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Bell size={20} />
              Feature Settings
            </h3>
            
            <div className="space-y-4">
              {[
                { label: 'Enable Hotel Bookings', field: 'enableBookings' },
                { label: 'Enable Guest Reviews', field: 'enableReviews' },
                { label: 'Require Email Verification', field: 'requireVerification' },
                { label: 'Maintenance Mode', field: 'maintenanceMode' },
                { label: 'Email Notifications', field: 'emailNotifications' },
                { label: 'SMS Notifications', field: 'smsNotifications' }
              ].map(item => (
                <div key={item.field} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.field === 'maintenanceMode' 
                        ? 'Site will be temporarily unavailable' 
                        : 'Turn this feature on/off'}
                    </p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings[item.field]}
                      onChange={() => handleChange(item.field, !settings[item.field])}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Shield size={20} />
              Security
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="text-blue-600" size={20} />
                  <h4 className="font-medium">Security Status</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All security features are active and up to date.
                </p>
              </div>
              
              <button className="w-full p-3 border rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                Change Admin Password
              </button>
              
              <button className="w-full p-3 border rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                Two-Factor Authentication
              </button>
              
              <button className="w-full p-3 border rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                View Access Logs
              </button>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CreditCard size={20} />
              Payment
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                <input
                  type="number"
                  value={settings.commissionRate}
                  onChange={(e) => handleChange('commissionRate', e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg"
                  min="0"
                  max="50"
                />
              </div>
              
              <button className="w-full p-3 border rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                Configure Payment Gateways
              </button>
              
              <button className="w-full p-3 border rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                View Transaction History
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Save size={20} />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;