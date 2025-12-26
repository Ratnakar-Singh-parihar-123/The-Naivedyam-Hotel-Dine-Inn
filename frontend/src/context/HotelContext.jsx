// context/HotelContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HotelContext = createContext();

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Sample hotel data - replace with API call
  const sampleHotels = [
    {
      id: 1,
      name: "LuxeStay Grand",
      location: "Mumbai, India",
      rating: 4.9,
      reviews: 1245,
      price: 15999,
      originalPrice: 19999,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      description: "Luxury 5-star hotel with panoramic city views and world-class amenities",
      amenities: ["wifi", "pool", "spa", "gym", "parking", "breakfast"],
      category: "luxury",
      featured: true,
      availableRooms: 12,
      totalRooms: 150,
      tags: ["5-Star", "City View", "Luxury", "Spa"]
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Goa, India",
      rating: 4.8,
      reviews: 856,
      price: 12999,
      originalPrice: 14999,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      description: "Beachfront resort with private beach access",
      amenities: ["wifi", "pool", "beach", "gym", "restaurant"],
      category: "resort",
      featured: true,
      availableRooms: 8,
      totalRooms: 120,
      tags: ["Beach", "Resort", "Luxury", "Family"]
    },
    {
      id: 3,
      name: "Mountain Retreat",
      location: "Shimla, India",
      rating: 4.7,
      reviews: 623,
      price: 9999,
      originalPrice: 12999,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      description: "Cozy mountain resort with scenic views",
      amenities: ["wifi", "fireplace", "spa", "restaurant"],
      category: "mountain",
      featured: false,
      availableRooms: 15,
      totalRooms: 80,
      tags: ["Mountain", "Scenic", "Cozy", "Romantic"]
    }
  ];

  useEffect(() => {
    // Fetch hotels from API
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setIsLoading(true);
    try {
      // In production, replace with actual API call
      // const response = await axios.get('/api/hotels');
      // setHotels(response.data);
      
      // For now, use sample data
      setTimeout(() => {
        setHotels(sampleHotels);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Failed to load hotels');
      setIsLoading(false);
    }
  };

  const getHotelById = (id) => {
    return hotels.find(hotel => hotel.id === parseInt(id));
  };

  const searchHotels = async (filters) => {
    setIsLoading(true);
    try {
      // In production, implement actual search
      // const response = await axios.post('/api/hotels/search', filters);
      // return response.data;
      
      let filtered = [...sampleHotels];
      
      if (filters.location) {
        filtered = filtered.filter(h => 
          h.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(h => h.category === filters.category);
      }
      
      if (filters.minPrice) {
        filtered = filtered.filter(h => h.price >= filters.minPrice);
      }
      
      if (filters.maxPrice) {
        filtered = filtered.filter(h => h.price <= filters.maxPrice);
      }
      
      if (filters.rating > 0) {
        filtered = filtered.filter(h => h.rating >= filters.rating);
      }
      
      setTimeout(() => {
        setIsLoading(false);
        return filtered;
      }, 300);
      
      return filtered;
    } catch (error) {
      console.error('Error searching hotels:', error);
      toast.error('Search failed');
      setIsLoading(false);
      return [];
    }
  };

  const bookHotel = async (hotelId, bookingData) => {
    try {
      // In production, replace with actual API call
      // const response = await axios.post('/api/bookings', { hotelId, ...bookingData });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Booking confirmed successfully!');
      navigate('/my-bookings');
      return { success: true, bookingId: `BKG${Date.now()}` };
    } catch (error) {
      console.error('Error booking hotel:', error);
      toast.error('Booking failed');
      return { success: false };
    }
  };

  return (
    <HotelContext.Provider
      value={{
        hotels,
        selectedHotel,
        setSelectedHotel,
        isLoading,
        getHotelById,
        searchHotels,
        bookHotel,
        fetchHotels
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};