import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Bed, Shield, CheckCircle } from 'lucide-react';
import DateRangePicker from './DateRangePicker';
import GuestSelector from './GuestSelector';
import RoomSelector from './GuestSelector';

const BookingModal = ({ hotel, isOpen, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 86400000),
    guests: { adults: 2, children: 0, rooms: 1 },
    roomType: '',
    specialRequests: ''
  });

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [nights, setNights] = useState(1);

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const diff = Math.ceil((bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24));
      setNights(diff > 0 ? diff : 1);
    }
  }, [bookingData.checkIn, bookingData.checkOut]);

  const calculatePrice = () => {
    if (!selectedRoom) return 0;
    const roomPrice = selectedRoom.price * nights;
    const tax = roomPrice * 0.18;
    const serviceCharge = roomPrice * 0.05;
    return {
      roomPrice,
      tax,
      serviceCharge,
      total: roomPrice + tax + serviceCharge
    };
  };

  const priceDetails = calculatePrice();

  const steps = [
    { id: 1, title: 'Dates', icon: <Calendar size={20} /> },
    { id: 2, title: 'Guests & Rooms', icon: <Users size={20} /> },
    { id: 3, title: 'Room Type', icon: <Bed size={20} /> },
    { id: 4, title: 'Confirm', icon: <CheckCircle size={20} /> }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Book {hotel.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{hotel.city}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mt-6">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= s.id 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}>
                    {step > s.id ? <CheckCircle size={20} /> : s.icon}
                  </div>
                  <span className={`ml-2 font-medium ${
                    step >= s.id ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                  }`}>
                    {s.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 ${
                      step > s.id ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Dates</h3>
                <DateRangePicker
                  checkIn={bookingData.checkIn}
                  checkOut={bookingData.checkOut}
                  onChange={(dates) => setBookingData({...bookingData, ...dates})}
                />
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Flexible Booking:</strong> Free cancellation up to 48 hours before check-in
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Guests & Rooms</h3>
                <GuestSelector
                  guests={bookingData.guests}
                  onChange={(guests) => setBookingData({...bookingData, guests})}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Room Type</h3>
                <RoomSelector
                  rooms={hotel.roomTypes}
                  selectedRoom={selectedRoom}
                  onSelect={setSelectedRoom}
                  nights={nights}
                />
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-bold">{hotel.name}</h4>
                      <p className="text-sm text-gray-600">{selectedRoom?.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{priceDetails.roomPrice}</p>
                      <p className="text-sm text-gray-600">{nights} night(s)</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Room Price</span>
                      <span>₹{priceDetails.roomPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes (18%)</span>
                      <span>₹{priceDetails.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Charge</span>
                      <span>₹{priceDetails.serviceCharge.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-blue-600">₹{priceDetails.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-green-600" />
                <span className="text-sm">Secure Booking · Best Price Guaranteed</span>
              </div>
              
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2.5 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (step < 4) {
                      setStep(step + 1);
                    } else {
                      onConfirm({
                        ...bookingData,
                        roomType: selectedRoom.type,
                        totalPrice: priceDetails.total
                      });
                    }
                  }}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold shadow-lg transition-all"
                  disabled={step === 3 && !selectedRoom}
                >
                  {step === 4 ? 'Confirm & Pay' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;