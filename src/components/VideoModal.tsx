import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { parseGoogleDriveUrl } from '../assets/portfolio';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSource?: string;
  title?: string;
  category?: string;
  aspectRatio?: 'vertical' | 'horizontal';
}

export default function VideoModal({ isOpen, onClose, videoSource, title, category }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

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

  const isMp4 = videoSource.includes('ik.imagekit.io') || videoSource.endsWith('.mp4');
  const isExternalUrl = videoSource.startsWith('http');
  let driveViewUrl = videoSource;
  let driveEmbedUrl = videoSource;

  if (!isMp4) {
    if (isExternalUrl) {
      if (videoSource.includes('youtube.com/embed/')) {
        driveViewUrl = videoSource.replace('embed/', 'watch?v=').replace('?autoplay=1', '');
      } else {
        driveViewUrl = videoSource.replace('/embed', '');
      }
      driveEmbedUrl = videoSource;
    } else {
      const { id, embedUrl } = parseGoogleDriveUrl(videoSource);
      driveViewUrl = `https://drive.google.com/file/d/${id}/view?usp=sharing`;
      driveEmbedUrl = `${embedUrl}?autoplay=1&rm=minimal`;
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
          className="video-modal-container video-modal-container--clean video-modal-container--insta-style"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
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
                title="Open Original Link"
              >
                <span>{isMp4 ? 'DIRECT LINK' : 'VIEW ORIGINAL'}</span> <ExternalLink size={13} />
              </a>
              <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Player Wrapper */}
          <div className="video-modal-player-wrapper video-modal-player-wrapper--clean">
            {isMp4 ? (
              <div className="video-modal-mp4-container" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src={videoSource}
                  autoPlay
                  playsInline
                  loop
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="video-modal-native-player--clean"
                />
                
                {/* Overlay Controls */}
                <div className="video-modal-mp4-overlay">
                  <button type="button" className="video-modal-center-play-btn" onClick={togglePlay}>
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                  </button>

                  <button
                    type="button"
                    className="video-modal-sound-toggle"
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="video-modal-iframe-clean-crop">
                <iframe
                  src={driveEmbedUrl}
                  className="video-modal-iframe-cropped"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title={title || "Video Player"}
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
