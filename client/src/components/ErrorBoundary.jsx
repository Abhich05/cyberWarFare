import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log to error reporting service in production
    console.error('Error Boundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg"
          >
            {/* Error Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full glass-card rounded-full flex items-center justify-center border-red-500/30">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Don't worry, our team has been notified.
            </p>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="glass-card p-4 mb-6 text-left overflow-auto max-h-40">
                <p className="text-red-400 text-sm font-mono">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden rounded-xl w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600" />
                <RefreshCw className="relative w-5 h-5 text-white" />
                <span className="relative font-semibold text-white">Refresh Page</span>
              </button>

              <Link
                to="/"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto justify-center"
              >
                <Home className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-300">Go Home</span>
              </Link>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
