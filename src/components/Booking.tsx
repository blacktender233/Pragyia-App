import { useState } from "react";
import { Clock, MapPin, Calendar, Users, User, Wallet, Smartphone, Building2 } from "lucide-react";

export function Booking({ pickup, dropoff, routeInfo, onBook }: { pickup: any, dropoff: any, routeInfo: any, onBook: (details: any) => void }) {
  const [scheduled, setScheduled] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("MTN MoMo");
  const [rideType, setRideType] = useState<'private' | 'shared'>('private');

  let estimatedFare = 0;
  let distanceKm = 0;
  let durationMins = 0;

  if (routeInfo) {
    distanceKm = routeInfo.distanceMeters / 1000;
    durationMins = Math.round(routeInfo.durationMillis / 60000);
    const baseFare = 5.0;
    const perKm = 2.5;
    estimatedFare = baseFare + (distanceKm * perKm);
    if (rideType === 'shared') {
      estimatedFare *= 0.6; // 40% discount for shared rides
    }
  }

  const handleBooking = () => {
    onBook({
      pickup,
      dropoff,
      scheduledTime: scheduled ? `${date}T${time}` : null,
      paymentMethod,
      rideType,
      estimatedFare
    });
  };

  const paymentOptions = [
    { id: 'momo', name: 'MTN MoMo', icon: Smartphone, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { id: 'telecel', name: 'Telecel Cash', icon: Smartphone, color: 'text-red-600', bg: 'bg-red-100' },
    { id: 'atmoney', name: 'AT Money', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'ghlink', name: 'Gh-Link', icon: Wallet, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'tingg', name: 'Tingg', icon: Wallet, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'bank', name: 'Online Banking', icon: Building2, color: 'text-gray-600', bg: 'bg-gray-100' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Book a Rickshaw</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Pickup Location</p>
            <p className="text-sm font-semibold text-gray-800">
              {pickup ? `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}` : "Select on map"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Dropoff Location</p>
            <p className="text-sm font-semibold text-gray-800">
              {dropoff ? `${dropoff.lat.toFixed(4)}, ${dropoff.lng.toFixed(4)}` : "Select on map"}
            </p>
          </div>
        </div>
      </div>

      {routeInfo && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-green-800 font-medium">Estimated Fare</span>
            <span className="text-xl font-bold text-green-700">GH₵ {estimatedFare.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-green-600">
            <span>Distance: {distanceKm.toFixed(1)} km</span>
            <span>Est. Time: {durationMins} mins</span>
          </div>
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Ride Type</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setRideType('private')}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${rideType === 'private' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            <User size={20} className="mb-1" />
            <span className="text-sm font-medium">Private</span>
          </button>
          <button
            onClick={() => setRideType('shared')}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${rideType === 'shared' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={20} className="mb-1" />
            <span className="text-sm font-medium">Shared (Save 40%)</span>
          </button>
        </div>
        {rideType === 'shared' && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2">
            <Users className="text-blue-500 shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-blue-800">
              <strong>Shared Ride:</strong> You may share the rickshaw with up to 2 other passengers along the route. Your trip may take 5-10 minutes longer.
            </p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={scheduled} 
            onChange={(e) => setScheduled(e.target.checked)}
            className="rounded text-green-600 focus:ring-green-500"
          />
          <Calendar size={16} className="text-gray-500" /> Schedule for later
        </label>

        {scheduled && (
          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Time</label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-2 border rounded-md text-sm" />
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Payment Method</p>
        <div className="grid grid-cols-2 gap-3">
          {paymentOptions.map(method => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.name)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${paymentMethod === method.name ? 'bg-green-50 border-green-500 ring-1 ring-green-500' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${method.bg} ${method.color}`}>
                <method.icon size={16} />
              </div>
              <span className={`text-sm font-medium text-left ${paymentMethod === method.name ? 'text-green-800' : 'text-gray-700'}`}>
                {method.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleBooking}
        disabled={!pickup || !dropoff}
        className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {scheduled ? "Confirm Appointment" : "Request Ride Now"}
      </button>
    </div>
  );
}
