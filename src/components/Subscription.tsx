import { Check, Star } from "lucide-react";

export function Subscription() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upgrade to Premium</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Get exclusive benefits, priority bookings, and discounted fares with our premium subscription plans.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic</h3>
          <p className="text-gray-500 mb-6">Pay as you go</p>
          <div className="text-4xl font-bold text-gray-900 mb-6">Free</div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-gray-600"><Check size={20} className="text-green-500" /> Standard booking</li>
            <li className="flex items-center gap-3 text-gray-600"><Check size={20} className="text-green-500" /> Real-time tracking</li>
            <li className="flex items-center gap-3 text-gray-600"><Check size={20} className="text-green-500" /> Mobile money payments</li>
          </ul>
          <button className="w-full py-3 px-4 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 transition-colors">Current Plan</button>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Star className="text-yellow-400 fill-current" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Premium</h3>
          <p className="text-green-100 mb-6">For frequent riders</p>
          <div className="text-4xl font-bold mb-6">GH₵ 50<span className="text-lg font-normal text-green-200">/month</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-green-50"><Check size={20} className="text-yellow-400" /> Priority booking (skip the queue)</li>
            <li className="flex items-center gap-3 text-green-50"><Check size={20} className="text-yellow-400" /> 10% off all rides</li>
            <li className="flex items-center gap-3 text-green-50"><Check size={20} className="text-yellow-400" /> Free cancellations</li>
            <li className="flex items-center gap-3 text-green-50"><Check size={20} className="text-yellow-400" /> Exclusive premium rickshaws</li>
          </ul>
          <button className="w-full py-3 px-4 bg-yellow-400 text-green-900 font-bold rounded-xl hover:bg-yellow-500 transition-colors shadow-md">Upgrade Now</button>
        </div>
      </div>
    </div>
  );
}
