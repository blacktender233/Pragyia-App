import { Star, Shield, Car, Award } from "lucide-react";

export function DriverProfile() {
  // Mock data for driver profile
  const driver = {
    name: "Kwame Mensah",
    rating: 4.8,
    trips: 1240,
    joined: "2024",
    vehicle: "TVS King Deluxe",
    plate: "AS-1234-24",
    reviews: [
      { id: 1, text: "Very professional and arrived on time.", rating: 5, author: "Ama O." },
      { id: 2, text: "Smooth ride, clean rickshaw.", rating: 5, author: "John D." },
      { id: 3, text: "Good driver, knows the shortcuts in Obuasi.", rating: 4, author: "Emmanuel K." }
    ]
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="h-32 bg-green-600"></div>
        <div className="px-8 pb-8 relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white absolute -top-12 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/seed/driver/200/200" alt="Driver" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="pt-16 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{driver.name}</h2>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Shield size={16} className="text-green-600" /> Verified Driver
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                <Star className="text-yellow-400 fill-current" size={24} /> {driver.rating}
              </div>
              <p className="text-sm text-gray-500">{driver.trips} trips</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
              <Car className="text-gray-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase font-semibold">Vehicle</p>
              <p className="font-medium text-gray-900 text-center">{driver.vehicle}</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
              <Award className="text-gray-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase font-semibold">Plate</p>
              <p className="font-medium text-gray-900 text-center">{driver.plate}</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
              <Star className="text-gray-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase font-semibold">Rating</p>
              <p className="font-medium text-gray-900 text-center">{driver.rating} / 5.0</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
              <Shield className="text-gray-400 mb-2" size={24} />
              <p className="text-xs text-gray-500 uppercase font-semibold">Joined</p>
              <p className="font-medium text-gray-900 text-center">{driver.joined}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Reviews</h3>
      <div className="space-y-4">
        {driver.reviews.map(review => (
          <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-gray-900">{review.author}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? 'fill-current' : 'text-gray-300'} />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
