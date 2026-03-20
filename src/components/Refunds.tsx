import { useState } from "react";
import { AlertCircle, CheckCircle2, RefreshCcw } from "lucide-react";

export function Refunds() {
  const [refundStatus, setRefundStatus] = useState<'none' | 'requested' | 'processed'>('none');
  const [reason, setReason] = useState('');

  const handleRequestRefund = () => {
    if (!reason) return;
    setRefundStatus('requested');
    // In a real app, this would update Firestore
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCcw size={32} className="text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Refund</h2>
        <p className="text-gray-600">If you had an issue with your recent ride, you can request a refund here.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Ride: March 18, 2026</h3>
        
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Fare Charged</span>
            <span className="font-bold text-gray-900">GH₵ 25.50</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Payment Method</span>
            <span className="font-medium text-gray-700">MTN MoMo</span>
          </div>
        </div>

        {refundStatus === 'none' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Refund</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please explain why you are requesting a refund..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={4}
              />
            </div>
            <button
              onClick={handleRequestRefund}
              disabled={!reason}
              className="w-full py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              Submit Refund Request
            </button>
          </div>
        )}

        {refundStatus === 'requested' && (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
            <AlertCircle className="text-yellow-500 mx-auto mb-3" size={32} />
            <h4 className="font-bold text-yellow-800 mb-1">Refund Requested</h4>
            <p className="text-sm text-yellow-700">Your request is being reviewed by our team. We will notify you within 24 hours.</p>
          </div>
        )}

        {refundStatus === 'processed' && (
          <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
            <CheckCircle2 className="text-green-500 mx-auto mb-3" size={32} />
            <h4 className="font-bold text-green-800 mb-1">Refund Processed</h4>
            <p className="text-sm text-green-700">GH₵ 25.50 has been refunded to your MTN MoMo account.</p>
          </div>
        )}
      </div>
    </div>
  );
}
