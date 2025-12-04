import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tag, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Zap,
  Shield,
  Award,
  BookOpen,
  ChevronRight,
  Play,
  Copy,
  Check,
  X,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { coursesAPI } from '../api';
import { CourseCard, SkeletonCard } from '../components';
import toast from 'react-hot-toast';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  // Demo video ID from CyberWarFare Labs
  const DEMO_VIDEO_ID = 'LApSn20_Y2o';
  const CHANNEL_URL = 'https://www.youtube.com/@CyberWarFareLabs';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      let response = await coursesAPI.getAll();
      
      if (response.courses?.length === 0) {
        await coursesAPI.seed();
        response = await coursesAPI.getAll();
      }
      
      setCourses(response.courses || []);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const copyPromoCode = () => {
    navigator.clipboard.writeText('BFSALE25');
    setCopied(true);
    toast.success('Promo code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-dark-900 to-accent-900/30" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Black Friday Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                <span className="text-primary-400 text-sm font-medium">
                  BLACK FRIDAY SALE • LIMITED TIME
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
              >
                Master{' '}
                <span className="relative">
                  <span className="gradient-text">Cybersecurity</span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -right-8 -top-4"
                  >
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                  </motion.span>
                </span>
                <br />
                <span className="text-gray-300">Like a Pro</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-400 mb-8 max-w-lg"
              >
                Premium cybersecurity courses at unbeatable Black Friday prices. 
                Learn from industry experts and accelerate your career in security.
              </motion.p>

              {/* Promo Code Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-5 mb-8 max-w-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm">Use promo code at checkout</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-xl font-mono tracking-wider">BFSALE25</span>
                      <button
                        onClick={copyPromoCode}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Save up to</p>
                    <p className="text-2xl font-bold gradient-text">50%</p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#courses"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 group-hover:scale-105 transition-transform" />
                  <span className="relative font-semibold text-white">Explore Courses</span>
                  <ArrowRight className="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </a>
                <button 
                  onClick={() => setShowDemoVideo(true)}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 hover:border-red-500/30 transition-colors"
                >
                  <Play className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-white">Watch Demo</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'Expert-Led', desc: 'Learn from industry pros', color: 'from-blue-500 to-cyan-500' },
                  { icon: Zap, title: 'Practical Labs', desc: 'Hands-on experience', color: 'from-yellow-500 to-orange-500' },
                  { icon: Award, title: 'Certification', desc: 'Recognized credentials', color: 'from-purple-500 to-pink-500' },
                  { icon: Users, title: 'Community', desc: '10K+ learners', color: 'from-green-500 to-emerald-500' },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-card p-5 hover:border-primary-500/30 transition-all cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20 flex items-center justify-center mb-3`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 via-transparent to-accent-900/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '5+', label: 'Premium Courses', icon: BookOpen },
              { value: '50+', label: 'Hours Content', icon: Clock },
              { value: '50%', label: 'Black Friday Discount', icon: Tag },
              { value: '10K+', label: 'Active Learners', icon: Users },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-500/10 mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <stat.icon className="w-7 h-7 text-primary-400" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-primary-400 text-sm font-medium mb-2">
              <GraduationCap className="w-5 h-5" />
              <span>OUR COURSES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Featured Courses
            </h2>
            <p className="text-gray-400 mt-2 max-w-lg">
              Start your cybersecurity journey with our expert-led, hands-on courses
            </p>
          </div>
          <a
            href="#all-courses"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors group"
          >
            View all courses
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 glass-card"
          >
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchCourses}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              <Zap className="w-5 h-5" />
              Try Again
            </button>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {courses.map((course, index) => (
              <motion.div key={course._id} variants={itemVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && courses.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 glass-card"
          >
            <div className="w-20 h-20 rounded-full bg-dark-800 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg">No courses available yet</p>
            <p className="text-gray-500 text-sm mt-1">Check back soon for new content!</p>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-primary-800/30 to-accent-900/50" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-3xl"
        />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Limited Time Offer</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Don't Miss Out on
              <span className="block gradient-text">Black Friday Deals!</span>
            </h2>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Use code <span className="text-white font-bold font-mono bg-white/10 px-2 py-1 rounded">BFSALE25</span> at 
              checkout to get 50% off on all paid courses. Offer ends soon!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#courses"
                className="group relative inline-flex items-center gap-2 px-8 py-4 overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-white group-hover:scale-105 transition-transform" />
                <span className="relative font-semibold text-dark-900">Start Learning Now</span>
                <ArrowRight className="relative w-5 h-5 text-dark-900 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {[
                { icon: Shield, text: '30-Day Guarantee' },
                { icon: Star, text: '4.9/5 Rating' },
                { icon: Users, text: '10K+ Students' },
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400">
                  <badge.icon className="w-5 h-5" />
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Video Modal */}
      <AnimatePresence>
        {showDemoVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowDemoVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDemoVideo(false)}
                className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span className="text-sm">Close</span>
                <X className="w-6 h-6" />
              </button>

              {/* Video Title */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">CyberWarFare Labs Demo</h3>
                  <p className="text-gray-400 text-sm">Preview our training approach</p>
                </div>
              </motion.div>

              {/* Video Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden glass-card">
                <iframe
                  src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0`}
                  title="CyberWarFare Labs Demo"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Channel Link */}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span>Subscribe to CyberWarFare Labs</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
