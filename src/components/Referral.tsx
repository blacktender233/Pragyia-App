import { Share2, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function Referral() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://ghanarickshaw.com/invite/RIDE2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=Get a free ride on Ghana Rickshaw! Use my link: ${referralLink}`, '_blank');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Share2 size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Invite Friends, Get Free Rides</h2>
        <p className="text-gray-600 mb-8">Share your unique link. When a friend signs up and takes their first ride, you both get GH₵ 10 off your next trip!</p>

        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-200 mb-6">
          <input 
            type="text" 
            readOnly 
            value={referralLink} 
            className="flex-1 bg-transparent px-4 text-gray-600 outline-none"
          />
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <button 
          onClick={handleShareWhatsApp}
          className="w-full py-3 px-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          Share on WhatsApp
        </button>
      </div>
    </div>
  );
}
