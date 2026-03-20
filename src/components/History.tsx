import { useState } from "react";
import { Star, MapPin, Clock, XCircle, MessageSquare } from "lucide-react";

export function History() {
  // Mock data for now since we don't have real rides in Firestore yet
  const [rides, setRides] = useState([
    {
      id: "3",
      date: new Date().toISOString(),
      pickup: "Central Market, Obuasi",
      dropoff: "Train Station, Obuasi",
      fare: 12.50,
      status: "pending",
      driver: "Assigning driver...",
      rating: 0,
      rideType: "shared"
    },
    {
      id: "1",
      date: "2026-03-18T14:30:00Z",
      pickup: "Market Rd - Central, Obuasi",
      dropoff: "Obuasi Stadium",
      fare: 25.50,
      status: "completed",
      driver: "Kwame Mensah",
      rating: 0,
      rideType: "private"
    },
    {
      id: "2",
      date: "2026-03-15T09:15:00Z",
      pickup: "Anyinam, Obuasi",
      dropoff: "Market Rd - Central, Obuasi",
      fare: 18.00,
      status: "completed",
      driver: "Kofi Osei",
      rating: 5,
      rideType: "private"
    }
  ]);

  const [cancelModal, setCancelModal] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const [reviewModal, setReviewModal] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const confirmCancel = () => {
    if (cancelModal && cancelReason) {
      setRides(rides.map(r => r.id === cancelModal ? { ...r, status: "cancelled" } : r));
      setCancelModal(null);
      setCancelReason("");
    }
  };

  const submitReview = () => {
    if (reviewModal && reviewRating > 0) {
      setRides(rides.map(r => r.id === reviewModal ? { ...r, rating: reviewRating } : r));
      setReviewModal(null);
      setReviewRating(0);
      setReviewText("");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ride History</h2>
      
      <div className="space-y-4">
        {rides.map(ride => (
          <div key={ride.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <Clock size={14} /> {new Date(ride.date).toLocaleString()}
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs uppercase font-semibold">
                    {ride.rideType}
                  </span>
                </p>
                <p className="font-semibold text-gray-900">GH₵ {ride.fare.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                  ride.status === 'completed' ? 'bg-green-100 text-green-700' :
                  ride.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {ride.status}
                </span>
                {(ride.status === 'pending' || ride.status === 'accepted') && (
                  <button 
                    onClick={() => setCancelModal(ride.id)}
                    className="flex items-center gap-1 text-xs text-red-600 font-medium hover:text-red-700"
                  >
                    <XCircle size={14} /> Cancel Ride
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                  <MapPin size={12} />
                </div>
                <p className="text-sm text-gray-700">{ride.pickup}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                  <MapPin size={12} />
                </div>
                <p className="text-sm text-gray-700">{ride.dropoff}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">Driver: <span className="font-medium">{ride.driver}</span></p>
              
              {ride.status === 'completed' && (
                <div className="flex items-center gap-1">
                  {ride.rating > 0 ? (
                    <div className="flex items-center text-yellow-400">
                      <span className="text-sm text-gray-500 mr-2">You rated:</span>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < ride.rating ? 'fill-current' : 'text-gray-300'} />
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => setReviewModal(ride.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
                    >
                      <MessageSquare size={16} /> Leave a Review
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Modal */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cancel Ride</h3>
            <p className="text-gray-600 mb-4">Please let us know why you are cancelling this ride.</p>
            
            <div className="space-y-2 mb-6">
              {['Driver is taking too long', 'Driver asked me to cancel', 'Wrong pickup location', 'Changed my mind'].map(reason => (
                <label key={reason} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value={reason} 
                    checked={cancelReason === reason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => { setCancelModal(null); setCancelReason(""); }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Keep Ride
              </button>
              <button 
                onClick={confirmCancel}
                disabled={!cancelReason}
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rate Your Driver</h3>
            <p className="text-gray-600 mb-6">How was your ride experience?</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setReviewRating(star)}
                  className={`p-2 transition-transform hover:scale-110 ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-200'}`}
                >
                  <Star size={40} className={star <= reviewRating ? 'fill-current' : ''} />
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Leave a comment (optional)</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="The driver was very polite..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => { setReviewModal(null); setReviewRating(0); setReviewText(""); }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Skip
              </button>
              <button 
                onClick={submitReview}
                disabled={reviewRating === 0}
                className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
