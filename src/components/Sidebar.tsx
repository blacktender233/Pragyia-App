import { Map as MapIcon, Video, MessageSquare, Star, Share2, Menu, X, Clock, User, RefreshCcw, UserCircle, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'map', label: 'Book Ride', icon: MapIcon },
    { id: 'history', label: 'Ride History', icon: Clock },
    { id: 'driver', label: 'Driver Profile', icon: User },
    { id: 'refund', label: 'Refunds', icon: RefreshCcw },
    { id: 'profile', label: 'Linked Accounts', icon: UserCircle },
    { id: 'video', label: 'Animate Experience', icon: Video },
    { id: 'chat', label: 'Customer Service', icon: MessageSquare },
    { id: 'premium', label: 'Premium Subscription', icon: Star },
    { id: 'referral', label: 'Refer a Friend', icon: Share2 },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-800"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-xl shadow-sm shrink-0">
            O
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">OSAAT</h1>
            <p className="text-[10px] text-gray-500 italic font-medium">One Step At A Time</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? 'text-green-600' : 'text-gray-400'} />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="mb-4 space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Contact Support</p>
            <a href="tel:0501731966" className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600 transition-colors font-medium">
              <Phone size={16} className="text-green-600" />
              0501731966
            </a>
            <a href="https://wa.me/233501731966" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600 transition-colors font-medium">
              <MessageCircle size={16} className="text-green-600" />
              WhatsApp Us
            </a>
          </div>
          <p className="text-xs text-center text-gray-400">© 2026 OSAAT Rides<br/>Obuasi, Ashanti Region</p>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
