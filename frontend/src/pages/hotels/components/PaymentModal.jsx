import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Wallet, Shield, Lock, CheckCircle } from 'lucide-react';

const PaymentModal = ({ amount, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Show success for 2 seconds then close
      setTimeout(() => {
        onSuccess(paymentMethod);
        onClose();
      }, 2000);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard />, color: 'text-blue-600' },
    { id: 'upi', name: 'UPI', icon: <Smartphone />, color: 'text-purple-600' },
    { id: 'netbanking', name: 'Net Banking', icon: <Wallet />, color: 'text-green-600' },
    { id: 'wallet', name: 'Wallet', icon: <Wallet />, color: 'text-amber-600' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Complete Payment</h2>
              <p className="text-gray-600 dark:text-gray-400">Total: ₹{amount.toFixed(2)}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {!success ? (
          <div className="p-6">
            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <div className={`text-2xl mb-2 ${method.color}`}>
                      {method.icon}
                    </div>
                    <div className="font-medium">{method.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({
                          ...cardDetails,
                          number: formatCardNumber(e.target.value)
                        })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length > 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          setCardDetails({...cardDetails, expiry: value});
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({
                            ...cardDetails, 
                            cvv: e.target.value.replace(/\D/g, '').substring(0, 3)
                          })}
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-700 dark:text-blue-300">
                        Secure Payment
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Your payment is secured with 256-bit SSL encryption
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ₹${amount.toFixed(2)}`
                  )}
                </button>
              </form>
            )}

            {paymentMethod === 'upi' && (
              <div className="text-center py-8">
                <div className="w-32 h-32 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                  <Smartphone size={48} className="text-blue-600" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Scan QR code or enter UPI ID
                </p>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold"
                >
                  Pay with UPI
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-32 h-32 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={64} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Payment Successful!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your booking has been confirmed. Redirecting...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;