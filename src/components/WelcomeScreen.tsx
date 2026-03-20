import { useState, useEffect } from 'react';
import { signInWithPopup, OAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Phone, Apple, Mail, ArrowRight, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export function WelcomeScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'options' | 'phone' | 'verify'>('options');

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      const appleProvider = new OAuthProvider('apple.com');
      await signInWithPopup(auth, appleProvider);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Format phone number to E.164 if needed. Assuming user enters +233... or we prepend it.
      const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+233${phoneNumber.replace(/^0/, '')}`;
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      setConfirmationResult(confirmation);
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await confirmationResult.confirm(verificationCode);
    } catch (err: any) {
      setError('Invalid verification code. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-white">
      {/* Left Side - Animated Rickshaw & Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-green-600 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        
        <div className="z-10 text-center mb-12">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-4xl shadow-xl mx-auto mb-6">
            O
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">OSAAT</h1>
          <p className="text-xl font-medium text-green-100">One Step At A Time</p>
          <p className="mt-4 text-green-200 max-w-md mx-auto">
            Meeting international standards, proudly serving Obuasi, Ghana.
          </p>
        </div>

        {/* CSS Animated Rickshaw */}
        <div className="relative w-64 h-48 z-10">
          <svg viewBox="0 0 200 150" className="w-full h-full animate-[bounce_2s_ease-in-out_infinite]">
            {/* Rickshaw Body */}
            <path d="M 40 100 L 40 60 Q 40 40 70 40 L 130 40 Q 160 40 160 60 L 160 100 Z" fill="#FBBF24" />
            <path d="M 30 100 L 170 100 L 170 110 L 30 110 Z" fill="#1F2937" />
            {/* Windows */}
            <path d="M 50 50 L 90 50 L 90 80 L 50 80 Z" fill="#D1D5DB" />
            <path d="M 110 50 L 150 50 L 150 80 L 110 80 Z" fill="#D1D5DB" />
            {/* Wheels */}
            <circle cx="60" cy="110" r="15" fill="#374151" />
            <circle cx="60" cy="110" r="8" fill="#9CA3AF" />
            <circle cx="140" cy="110" r="15" fill="#374151" />
            <circle cx="140" cy="110" r="8" fill="#9CA3AF" />
            {/* Roof */}
            <path d="M 35 40 L 165 40 L 155 30 L 45 30 Z" fill="#1F2937" />
          </svg>
          {/* Moving Road Lines */}
          <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
            <div className="w-[200%] h-full flex animate-slide">
              <div className="w-1/2 h-full bg-dashed-line"></div>
              <div className="w-1/2 h-full bg-dashed-line"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Flow */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="md:hidden text-center mb-8">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-2xl shadow-sm mx-auto mb-4">
              O
            </div>
            <h2 className="text-2xl font-bold text-gray-900">OSAAT</h2>
            <p className="text-sm text-gray-500">Currently available in Obuasi, Ghana</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {step === 'options' && "Welcome Back"}
            {step === 'phone' && "Enter Phone Number"}
            {step === 'verify' && "Verify Code"}
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {step === 'options' && (
            <div className="space-y-4">
              <button
                onClick={() => setStep('phone')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-sm"
              >
                <Phone size={20} />
                Continue with Phone
              </button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                onClick={handleAppleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors font-medium shadow-sm disabled:opacity-50"
              >
                <Apple size={20} />
                Continue with Apple
              </button>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium shadow-sm disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
          )}

          {step === 'phone' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    +233
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="50 123 4567"
                    className="flex-1 block w-full min-w-0 rounded-none rounded-r-xl sm:text-sm border-gray-300 px-4 py-3 border focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || !phoneNumber}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-sm disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Code'}
              </button>
              <button
                type="button"
                onClick={() => setStep('options')}
                className="w-full text-sm text-gray-500 hover:text-gray-700 mt-4"
              >
                Back to all options
              </button>
            </form>
          )}

          {step === 'verify' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="block w-full rounded-xl sm:text-sm border-gray-300 px-4 py-3 border focus:ring-green-500 focus:border-green-500 text-center tracking-widest text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !verificationCode}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-sm disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Sign In'}
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-sm text-gray-500 hover:text-gray-700 mt-4"
              >
                Change phone number
              </button>
            </form>
          )}

          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  );
}
