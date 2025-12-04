import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Tag,
  Clock,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Play,
  Users,
  Star,
  Award,
  Download,
  Smartphone,
  Infinity,
  Shield,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { coursesAPI, subscriptionAPI } from '../api';
import { useAuth } from '../context';
import { formatCurrency, formatDate } from '../utils';
import { LoadingSpinner, SkeletonCourseDetail, VideoPlayer } from '../components';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);

  // Promo state
  const [promoCode, setPromoCode] = useState('');
  const [promoValidating, setPromoValidating] = useState(false);
  const [promoValid, setPromoValid] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [copied, setCopied] = useState(false);

  // Subscribe state
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (course && isAuthenticated) {
      checkSubscriptionStatus();
    }
  }, [course, isAuthenticated]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await coursesAPI.getById(id);
      setCourse(response.course);
    } catch (error) {
      toast.error(error.message || 'Failed to load course');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const response = await subscriptionAPI.getStatus(id);
      setIsSubscribed(response.isSubscribed);
      setSubscriptionData(response.subscription);
    } catch (error) {
      // Silently fail - user might not be subscribed
    }
  };

  const handleValidatePromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setPromoValidating(true);
    setPromoError('');
    setPromoValid(false);

    try {
      const response = await subscriptionAPI.validatePromo({
        promoCode: promoCode.trim(),
        courseId: id,
      });

      if (response.isValid) {
        setPromoValid(true);
        setDiscountedPrice(response.discountedPrice);
        toast.success(`${response.discount}% discount applied!`);
      } else {
        setPromoError(response.message || 'Invalid promo code');
      }
    } catch (error) {
      setPromoError(error.message || 'Failed to validate promo code');
    } finally {
      setPromoValidating(false);
    }
  };

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to subscribe');
      navigate('/login', { state: { from: { pathname: `/course/${id}` } } });
      return;
    }

    if (course.price > 0 && !promoValid) {
      toast.error('Please apply a valid promo code first');
      return;
    }

    setSubscribing(true);

    try {
      const payload = {
        courseId: id,
        ...(course.price > 0 && { promoCode: promoCode.trim() }),
      };

      const response = await subscriptionAPI.subscribe(payload);
      
      if (response.success) {
        toast.success('Successfully subscribed to course!');
        setIsSubscribed(true);
        setSubscriptionData({
          pricePaid: response.subscription.pricePaid,
          subscribedAt: response.subscription.subscribedAt,
        });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to subscribe');
    } finally {
      setSubscribing(false);
    }
  };

  const copyPromoCode = () => {
    navigator.clipboard.writeText('BFSALE25');
    setCopied(true);
    toast.success('Promo code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <SkeletonCourseDetail />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-card p-12"
        >
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <p className="text-gray-400 text-lg mb-4">Course not found</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const isFree = course.price === 0;

  const features = [
    { icon: Infinity, text: 'Lifetime access' },
    { icon: Award, text: 'Certificate of completion' },
    { icon: Smartphone, text: 'Mobile & desktop access' },
    { icon: Download, text: 'Downloadable resources' },
  ];

  const learningPoints = [
    'Core concepts and fundamentals',
    'Hands-on practical exercises',
    'Real-world case studies',
    'Industry best practices',
    'Career advancement tips',
    'Certificate upon completion',
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to courses</span>
        </motion.button>

        {/* Course Header Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 group"
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {!isFree && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-bold flex items-center gap-1.5 shadow-lg"
              >
                <Tag className="w-4 h-4" />
                50% OFF
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ${
                course.level === 'Beginner'
                  ? 'bg-green-500 text-white'
                  : course.level === 'Intermediate'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-red-500 text-white'
              }`}
            >
              {course.level}
            </motion.div>
          </div>

          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Users className="w-4 h-4" />
              <span>2.4K enrolled</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>4.9 (324 reviews)</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {course.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: GraduationCap, text: course.instructor },
                { icon: Clock, text: course.duration },
                { icon: BookOpen, text: `${course.modules} modules` },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg"
                >
                  <item.icon className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-400" />
                About This Course
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-400" />
                What You'll Learn
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {learningPoints.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Instructor Info */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary-400" />
                Your Instructor
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {course.instructor?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{course.instructor}</h3>
                  <p className="text-primary-400 text-sm mb-2">Senior Security Expert</p>
                  <p className="text-gray-400 text-sm">
                    10+ years of experience in cybersecurity with expertise in penetration testing, 
                    threat analysis, and security architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Preview Section */}
            {course.previewVideoId && (
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary-400" />
                  Course Preview
                </h2>
                <VideoPlayer
                  videoId={course.previewVideoId}
                  title={course.title}
                  channelUrl="https://www.youtube.com/@CyberWarFareLabs"
                />
              </div>
            )}
          </motion.div>

          {/* Sidebar - Subscribe Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 sticky top-24">
              {/* Price Display */}
              <div className="mb-6">
                {isFree ? (
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-green-400">FREE</span>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                      No payment required
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {promoValid ? (
                      <>
                        <div className="flex items-center gap-3">
                          <span className="text-4xl font-bold gradient-text">
                            {formatCurrency(discountedPrice)}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            {formatCurrency(course.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 px-3 py-1.5 rounded-lg w-fit">
                          <CheckCircle className="w-4 h-4" />
                          <span>50% discount applied!</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-white">
                          {formatCurrency(course.price)}
                        </div>
                        <p className="text-sm text-gray-400">
                          Apply promo code for 50% off
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Subscription Status */}
              {isSubscribed ? (
                <div className="space-y-4">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-400 font-semibold">Subscribed!</p>
                      <p className="text-gray-400 text-sm">
                        Since {formatDate(subscriptionData?.subscribedAt)}
                      </p>
                    </div>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/my-courses')}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Continue Learning
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Promo Code Input - Only for paid courses */}
                  {!isFree && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-300">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value.toUpperCase());
                              setPromoError('');
                              setPromoValid(false);
                            }}
                            placeholder="Enter code"
                            disabled={promoValid}
                            className={`w-full pl-11 pr-10 py-3 bg-dark-800/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all ${
                              promoValid
                                ? 'border-green-500/50 bg-green-500/10'
                                : promoError
                                ? 'border-red-500/50'
                                : 'border-white/10'
                            }`}
                          />
                          {promoValid && (
                            <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleValidatePromo}
                          disabled={promoValidating || promoValid}
                          className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {promoValidating ? (
                            <LoadingSpinner size="small" />
                          ) : promoValid ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            'Apply'
                          )}
                        </motion.button>
                      </div>
                      {promoError && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {promoError}
                        </motion.p>
                      )}
                      <button
                        onClick={copyPromoCode}
                        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span>Try: <span className="font-mono font-bold text-white">BFSALE25</span></span>
                        {copied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Subscribe Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubscribe}
                    disabled={subscribing || (!isFree && !promoValid)}
                    className={`w-full py-3.5 px-4 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      isFree || promoValid
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg hover:shadow-primary-500/25'
                        : 'bg-white/10 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {subscribing ? (
                      <>
                        <LoadingSpinner size="small" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        <span>
                          {isFree
                            ? 'Enroll Now - Free'
                            : promoValid
                            ? `Enroll for ${formatCurrency(discountedPrice)}`
                            : 'Apply Promo to Enroll'}
                        </span>
                      </>
                    )}
                  </motion.button>

                  {!isAuthenticated && (
                    <p className="text-center text-sm text-gray-500">
                      You'll need to{' '}
                      <button
                        onClick={() =>
                          navigate('/login', {
                            state: { from: { pathname: `/course/${id}` } },
                          })
                        }
                        className="text-primary-400 hover:text-primary-300 font-medium"
                      >
                        sign in
                      </button>{' '}
                      to enroll
                    </p>
                  )}
                </div>
              )}

              {/* Course Features */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <p className="text-sm font-medium text-white mb-4">This course includes:</p>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-3 text-gray-400 text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-primary-400" />
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Guarantee Badge */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
