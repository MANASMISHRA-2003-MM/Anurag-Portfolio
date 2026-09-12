import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Volume2, VolumeX, Play, Pause } from 'lucide-react';
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
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setPlayerType('video');
    setIsMuted(false);
    setIsPlaying(true);
    setShowPlayIcon(false);
  }, [videoSource, isOpen]);

  if (!isOpen || !videoSource) return null;

  const { id, embedUrl, streamUrl } = parseGoogleDriveUrl(videoSource);
  const driveViewUrl = `https://drive.google.com/file/d/${id}/view?usp=sharing`;

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 700);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          className="video-modal-container video-modal-container--clean"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Minimal Header */}
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
                title="Open in Drive"
              >
                <span>HD Drive</span> <ExternalLink size={13} />
              </a>
              <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Clean Player Wrapper — Completely Free of Native Timelines, 10s Skip Buttons, Settings Gear */}
          <div className="video-modal-player-wrapper video-modal-player-wrapper--clean" onClick={togglePlayPause}>
            {playerType === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  src={streamUrl}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  preload="auto"
                  className="video-modal-native-player video-modal-native-player--clean"
                  onError={() => setPlayerType('iframe')}
                />

                {/* Minimal Corner Sound Control */}
                <button
                  type="button"
                  className="video-modal-sound-toggle"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Instant Tap Indicator */}
                <AnimatePresence>
                  {showPlayIcon && (
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 0.9 }}
                      exit={{ scale: 1.4, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="video-modal-tap-indicator"
                    >
                      {isPlaying ? <Play size={34} fill="#fff" color="#fff" /> : <Pause size={34} fill="#fff" color="#fff" />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="video-modal-iframe-clip">
                <iframe
                  src={`${embedUrl}?autoplay=1`}
                  className="video-modal-iframe"
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
