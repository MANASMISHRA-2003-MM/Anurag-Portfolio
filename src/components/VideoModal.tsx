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

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function VideoModal({ isOpen, onClose, videoSource, title, category }: VideoModalProps) {
  const [streamIndex, setStreamIndex] = useState(0); // 0: cdnStream, 1: streamUrl, 2: iframe
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setStreamIndex(0);
      setIsMuted(false);
      setIsPlaying(true);
      setShowPlayIcon(false);
      setCurrentTime(0);
      setDuration(0);
      resetHideTimer();
    }

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [videoSource, isOpen]);

  if (!isOpen || !videoSource) return null;

  const { id, embedUrl, streamUrl, cdnStreamUrl } = parseGoogleDriveUrl(videoSource);
  const driveViewUrl = `https://drive.google.com/file/d/${id}/view?usp=sharing`;

  const streamCandidates = [cdnStreamUrl, streamUrl];

  const handleVideoError = () => {
    if (streamIndex < streamCandidates.length - 1) {
      setStreamIndex(streamIndex + 1);
    } else {
      setStreamIndex(2); // Fallback to iframe
    }
  };

  const handleVideoTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetHideTimer();

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
    resetHideTimer();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    resetHideTimer();
    if (!videoRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = seekPercentage * duration;

    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

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
          {/* Header Bar */}
          <motion.div
            className="video-modal-header"
            animate={{
              opacity: showControls ? 1 : 0,
              y: showControls ? 0 : -10,
            }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ pointerEvents: showControls ? 'auto' : 'none' }}
          >
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
          </motion.div>

          {/* Clean Player Canvas */}
          <div
            className="video-modal-player-wrapper video-modal-player-wrapper--clean"
            onClick={handleVideoTap}
            onMouseMove={resetHideTimer}
            onTouchStart={resetHideTimer}
          >
            {streamIndex < 2 ? (
              <>
                <video
                  ref={videoRef}
                  src={streamCandidates[streamIndex]}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  preload="auto"
                  disablePictureInPicture
                  disableRemotePlayback
                  controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                  className="video-modal-native-player video-modal-native-player--clean"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleTimeUpdate}
                  onError={handleVideoError}
                />

                {/* Sound Toggle */}
                <motion.button
                  type="button"
                  className="video-modal-sound-toggle"
                  onClick={toggleMute}
                  animate={{
                    opacity: showControls ? 1 : 0,
                    scale: showControls ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.25 }}
                  style={{ pointerEvents: showControls ? 'auto' : 'none' }}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </motion.button>

                {/* Sleek Timeline Scrubber Bar */}
                <motion.div
                  className="video-modal-timeline-wrap"
                  animate={{
                    opacity: showControls ? 1 : 0,
                    y: showControls ? 0 : 8,
                  }}
                  transition={{ duration: 0.25 }}
                  style={{ pointerEvents: showControls ? 'auto' : 'none' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="video-modal-time-display">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  <div className="video-modal-progress-bar" onClick={handleSeek}>
                    <div
                      className="video-modal-progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </motion.div>

                {/* Instant Tap Indicator */}
                <AnimatePresence>
                  {showPlayIcon && (
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1.15, opacity: 0.95 }}
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
              /* Clipped Iframe Fallback — Crops Drive native control bar & popout button */
              <div className="video-modal-iframe-clip">
                <iframe
                  src={`${embedUrl}?autoplay=1&controls=0&rm=minimal`}
                  className="video-modal-iframe video-modal-iframe--clipped"
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
