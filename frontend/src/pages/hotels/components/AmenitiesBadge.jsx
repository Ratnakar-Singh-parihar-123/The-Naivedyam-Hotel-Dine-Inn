import React from 'react';
import { 
  Wifi, 
  Tv, 
  Coffee, 
  Wind, 
  Droplets, 
  Car, 
  Dumbbell, 
  Waves, 
  Utensils, 
  Wine,
  Shield,
  Clock,
  ConciergeBell,
  Briefcase,
  Baby,
  Key,
  Volume2,
  Trees
} from 'lucide-react';

const AmenitiesBadge = ({ amenities, size = "medium", showLabels = true, limit = null }) => {
  const iconMap = {
    wifi: { icon: <Wifi />, label: "Free WiFi", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
    tv: { icon: <Tv />, label: "TV", color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30" },
    ac: { icon: <Wind />, label: "Air Conditioning", color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30" },
    heater: { icon: <Droplets />, label: "Heater", color: "text-red-600 bg-red-100 dark:bg-red-900/30" },
    parking: { icon: <Car />, label: "Parking", color: "text-gray-600 bg-gray-100 dark:bg-gray-700" },
    gym: { icon: <Dumbbell />, label: "Gym", color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30" },
    pool: { icon: <Waves />, label: "Swimming Pool", color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30" },
    restaurant: { icon: <Utensils />, label: "Restaurant", color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
    bar: { icon: <Wine />, label: "Bar", color: "text-pink-600 bg-pink-100 dark:bg-pink-900/30" },
    safe: { icon: <Shield />, label: "Safe", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" },
    "24/7": { icon: <Clock />, label: "24/7 Front Desk", color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30" },
    roomService: { icon: <ConciergeBell />, label: "Room Service", color: "text-teal-600 bg-teal-100 dark:bg-teal-900/30" },
    business: { icon: <Briefcase />, label: "Business Center", color: "text-gray-600 bg-gray-100 dark:bg-gray-700" },
    kids: { icon: <Baby />, label: "Kids Friendly", color: "text-pink-600 bg-pink-100 dark:bg-pink-900/30" },
    "key-card": { icon: <Key />, label: "Key Card Access", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
    soundproof: { icon: <Volume2 />, label: "Soundproof", color: "text-violet-600 bg-violet-100 dark:bg-violet-900/30" },
    garden: { icon: <Trees />, label: "Garden", color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" },
    breakfast: { icon: <Coffee />, label: "Free Breakfast", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30" }
  };

  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-1.5 text-sm",
    large: "px-4 py-2 text-base"
  };

  const iconSize = {
    small: 14,
    medium: 16,
    large: 20
  };

  const displayAmenities = limit ? amenities.slice(0, limit) : amenities;

  return (
    <div className="flex flex-wrap gap-2">
      {displayAmenities.map((amenity, index) => {
        const config = iconMap[amenity] || { 
          icon: <Coffee size={iconSize[size]} />, 
          label: amenity, 
          color: "text-gray-600 bg-gray-100 dark:bg-gray-700" 
        };
        
        return (
          <div
            key={index}
            className={`flex items-center gap-2 ${sizeClasses[size]} rounded-lg ${config.color} transition-all hover:scale-105`}
            title={config.label}
          >
            <div className="flex items-center">
              {React.cloneElement(config.icon, { size: iconSize[size] })}
            </div>
            {showLabels && (
              <span className="font-medium capitalize">{config.label}</span>
            )}
          </div>
        );
      })}
      
      {limit && amenities.length > limit && (
        <div className={`flex items-center ${sizeClasses[size]} text-gray-600 bg-gray-100 dark:bg-gray-700 rounded-lg`}>
          <span className="font-medium">+{amenities.length - limit} more</span>
        </div>
      )}
    </div>
  );
};

export default AmenitiesBadge;