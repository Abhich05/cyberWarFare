import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card overflow-hidden"
    >
      {/* Thumbnail Skeleton */}
      <div className="h-52 bg-dark-800 shimmer" />

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        {/* Level Badge */}
        <div className="w-20 h-6 bg-dark-800 rounded-full shimmer" />

        {/* Title */}
        <div className="h-6 bg-dark-800 rounded-lg w-4/5 shimmer" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-dark-800 rounded-lg w-full shimmer" />
          <div className="h-4 bg-dark-800 rounded-lg w-3/4 shimmer" />
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex gap-4">
            <div className="h-4 bg-dark-800 rounded-lg w-20 shimmer" />
            <div className="h-4 bg-dark-800 rounded-lg w-16 shimmer" />
          </div>
          <div className="w-8 h-8 bg-dark-800 rounded-full shimmer" />
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonCourseDetail = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      {/* Back button */}
      <div className="w-32 h-6 bg-dark-800 rounded-lg mb-6 shimmer" />
      
      {/* Header Image */}
      <div className="h-64 sm:h-80 bg-dark-800 rounded-2xl mb-8 shimmer" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="h-10 bg-dark-800 rounded-xl w-3/4 shimmer" />

          {/* Meta */}
          <div className="flex gap-4">
            <div className="h-5 w-28 bg-dark-800 rounded-lg shimmer" />
            <div className="h-5 w-24 bg-dark-800 rounded-lg shimmer" />
            <div className="h-5 w-20 bg-dark-800 rounded-lg shimmer" />
          </div>

          {/* Description Box */}
          <div className="glass-card p-6 space-y-4">
            <div className="h-6 bg-dark-800 rounded-lg w-40 shimmer" />
            <div className="space-y-3">
              <div className="h-4 bg-dark-800 rounded-lg w-full shimmer" />
              <div className="h-4 bg-dark-800 rounded-lg w-full shimmer" />
              <div className="h-4 bg-dark-800 rounded-lg w-5/6 shimmer" />
              <div className="h-4 bg-dark-800 rounded-lg w-4/6 shimmer" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 space-y-6 sticky top-24">
            <div className="h-10 bg-dark-800 rounded-xl w-1/2 shimmer" />
            <div className="h-12 bg-dark-800 rounded-xl shimmer" />
            <div className="h-14 bg-dark-800 rounded-xl shimmer" />
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="h-4 bg-dark-800 rounded-lg w-full shimmer" />
              <div className="h-4 bg-dark-800 rounded-lg w-5/6 shimmer" />
              <div className="h-4 bg-dark-800 rounded-lg w-4/6 shimmer" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonMyCourse = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card overflow-hidden flex flex-col sm:flex-row"
    >
      {/* Thumbnail */}
      <div className="w-full sm:w-56 h-40 sm:h-auto bg-dark-800 flex-shrink-0 shimmer" />

      {/* Content */}
      <div className="flex-1 p-5 space-y-4">
        <div className="w-20 h-5 bg-dark-800 rounded-full shimmer" />
        <div className="h-6 bg-dark-800 rounded-lg w-3/4 shimmer" />
        <div className="flex gap-4">
          <div className="h-4 bg-dark-800 rounded-lg w-32 shimmer" />
          <div className="h-4 bg-dark-800 rounded-lg w-24 shimmer" />
        </div>
      </div>

      {/* Right side price */}
      <div className="hidden sm:flex flex-col items-end justify-center p-5 space-y-2">
        <div className="h-6 bg-dark-800 rounded-lg w-20 shimmer" />
        <div className="h-4 bg-dark-800 rounded-lg w-16 shimmer" />
      </div>
    </motion.div>
  );
};

export { SkeletonCard, SkeletonCourseDetail, SkeletonMyCourse };
