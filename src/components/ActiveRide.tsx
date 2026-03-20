import { useState, useEffect } from "react";
import { MapPin, Phone, MessageCircle, XCircle, Users } from "lucide-react";

export function ActiveRide({ ride, onCancel, onComplete }: { ride: any, onCancel: () => void, onComplete: () => void }) {
  const [eta, setEta] = useState(ride.eta || 5);
  const [status, setStatus] = useState("Driver is on the way");

  // Demo speedup for real-time updates
  useEffect(() => {
    const demoTimer = setInterval(() => {
      setEta((prev: number) => {
        if (prev <= 1) {
          setStatus("Driver has arrived");
          clearInterval(demoTimer);
          setTimeout(onComplete, 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 2000); // Decrement every 2 seconds for demo purposes
    return () => clearInterval(demoTimer);
  }, [onComplete]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex-1">
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold uppercase tracking-wide mb-2 transition-all">
            {status}
          </div>
          <h2 className="text-5xl font-black text-gray-900 my-2">{eta} <span className="text-2xl text-gray-500 font-medium">min</span></h2>
          <p className="text-gray-500 font-medium">Estimated arrival</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
              <img src="https://picsum.photos/seed/driver/200/200" alt="Driver" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">{ride.driver?.name || "Kwame Mensah"}</h3>
              <p className="text-sm text-gray-600">{ride.driver?.rating || "4.8"} ★ • {ride.driver?.vehicle || "TVS King Deluxe"}</p>
              <div className="mt-1 inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-bold border border-yellow-200">
                {ride.driver?.plate || "AS-1234-24"}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <Phone size={18} /> Call
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <MessageCircle size={18} /> Message
            </button>
          </div>
        </div>

        {ride.rideType === 'shared' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3 shadow-sm">
            <Users className="text-blue-600 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm font-bold text-blue-900">Shared Ride Active</p>
              <p className="text-xs text-blue-700 mt-1">You are sharing this ride with 1 other passenger. Your dropoff is second.</p>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          <div className="relative flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-100 text-green-600 shadow-sm shrink-0 z-10">
              <MapPin size={16} />
            </div>
            <div className="flex-1 p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
              <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">Pickup</p>
              <p className="text-sm font-semibold text-gray-800 truncate">Current Location</p>
            </div>
          </div>
          <div className="relative flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-red-100 text-red-600 shadow-sm shrink-0 z-10">
              <MapPin size={16} />
            </div>
            <div className="flex-1 p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
              <p className="text-xs text-gray-500 font-medium uppercase mb-0.5">Dropoff</p>
              <p className="text-sm font-semibold text-gray-800 truncate">Destination</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button 
          onClick={onCancel}
          className="w-full py-3 flex items-center justify-center gap-2 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
        >
          <XCircle size={20} /> Cancel Ride
        </button>
      </div>
    </div>
  );
}
