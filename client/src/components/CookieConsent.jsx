import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, X } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    // Note: Essential cookies (auth) will still work, but we inform the user
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-gold flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Cookie Notice</h3>
                    <p className="text-dark-400 text-sm">Your privacy matters to us</p>
                  </div>
                </div>
                <button
                  onClick={declineCookies}
                  className="p-2 rounded-lg hover:bg-white/5 text-dark-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-dark-300 text-sm leading-relaxed">
                  We use <span className="text-white font-medium">essential cookies</span> to keep you logged in and provide a secure experience. 
                  These cookies are necessary for authentication and do not track your browsing activity.
                </p>
                
                {/* Cookie Types */}
                <div className="mt-4 p-4 bg-dark-800/50 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-accent-emerald" />
                    <span className="text-white text-sm font-medium">Essential Cookies Only</span>
                  </div>
                  <ul className="text-dark-400 text-xs space-y-1 ml-6">
                    <li>• <span className="text-dark-300">Authentication token</span> - Keeps you logged in securely</li>
                    <li>• <span className="text-dark-300">Session data</span> - Remembers your preferences</li>
                    <li>• <span className="text-dark-300">No tracking</span> - We don't use analytics or advertising cookies</li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptCookies}
                  className="flex-1 btn-primary text-sm py-2.5"
                >
                  Accept & Continue
                </button>
                <button
                  onClick={declineCookies}
                  className="flex-1 btn-secondary text-sm py-2.5"
                >
                  Essential Only
                </button>
              </div>

              {/* Footer note */}
              <p className="text-dark-500 text-xs mt-4 text-center">
                By continuing to use this site, you agree to our{' '}
                <a href="#" className="text-primary-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
