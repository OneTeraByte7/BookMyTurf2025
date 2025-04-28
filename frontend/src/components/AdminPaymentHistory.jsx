import React from 'react';

const PaymentHistory = () => {
  const payments = [
    { date: '2025-04-15', amount: 50, status: 'Completed' },
    { date: '2025-04-10', amount: 30, status: 'Completed' },
    { date: '2025-04-05', amount: 20, status: 'Pending' },
  ];

  return (
    <div className="h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f3813] p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-400">Admin Panel</h2>
          <nav className="space-y-3 text-[15px]">
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              My Turf
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Payment History
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Booking History
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              Host Event
            </button>
            <button className="flex items-center gap-3 w-full text-left text-white hover:text-green-300 transition">
              AI Bot
            </button>
          </nav>
        </div>
        <div className="space-y-3">
          <button className="flex items-center gap-3 text-blue-400 hover:text-blue-500 transition">
            View Profile
          </button>
          <button className="flex items-center gap-3 text-red-400 hover:text-red-600 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 bg-black text-white">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">Payment History</h2>
        <div className="mt-4 bg-[#1a1a1a] p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-green-400 text-sm uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-green-400 text-sm uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-green-400 text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="px-6 py-4">{payment.date}</td>
                  <td className="px-6 py-4">${payment.amount}</td>
                  <td className="px-6 py-4">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PaymentHistory;
