import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Star,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  ChevronDown,
  Download,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedHotels, setSelectedHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('newest');

  // Sample hotel data - In real app, this would come from API
  const sampleHotels = [
    {
      id: 1,
      name: "Taj Mahal Palace",
      city: "Mumbai",
      rating: 4.8,
      reviews: 2450,
      price: 12000,
      discountPrice: 9999,
      status: "active",
      featured: true,
      bookings: 156,
      revenue: 1872000,
      lastUpdated: "2024-01-15",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    {
      id: 2,
      name: "The Oberoi",
      city: "New Delhi",
      rating: 4.7,
      reviews: 1890,
      price: 11000,
      discountPrice: 8999,
      status: "active",
      featured: true,
      bookings: 132,
      revenue: 1452000,
      lastUpdated: "2024-01-14",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
    },
    {
      id: 3,
      name: "ITC Grand Chola",
      city: "Chennai",
      rating: 4.6,
      reviews: 1670,
      price: 9500,
      discountPrice: 7999,
      status: "active",
      featured: false,
      bookings: 98,
      revenue: 931000,
      lastUpdated: "2024-01-13",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
    },
    {
      id: 4,
      name: "Leela Palace",
      city: "Bangalore",
      rating: 4.8,
      reviews: 2140,
      price: 10500,
      discountPrice: 8999,
      status: "active",
      featured: true,
      bookings: 145,
      revenue: 1522500,
      lastUpdated: "2024-01-12",
      image: "https://images.unsplash.com/photo-1564501049418-3c27787d01e8"
    },
    {
      id: 5,
      name: "JW Marriott",
      city: "Mumbai",
      rating: 4.5,
      reviews: 1890,
      price: 8500,
      discountPrice: 6999,
      status: "inactive",
      featured: false,
      bookings: 87,
      revenue: 739500,
      lastUpdated: "2024-01-11",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
    },
    {
      id: 6,
      name: "Hyatt Regency",
      city: "Delhi",
      rating: 4.4,
      reviews: 1560,
      price: 8000,
      discountPrice: 6499,
      status: "active",
      featured: false,
      bookings: 76,
      revenue: 608000,
      lastUpdated: "2024-01-10",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
    },
    {
      id: 7,
      name: "Radisson Blu",
      city: "Kolkata",
      rating: 4.3,
      reviews: 1340,
      price: 7500,
      discountPrice: 5999,
      status: "active",
      featured: false,
      bookings: 65,
      revenue: 487500,
      lastUpdated: "2024-01-09",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
    },
    {
      id: 8,
      name: "Novotel",
      city: "Goa",
      rating: 4.2,
      reviews: 1210,
      price: 7000,
      discountPrice: 5499,
      status: "coming_soon",
      featured: false,
      bookings: 0,
      revenue: 0,
      lastUpdated: "2024-01-08",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHotels(sampleHotels);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    // Search filter
    const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(search.toLowerCase());
    
    // Status filter
    const matchesStatus = filter === 'all' || hotel.status === filter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort hotels
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'bookings':
        return b.bookings - a.bookings;
      case 'revenue':
        return b.revenue - a.revenue;
      default: // newest
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = sortedHotels.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedHotels.length / itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedHotels(currentHotels.map(hotel => hotel.id));
    } else {
      setSelectedHotels([]);
    }
  };

  const handleSelectHotel = (hotelId) => {
    if (selectedHotels.includes(hotelId)) {
      setSelectedHotels(selectedHotels.filter(id => id !== hotelId));
    } else {
      setSelectedHotels([...selectedHotels, hotelId]);
    }
  };

  const handleDelete = (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      setHotels(hotels.filter(hotel => hotel.id !== hotelId));
      setSelectedHotels(selectedHotels.filter(id => id !== hotelId));
    }
  };

  const handleStatusChange = (hotelId, newStatus) => {
    setHotels(hotels.map(hotel => 
      hotel.id === hotelId ? { ...hotel, status: newStatus } : hotel
    ));
  };

  const handleBulkAction = (action) => {
    if (selectedHotels.length === 0) {
      alert('Please select at least one hotel');
      return;
    }

    switch (action) {
      case 'delete':
        if (window.confirm(`Delete ${selectedHotels.length} selected hotels?`)) {
          setHotels(hotels.filter(hotel => !selectedHotels.includes(hotel.id)));
          setSelectedHotels([]);
        }
        break;
      case 'activate':
        setHotels(hotels.map(hotel => 
          selectedHotels.includes(hotel.id) ? { ...hotel, status: 'active' } : hotel
        ));
        break;
      case 'deactivate':
        setHotels(hotels.map(hotel => 
          selectedHotels.includes(hotel.id) ? { ...hotel, status: 'inactive' } : hotel
        ));
        break;
      case 'feature':
        setHotels(hotels.map(hotel => 
          selectedHotels.includes(hotel.id) ? { ...hotel, featured: true } : hotel
        ));
        break;
      case 'unfeature':
        setHotels(hotels.map(hotel => 
          selectedHotels.includes(hotel.id) ? { ...hotel, featured: false } : hotel
        ));
        break;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'coming_soon': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'under_renovation': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle size={14} />;
      case 'inactive': return <XCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hotels Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all hotels in your system</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/add-hotel')}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            + Add New Hotel
          </button>
          
          <button className="p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{hotels.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Hotels</div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
          <div className="text-sm text-green-600 dark:text-green-400 mt-2">
            +12% from last month
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {hotels.filter(h => h.status === 'active').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Active Hotels</div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {hotels.filter(h => h.featured).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Featured</div>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Star className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{(hotels.reduce((sum, hotel) => sum + hotel.revenue, 0) / 100000).toFixed(1)}L
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total Revenue</div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <DollarSign className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search hotels by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="coming_soon">Coming Soon</option>
              <option value="under_renovation">Under Renovation</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800"
            >
              <option value="newest">Newest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="rating">Highest Rated</option>
              <option value="bookings">Most Bookings</option>
              <option value="revenue">Highest Revenue</option>
            </select>
            
            <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl flex items-center gap-2">
              <Filter size={18} />
              More Filters
            </button>
            
            <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl flex items-center gap-2">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedHotels.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex flex-wrap items-center gap-4">
              <div className="font-medium text-blue-700 dark:text-blue-300">
                {selectedHotels.length} hotel(s) selected
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction('feature')}
                  className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50"
                >
                  Feature
                </button>
                <button
                  onClick={() => handleBulkAction('unfeature')}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Unfeature
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hotels Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedHotels.length === currentHotels.length && currentHotels.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="py-3 px-4 text-left">Hotel</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Bookings</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Featured</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentHotels.map((hotel) => (
                <tr 
                  key={hotel.id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    selectedHotels.includes(hotel.id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedHotels.includes(hotel.id)}
                      onChange={() => handleSelectHotel(hotel.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{hotel.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          ID: {hotel.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{hotel.city}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <Star size={14} className="text-gray-300" />
                      </div>
                      <span className="font-bold">{hotel.rating}</span>
                      <span className="text-sm text-gray-500">({hotel.reviews})</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">₹{hotel.discountPrice || hotel.price}</span>
                      {hotel.discountPrice && (
                        <>
                          <span className="text-sm text-gray-500 line-through">₹{hotel.price}</span>
                          <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                            {Math.round((1 - hotel.discountPrice/hotel.price) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="font-medium">{hotel.bookings}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ₹{(hotel.revenue / 100000).toFixed(1)}L revenue
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(hotel.status)}`}>
                      {getStatusIcon(hotel.status)}
                      <span className="capitalize">{hotel.status.replace('_', ' ')}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    {hotel.featured ? (
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full text-sm">
                        <Star size={12} />
                        <span>Featured</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/hotel/${hotel.id}`)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        title="View"
                      >
                        <Eye size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                      
                      <button
                        onClick={() => navigate(`/admin/add-hotel?id=${hotel.id}`)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        title="Edit"
                      >
                        <Edit2 size={16} className="text-blue-600" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(hotel.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                      
                      <div className="relative">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <MoreVertical size={16} />
                        </button>
                        
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleStatusChange(hotel.id, 'active')}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              Mark as Active
                            </button>
                            <button
                              onClick={() => handleStatusChange(hotel.id, 'inactive')}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              Mark as Inactive
                            </button>
                            <button
                              onClick={() => navigate(`/admin/hotels/${hotel.id}/analytics`)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              View Analytics
                            </button>
                            <button
                              onClick={() => navigate(`/admin/hotels/${hotel.id}/reviews`)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              View Reviews
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {currentHotels.length === 0 && (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <Search size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">No hotels found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {search ? 'Try adjusting your search or filters' : 'Get started by adding your first hotel'}
            </p>
            {search ? (
              <button
                onClick={() => {
                  setSearch('');
                  setFilter('all');
                }}
                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={() => navigate('/admin/add-hotel')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium"
              >
                + Add New Hotel
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {currentHotels.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedHotels.length)} of {sortedHotels.length} hotels
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 border rounded-lg"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="font-bold mb-4">Top Performing Hotels</h3>
          <div className="space-y-3">
            {hotels
              .sort((a, b) => b.bookings - a.bookings)
              .slice(0, 3)
              .map((hotel, index) => (
                <div key={hotel.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <div className="font-medium">{hotel.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{hotel.bookings} bookings</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-bold">+{Math.round((hotel.bookings / hotels.reduce((sum, h) => sum + h.bookings, 0)) * 100)}%</div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="font-bold mb-4">Status Distribution</h3>
          <div className="space-y-4">
            {[
              { status: 'active', label: 'Active', count: hotels.filter(h => h.status === 'active').length, color: 'bg-green-500' },
              { status: 'inactive', label: 'Inactive', count: hotels.filter(h => h.status === 'inactive').length, color: 'bg-red-500' },
              { status: 'coming_soon', label: 'Coming Soon', count: hotels.filter(h => h.status === 'coming_soon').length, color: 'bg-blue-500' }
            ].map(item => (
              <div key={item.status}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.count} ({Math.round((item.count / hotels.length) * 100)}%)</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color}`}
                    style={{ width: `${(item.count / hotels.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/add-hotel')}
              className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              + Add New Hotel
            </button>
            <button
              onClick={() => handleBulkAction('feature')}
              className="w-full p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30"
            >
              Feature Selected
            </button>
            <button
              onClick={() => navigate('/admin/analytics')}
              className="w-full p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              View Analytics
            </button>
            <button
              onClick={() => window.print()}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;