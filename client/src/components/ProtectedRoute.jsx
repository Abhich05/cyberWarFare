import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
          </div>
          <p className="text-gray-400 text-sm">Verifying access...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Navigate to="/login" state={{ from: location }} replace />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;
