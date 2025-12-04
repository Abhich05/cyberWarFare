import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency, truncateText } from '../utils';
import { Tag, Clock, GraduationCap, Star, Users, ArrowRight, Sparkles } from 'lucide-react';

const CourseCard = ({ course, index = 0 }) => {
  const { _id, title, description, price, thumbnail, duration, instructor, level, modules } = course;
  const isFree = price === 0;

  const levelConfig = {
    Beginner: { color: 'text-accent-emerald', bg: 'bg-accent-emerald/10', border: 'border-accent-emerald/20' },
    Intermediate: { color: 'text-accent-gold', bg: 'bg-accent-gold/10', border: 'border-accent-gold/20' },
    Advanced: { color: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
  };

  const config = levelConfig[level] || levelConfig.Beginner;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/course/${_id}`}
        className="group block glass-card overflow-hidden hover:border-primary-500/30 transition-all duration-500 hover:shadow-glow-sm hover:-translate-y-2"
      >
        {/* Thumbnail Container */}
        <div className="relative h-52 overflow-hidden bg-dark-800">
          {/* Image */}
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80';
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            {/* Level Badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full ${config.bg} ${config.color} ${config.border} border backdrop-blur-md`}>
              <Star className="w-3 h-3" />
              {level}
            </span>

            {/* Discount Badge for Paid Courses */}
            {!isFree && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="flex items-center gap-1 px-3 py-1.5 bg-accent-gold text-dark-950 rounded-full text-xs font-bold shadow-glow-gold"
              >
                <Tag className="w-3 h-3" />
                50% OFF
              </motion.div>
            )}
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-4 right-4">
            <div
              className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-lg ${
                isFree
                  ? 'bg-accent-emerald/90 text-white'
                  : 'bg-dark-950/80 text-white border border-white/10'
              }`}
            >
              {isFree ? (
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  FREE
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="text-dark-400 line-through text-xs">${price}</span>
                  <span className="text-accent-gold">{formatCurrency(price * 0.5)}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300 line-clamp-1">
            {title}
          </h3>

          {/* Description */}
          <p className="text-dark-400 text-sm leading-relaxed line-clamp-2">
            {truncateText(description, 100)}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-4 text-dark-500 text-sm">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>{instructor.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            </div>
            
            {/* Arrow indicator */}
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
              <ArrowRight className="w-4 h-4 text-dark-400 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1 text-xs text-dark-500">
              <Users className="w-3.5 h-3.5" />
              <span>{Math.floor(Math.random() * 900 + 100)} enrolled</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-dark-500">
              <span>•</span>
              <span>{modules} modules</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
