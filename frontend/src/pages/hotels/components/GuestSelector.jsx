import React from 'react';
import { Users, UserPlus, UserMinus, Baby, Bed } from 'lucide-react';

const GuestSelector = ({ guests, onChange, maxRooms = 5, maxGuests = 10 }) => {
  const updateGuests = (field, value) => {
    const newValue = Math.max(0, Math.min(
      field === 'rooms' ? maxRooms : maxGuests,
      guests[field] + value
    ));
    
    const updated = { ...guests, [field]: newValue };
    
    // Ensure rooms don't exceed total adults
    if (field === 'adults' && updated.adults < updated.rooms) {
      updated.rooms = updated.adults;
    }
    
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Adults */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Users size={20} />
              Adults
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Age 13+</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('adults', -1)}
              disabled={guests.adults <= 1}
              className="w-10 h-10 rounded-full border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors flex items-center justify-center"
            >
              <UserMinus size={20} />
            </button>
            
            <span className="text-2xl font-bold min-w-8 text-center">{guests.adults}</span>
            
            <button
              onClick={() => updateGuests('adults', 1)}
              disabled={guests.adults >= maxGuests}
              className="w-10 h-10 rounded-full border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors flex items-center justify-center"
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
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Baby size={20} />
              Children
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Age 0-12</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('children', -1)}
              disabled={guests.children <= 0}
              className="w-10 h-10 rounded-full border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors flex items-center justify-center"
            >
              <UserMinus size={20} />
            </button>
            
            <span className="text-2xl font-bold min-w-8 text-center">{guests.children}</span>
            
            <button
              onClick={() => updateGuests('children', 1)}
              disabled={guests.children >= 5}
              className="w-10 h-10 rounded-full border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors flex items-center justify-center"
            >
              <UserPlus size={20} />
            </button>
          </div>
        </div>
        
        {guests.children > 0 && (
          <div className="mt-4 space-y-3">
            {[...Array(guests.children)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <label className="text-sm font-medium">Child {index + 1} Age</label>
                <select className="px-3 py-1.5 border rounded-lg">
                  {Array.from({ length: 13 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} years old
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
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Bed size={20} />
              Rooms
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Maximum {maxRooms} rooms</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateGuests('rooms', -1)}
              disabled={guests.rooms <= 1}
              className="w-10 h-10 rounded-full border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors flex items-center justify-center"
            >
              <UserMinus size={20} />
            </button>
            
            <span className="text-2xl font-bold min-w-8 text-center">{guests.rooms}</span>
            
            <button
              onClick={() => updateGuests('rooms', 1)}
              disabled={guests.rooms >= Math.min(maxRooms, guests.adults)}
              className="w-10 h-10 rounded-full border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 transition-colors flex items-center justify-center"
            >
              <UserPlus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h4 className="font-bold text-lg mb-3">Booking Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Guests</span>
            <span className="font-bold">{guests.adults + guests.children}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Rooms</span>
            <span className="font-bold">{guests.rooms}</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex justify-between font-bold text-lg">
              <span>Occupancy</span>
              <span className="text-blue-600">
                ~{Math.ceil((guests.adults + guests.children) / guests.rooms)} per room
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;