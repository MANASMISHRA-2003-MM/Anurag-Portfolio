import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
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

  const { id, embedUrl } = parseGoogleDriveUrl(videoSource);
  const activeUrl = embedUrl || videoSource;
  const driveViewUrl = `https://drive.google.com/file/d/${id}/view?usp=sharing`;

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
            <div className="video-modal-actions">
              <a
                href={driveViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-modal-drive-btn"
                title="Open in Google Drive"
              >
                <span>Drive</span> <ExternalLink size={13} />
              </a>
              <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="video-modal-player-wrapper">
            <iframe
              src={activeUrl}
              className="video-modal-iframe"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
              title={title || "Video Player"}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
