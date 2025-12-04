import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context';
import { Navbar, Footer, ProtectedRoute, ErrorBoundary, CookieConsent } from './components';
import { Home, Login, Signup, CourseDetail, MyCourses, NotFound } from './pages';

// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/course/:id" element={<PageWrapper><CourseDetail /></PageWrapper>} />

        {/* Protected Routes */}
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <PageWrapper><MyCourses /></PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
        <div className="min-h-screen bg-dark-900 flex flex-col">
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(17, 17, 17, 0.9)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
                style: {
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
                style: {
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                },
              },
            }}
          />

          {/* Navbar */}
          <Navbar />

          {/* Main Content - pt-16 accounts for fixed navbar height */}
          <main className="flex-1 pt-16">
            <AnimatedRoutes />
          </main>

          {/* Footer */}
          <Footer />

          {/* Cookie Consent Banner */}
          <CookieConsent />
        </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
