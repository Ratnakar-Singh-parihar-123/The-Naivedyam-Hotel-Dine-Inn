import React, { useState, useEffect } from 'react';
import { Users, UserPlus, UserMinus, Baby, Bed } from 'lucide-react';

const GuestSelector = ({ 
  guests, 
  onChange, 
  maxRooms = 5, 
  maxGuests = 10,
  maxChildren = 5
}) => {
  // Default guest configuration
  const defaultGuests = {
    adults: 2,
    children: 0,
    rooms: 1,
    childrenAges: []
  };

  // Safe guests with fallback to default
  const safeGuests = React.useMemo(() => {
    if (!guests || typeof guests !== 'object') {
      return { ...defaultGuests };
    }
    
    return {
      adults: Math.max(1, parseInt(guests.adults) || defaultGuests.adults),
      children: Math.max(0, parseInt(guests.children) || defaultGuests.children),
      rooms: Math.max(1, parseInt(guests.rooms) || defaultGuests.rooms),
      childrenAges: Array.isArray(guests.childrenAges) ? guests.childrenAges : []
    };
  }, [guests]);

  // Initialize children ages when children count changes
  const [childrenAges, setChildrenAges] = useState(
    safeGuests.childrenAges.slice(0, safeGuests.children)
  );

  // Update children ages when children count changes
  useEffect(() => {
    if (safeGuests.children > childrenAges.length) {
      // Add new child with default age (e.g., 5 years)
      setChildrenAges(prev => [...prev, ...Array(safeGuests.children - prev.length).fill(5)]);
    } else if (safeGuests.children < childrenAges.length) {
      // Remove excess children
      setChildrenAges(prev => prev.slice(0, safeGuests.children));
    }
  }, [safeGuests.children]);

  const updateGuests = (field, value) => {
    if (!onChange) {
      console.warn('GuestSelector: onChange prop is not provided');
      return;
    }

    try {
      const currentValue = safeGuests[field] || 0;
      const newValue = Math.max(
        0,
        Math.min(
          field === 'rooms' ? maxRooms : (field === 'children' ? maxChildren : maxGuests),
          currentValue + value
        )
      );

      const updated = { 
        ...safeGuests, 
        [field]: newValue,
        childrenAges: childrenAges
      };

      // Ensure rooms don't exceed total adults
      if (field === 'adults' && updated.adults < updated.rooms) {
        updated.rooms = updated.adults;
      }

      // Ensure rooms don't exceed maxRooms
      if (field === 'rooms') {
        updated.rooms = Math.min(updated.rooms, maxRooms, updated.adults);
      }

      onChange(updated);
    } catch (error) {
      console.error('Error updating guests:', error);
    }
  };

  const handleChildAgeChange = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = parseInt(age) || 0;
    setChildrenAges(newAges);
    
    // Update parent if onChange exists
    if (onChange) {
      onChange({
        ...safeGuests,
        childrenAges: newAges
      });
    }
  };

  // Calculate occupancy
  const totalGuests = safeGuests.adults + safeGuests.children;
  const occupancyPerRoom = safeGuests.rooms > 0 
    ? Math.ceil(totalGuests / safeGuests.rooms) 
    : totalGuests;

  return (
    <div className="space-y-6">
      {/* Adults */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Users size={20} />
              Adults
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Age 13+</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('adults', -1)}
              disabled={safeGuests.adults <= 1}
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Decrease adult count"
            >
              <UserMinus size={20} />
            </button>
            
            <span className="text-2xl font-bold min-w-8 text-center text-gray-900 dark:text-white">
              {safeGuests.adults}
            </span>
            
            <button
              onClick={() => updateGuests('adults', 1)}
              disabled={safeGuests.adults >= maxGuests}
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Increase adult count"
            >
              <UserPlus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Children */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Baby size={20} />
              Children
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Age 0-12</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('children', -1)}
              disabled={safeGuests.children <= 0}
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Decrease child count"
            >
              <UserMinus size={20} />
            </button>
            
            <span className="text-2xl font-bold min-w-8 text-center text-gray-900 dark:text-white">
              {safeGuests.children}
            </span>
            
            <button
              onClick={() => updateGuests('children', 1)}
              disabled={safeGuests.children >= maxChildren}
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Increase child count"
            >
              <UserPlus size={20} />
            </button>
          </div>
        </div>
        
        {safeGuests.children > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Please specify the age of each child:
            </p>
            {Array.from({ length: safeGuests.children }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Child {index + 1} Age
                </label>
                <select
                  value={childrenAges[index] || 5}
                  onChange={(e) => handleChildAgeChange(index, e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: 13 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} {i === 1 ? 'year old' : 'years old'}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rooms */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Bed size={20} />
              Rooms
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Maximum {Math.min(maxRooms, safeGuests.adults)} rooms (limited by adult count)
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('rooms', -1)}
              disabled={safeGuests.rooms <= 1}
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Decrease room count"
            >
              <UserMinus size={20} />
            </button>
            
            <span className="text-2xl font-bold min-w-8 text-center text-gray-900 dark:text-white">
              {safeGuests.rooms}
            </span>
            
            <button
              onClick={() => updateGuests('rooms', 1)}
              disabled={safeGuests.rooms >= Math.min(maxRooms, safeGuests.adults)}
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Increase room count"
            >
              <UserPlus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Booking Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Guests</span>
            <span className="font-bold text-gray-900 dark:text-white">{totalGuests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Adults</span>
            <span className="font-bold text-gray-900 dark:text-white">{safeGuests.adults}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Children</span>
            <span className="font-bold text-gray-900 dark:text-white">{safeGuests.children}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Rooms</span>
            <span className="font-bold text-gray-900 dark:text-white">{safeGuests.rooms}</span>
          </div>
          <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-900 dark:text-white">Occupancy per room</span>
              <span className="text-blue-600 dark:text-blue-400">
                ~{occupancyPerRoom} {occupancyPerRoom === 1 ? 'guest' : 'guests'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="text-sm text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="font-medium mb-1">💡 Tips:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Each room must have at least 1 adult</li>
          <li>Children under 13 are considered children</li>
          <li>Infants (under 2) can stay free in cribs</li>
        </ul>
      </div>
    </div>
  );
};

export default GuestSelector;

// Usage example in parent component:
/*
const [guests, setGuests] = useState({
  adults: 2,
  children: 0,
  rooms: 1,
  childrenAges: []
});

<GuestSelector 
  guests={guests}
  onChange={setGuests}
  maxRooms={5}
  maxGuests={10}
  maxChildren={5}
/>
*/