import { useEffect } from 'react';
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !videoSource) return null;

  const { id, embedUrl } = parseGoogleDriveUrl(videoSource);
  const driveViewUrl = `https://drive.google.com/file/d/${id}/view?usp=sharing`;
  const driveEmbedUrl = `${embedUrl}?autoplay=1&rm=minimal`;

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
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="video-modal-container video-modal-container--clean"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Minimal Header with Close Button */}
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
                title="Open in Drive App"
              >
                <span>OPEN HD DRIVE</span> <ExternalLink size={13} />
              </a>
              <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Clean Clipped Player Canvas — Removes native controls and popout icons */}
          <div className="video-modal-player-wrapper video-modal-player-wrapper--clean">
            <div className="video-modal-iframe-clean-crop">
              <iframe
                src={driveEmbedUrl}
                className="video-modal-iframe-cropped"
                allow="autoplay; fullscreen; picture-in-picture"
                title={title || "Video Player"}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
