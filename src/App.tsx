import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Sidebar } from './components/Sidebar';
import { Map } from './components/Map';
import { Booking } from './components/Booking';
import { Chatbot } from './components/Chatbot';
import { VideoGen } from './components/VideoGen';
import { Subscription } from './components/Subscription';
import { Referral } from './components/Referral';
import { Auth } from './components/Auth';
import { History } from './components/History';
import { DriverProfile } from './components/DriverProfile';
import { Refunds } from './components/Refunds';
import { Profile } from './components/Profile';
import { ActiveRide } from './components/ActiveRide';
import { WelcomeScreen } from './components/WelcomeScreen';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('map');
  const [pickup, setPickup] = useState<any>(null);
  const [dropoff, setDropoff] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState<any>(null);
  const [selecting, setSelecting] = useState<'pickup' | 'dropoff'>('pickup');
  const [activeRide, setActiveRide] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLocationSelect = (loc: any) => {
    if (selecting === 'pickup') {
      setPickup(loc);
      setSelecting('dropoff');
    } else {
      setDropoff(loc);
      setSelecting('pickup');
    }
  };

  const handleBook = (details: any) => {
    setActiveRide({
      ...details,
      eta: 5,
      driver: { name: "Kwame Mensah", rating: 4.8, vehicle: "TVS King Deluxe", plate: "AS-1234-24" }
    });
  };

  const handleCancelRide = () => {
    setActiveRide(null);
    setPickup(null);
    setDropoff(null);
    setSelecting('pickup');
  };

  const handleRideComplete = () => {
    setActiveRide(null);
    setPickup(null);
    setDropoff(null);
    setSelecting('pickup');
    setActiveTab('history');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {user && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}
      
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {user && (
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
            <div className="ml-12 md:ml-0">
              <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
                {activeTab === 'map' && 'Book a Ride'}
                {activeTab === 'history' && 'Ride History'}
                {activeTab === 'driver' && 'Driver Profile'}
                {activeTab === 'refund' && 'Refunds'}
                {activeTab === 'profile' && 'Linked Accounts'}
                {activeTab === 'video' && 'Animate Experience'}
                {activeTab === 'chat' && 'Customer Service'}
                {activeTab === 'premium' && 'Premium Subscription'}
                {activeTab === 'referral' && 'Refer a Friend'}
              </h2>
            </div>
            <Auth user={user} />
          </header>
        )}

        <div className="flex-1 overflow-y-auto relative">
          {!user ? (
            <WelcomeScreen />
          ) : (
            <>
              {activeTab === 'map' && (
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="flex-1 relative h-[50vh] lg:h-full">
                    <Map pickup={pickup} dropoff={dropoff} onLocationSelect={handleLocationSelect} onRouteCalculated={setRouteInfo} />
                    <div className="absolute top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-96 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-10 flex gap-2">
                      <button 
                        onClick={() => setSelecting('pickup')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${selecting === 'pickup' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        Set Pickup
                      </button>
                      <button 
                        onClick={() => setSelecting('dropoff')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${selecting === 'dropoff' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        Set Dropoff
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-y-auto h-[50vh] lg:h-full shrink-0">
                    {activeRide ? (
                      <ActiveRide ride={activeRide} onCancel={handleCancelRide} onComplete={handleRideComplete} />
                    ) : (
                      <Booking pickup={pickup} dropoff={dropoff} routeInfo={routeInfo} onBook={handleBook} />
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="h-full overflow-y-auto">
                  <History />
                </div>
              )}

              {activeTab === 'driver' && (
                <div className="h-full overflow-y-auto">
                  <DriverProfile />
                </div>
              )}

              {activeTab === 'refund' && (
                <div className="h-full overflow-y-auto">
                  <Refunds />
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="h-full overflow-y-auto">
                  <Profile />
                </div>
              )}

              {activeTab === 'video' && (
                <div className="p-4 md:p-8 max-w-4xl mx-auto h-full overflow-y-auto">
                  <VideoGen />
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="p-4 md:p-8 max-w-4xl mx-auto h-full">
                  <Chatbot />
                </div>
              )}

              {activeTab === 'premium' && (
                <div className="h-full overflow-y-auto">
                  <Subscription />
                </div>
              )}

              {activeTab === 'referral' && (
                <div className="h-full overflow-y-auto flex items-center justify-center">
                  <Referral />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
