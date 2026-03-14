import React from "react";

const PaymentPage = () => {
  // List of payment methods
  const paymentMethods = [
    "Google Pay",
    "Debit Card",
    "Paytm",
    "UPI",
    "Credit Card"
  ];

  // Random turf names to display
  const turfNames = [
    "Green Field",
    "Royal Turf",
    "Sunshine Stadium",
    "Victory Ground",
    "Elite Arena"
  ];

  const getRandomTurfName = () => {
    const randomIndex = Math.floor(Math.random() * turfNames.length);
    return turfNames[randomIndex];
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Your Bookings & Payment will appear here</h2>

      {/* Randomly display payment info for a turf */}
      <div className="bg-green-900 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-green-300">{getRandomTurfName()}</h3>
        <p>📅 Date: 2025-04-21</p>
        <p>⏰ Time: 6:00 PM - 8:00 PM</p>
        <p>💰 Amount: ₹500</p>

        {/* Payment Options */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-green-300">Choose Payment Method:</h4>
          <div className="space-x-4">
            {paymentMethods.map((method, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded"
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* For Google Pay - Example QR Code */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-green-300">Google Pay QR:</h4>
          <img
            src="https://www.gstatic.com/android/market_images/web/gp_icon_128x128.png" 
            alt="Google Pay QR"
            className="w-24 h-24 mt-2"
          />
        </div>

        {/* Payment Button */}
        <button className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
