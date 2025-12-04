import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink, Youtube } from 'lucide-react';

const VideoPlayer = ({ videoId, title, channelUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!videoId) return null;

  return (
    <>
      {/* Video Preview Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full glass-card p-4 flex items-center gap-4 hover:border-red-500/30 transition-colors group"
      >
        <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/30 transition-colors">
          <Youtube className="w-7 h-7 text-red-500" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-medium text-white">Watch Preview</p>
          <p className="text-sm text-gray-400">Free video from CyberWarFare Labs</p>
        </div>
        <Play className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </motion.button>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden glass-card">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Channel Link */}
              {channelUrl && (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  <span>More videos on CyberWarFare Labs</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoPlayer;
