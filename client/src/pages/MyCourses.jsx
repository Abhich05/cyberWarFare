import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Tag,
  Calendar,
  DollarSign,
  Play,
  Clock,
  Zap,
  ArrowRight,
  Trophy,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { subscriptionAPI } from '../api';
import { formatCurrency, formatDate } from '../utils';
import { SkeletonMyCourse } from '../components';
import toast from 'react-hot-toast';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const response = await subscriptionAPI.getMyCourses();
      setCourses(response.courses || []);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load your courses');
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = courses.reduce((sum, item) => sum + item.pricePaid, 0);
  const totalSaved = courses.reduce(
    (sum, item) => sum + (item.originalPrice - item.pricePaid),
    0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Courses</h1>
              <p className="text-gray-400 text-sm">
                Continue your learning journey
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        {courses.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            {[
              {
                icon: BookOpen,
                value: courses.length,
                label: 'Enrolled Courses',
                color: 'from-primary-500 to-blue-500',
                bgColor: 'bg-primary-500/10',
              },
              {
                icon: DollarSign,
                value: formatCurrency(totalSpent),
                label: 'Total Invested',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-500/10',
              },
              {
                icon: TrendingUp,
                value: formatCurrency(totalSaved),
                label: 'Total Saved',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'bg-green-500/10',
                isHighlight: true,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="glass-card p-5 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity`} />
                <div className="relative flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.isHighlight ? 'text-green-400' : 'text-primary-400'}`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${stat.isHighlight ? 'text-green-400' : 'text-white'}`}>
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 glass-card"
          >
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchMyCourses}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              <Zap className="w-5 h-5" />
              Try Again
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonMyCourse key={i} />
            ))}
          </div>
        )}

        {/* Courses List */}
        {!loading && !error && courses.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {courses.map((item, index) => (
              <motion.div
                key={item.subscriptionId}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="group"
              >
                <Link
                  to={`/course/${item.course._id}`}
                  className="flex flex-col sm:flex-row glass-card overflow-hidden hover:border-primary-500/30 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="sm:w-56 h-44 sm:h-auto flex-shrink-0 relative overflow-hidden">
                    <img
                      src={item.course.thumbnail}
                      alt={item.course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm ${
                          item.course.level === 'Beginner'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : item.course.level === 'Intermediate'
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        {item.course.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {item.course.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary-400" />
                          <span>{formatDate(item.subscribedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4 text-primary-400" />
                          <span>{item.course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary-400" />
                          <span>{item.course.duration}</span>
                        </div>
                      </div>

                      {/* Progress placeholder - would need actual progress data */}
                      <div className="mt-3 hidden sm:block">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-primary-400">Start Learning</span>
                        </div>
                        <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                          <div className="h-full w-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Price & Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/5 sm:pl-5">
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">
                          {item.pricePaid === 0 ? 'Free' : formatCurrency(item.pricePaid)}
                        </div>
                        {item.discountApplied > 0 && (
                          <div className="flex items-center gap-1 text-sm text-green-400">
                            <Tag className="w-3 h-3" />
                            <span>{item.discountApplied}% saved</span>
                          </div>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                        <ArrowRight className="w-5 h-5 text-primary-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && courses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 glass-card"
          >
            <div className="w-24 h-24 rounded-full bg-dark-800 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Start Your Learning Journey
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Explore our collection
              and unlock your potential today!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all font-semibold"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explore Courses</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Promo reminder */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm">
                Use code <span className="font-mono font-bold">BFSALE25</span> for 50% off!
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
