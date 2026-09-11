import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { parseGoogleDriveUrl } from '../assets/portfolio';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSource?: string;
  title?: string;
  category?: string;
}

export default function VideoModal({ isOpen, onClose, videoSource, title, category }: VideoModalProps) {
  if (!isOpen || !videoSource) return null;

  const { embedUrl } = parseGoogleDriveUrl(videoSource);
  const activeUrl = embedUrl || videoSource;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="video-modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="video-modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="video-modal-header">
            <div>
              {category && <span className="video-modal-category">{category}</span>}
              {title && <h3 className="video-modal-title">{title}</h3>}
            </div>
            <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>

          <div className="video-modal-player-wrapper">
            <iframe
              src={activeUrl}
              className="video-modal-iframe"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={title || "Video Player"}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
