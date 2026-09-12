import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, AlertCircle } from 'lucide-react';
import { parseGoogleDriveUrl } from '../assets/portfolio';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSource?: string;
  title?: string;
  category?: string;
}

export default function VideoModal({ isOpen, onClose, videoSource, title, category }: VideoModalProps) {
  const [playerType, setPlayerType] = useState<'video' | 'iframe'>('video');
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Reset player state when videoSource changes
    setPlayerType('video');
    setVideoError(false);
  }, [videoSource]);

  if (!isOpen || !videoSource) return null;

  const { id, embedUrl, streamUrl } = parseGoogleDriveUrl(videoSource);
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
                title="Open directly in Google Drive"
              >
                <span>Open HD Drive</span> <ExternalLink size={13} />
              </a>
              <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="video-modal-player-wrapper">
            {playerType === 'video' && !videoError ? (
              <video
                src={streamUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="video-modal-native-player"
                onError={() => {
                  // Fall back to iframe player if direct stream is blocked by CORS/Drive policy
                  setVideoError(true);
                  setPlayerType('iframe');
                }}
              />
            ) : (
              <iframe
                src={embedUrl}
                className="video-modal-iframe"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
                title={title || "Video Player"}
              />
            )}

            {videoError && (
              <div className="video-modal-fallback-banner">
                <AlertCircle size={14} />
                <span>Mobile Drive Stream mode — if video doesn't play automatically, <a href={driveViewUrl} target="_blank" rel="noopener noreferrer">Watch on Google Drive App <ExternalLink size={12} /></a></span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
