import { useState } from "react";
import { Facebook, Twitter, Mail, Apple, CheckCircle2 } from "lucide-react";

export function Profile() {
  const [linked, setLinked] = useState({
    facebook: true,
    twitter: false,
    google: true,
    apple: false
  });

  const handleLink = (platform: keyof typeof linked) => {
    setLinked(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Linked Accounts</h2>
      <p className="text-gray-600 mb-8">Link your social media accounts to easily log in and share your ride status with friends.</p>

      <div className="space-y-4">
        {/* Facebook */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Facebook size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Facebook</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {linked.facebook && <CheckCircle2 size={14} className="text-green-500" />}
                {linked.facebook ? 'Connected' : 'Not connected'}
              </div>
            </div>
          </div>
          <button onClick={() => handleLink('facebook')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linked.facebook ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            {linked.facebook ? 'Disconnect' : 'Connect'}
          </button>
        </div>
        
        {/* Twitter */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center">
              <Twitter size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Twitter / X</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {linked.twitter && <CheckCircle2 size={14} className="text-green-500" />}
                {linked.twitter ? 'Connected' : 'Not connected'}
              </div>
            </div>
          </div>
          <button onClick={() => handleLink('twitter')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linked.twitter ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-sky-500 text-white hover:bg-sky-600'}`}>
            {linked.twitter ? 'Disconnect' : 'Connect'}
          </button>
        </div>

        {/* Google */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Google</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {linked.google && <CheckCircle2 size={14} className="text-green-500" />}
                {linked.google ? 'Connected' : 'Not connected'}
              </div>
            </div>
          </div>
          <button onClick={() => handleLink('google')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linked.google ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-red-500 text-white hover:bg-red-600'}`}>
            {linked.google ? 'Disconnect' : 'Connect'}
          </button>
        </div>

        {/* Apple */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center">
              <Apple size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Apple</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {linked.apple && <CheckCircle2 size={14} className="text-green-500" />}
                {linked.apple ? 'Connected' : 'Not connected'}
              </div>
            </div>
          </div>
          <button onClick={() => handleLink('apple')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${linked.apple ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-white hover:bg-gray-900'}`}>
            {linked.apple ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
}
