import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { parseGoogleDriveUrl, type Project } from '../assets/portfolio';

interface OptimizedVideoCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  variant?: 'grid' | 'feed';
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export default function OptimizedVideoCard({
  project,
  index,
  onSelect,
  variant = 'grid',
  isPlaying: controlledIsPlaying,
  onTogglePlay,
}: OptimizedVideoCardProps) {
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMp4 = !!project.videoUrl;
  const isDriveVideo = !!project.driveId;
  const parsedDrive = isDriveVideo ? parseGoogleDriveUrl(project.driveId) : { id: '' };

  // Use controlled playing state if passed from parent (e.g. Pricing.tsx), else internal state
  const isPlaying = controlledIsPlaying !== undefined ? controlledIsPlaying : internalIsPlaying;

  // Generate ImageKit thumbnail or fallback Drive thumbnail
  const ikPoster = project.videoUrl ? `${project.videoUrl.split('?')[0]}/ik-thumbnail.jpg` : '';
  const primaryThumb = project.thumbnailUrl || ikPoster || (isDriveVideo ? `https://lh3.googleusercontent.com/d/${parsedDrive.id}=s1000` : '');

  const [imgSrc, setImgSrc] = useState(primaryThumb);

  // Sync video play/pause status when controlled isPlaying prop changes
  useEffect(() => {
    if (!isMp4 || !videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(err => {
        console.warn('Inline play prevented:', err);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, isMp4]);

  const handleImgError = () => {
    if (project.thumbnailUrl?.includes('youtube') && imgSrc.includes('maxresdefault')) {
      setImgSrc(project.thumbnailUrl.replace('maxresdefault', 'hqdefault'));
      return;
    }
    // Clear image src on error so HTML5 video preload="metadata" natively displays frame snapshot
    setImgSrc('');
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMp4) {
      onSelect(project);
      return;
    }

    if (onTogglePlay) {
      onTogglePlay();
    } else {
      setInternalIsPlaying(!internalIsPlaying);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      if (onTogglePlay && isPlaying) onTogglePlay();
      setInternalIsPlaying(false);
    }
    onSelect(project);
  };

  const isVertical = project.aspectRatio === 'vertical';

  return (
    <motion.div
      onClick={handleTogglePlay}
      className={`work-card work-card-optimized ${isVertical ? 'work-card--vertical' : 'work-card--horizontal'} ${variant === 'feed' ? 'work-card--feed' : ''} ${isPlaying ? 'work-card--playing' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
    >
      <div className="work-card__media">
        {/* Direct HTML5 Video Player for ImageKit MP4s (renders native frame snapshot if poster fails) */}
        {isMp4 && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={imgSrc}
            preload="metadata"
            playsInline
            loop
            muted={isMuted}
            onPlay={() => {
              if (controlledIsPlaying === undefined) setInternalIsPlaying(true);
            }}
            onPause={() => {
              if (controlledIsPlaying === undefined) setInternalIsPlaying(false);
            }}
            className="work-card__video work-card__video--active"
          />
        )}

        {/* Poster Thumbnail image overlay when idle */}
        {imgSrc && (!isMp4 || !isPlaying) && (
          <img
            src={imgSrc}
            alt={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImgError}
            className="work-card__poster work-card__poster--active"
          />
        )}

        <div className={`work-card__veil ${isPlaying ? 'work-card__veil--playing' : ''}`} />

        {/* Top Badges & Action Controls */}
        <div className="work-card__badges">
          <span className="work-card__cat-badge">{project.category}</span>
          
          <div className="work-card__actions">
            {isPlaying && isMp4 && (
              <button
                type="button"
                className="work-card__icon-btn"
                onClick={handleToggleMute}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
            )}

            {isMp4 && (
              <button
                type="button"
                className="work-card__icon-btn"
                onClick={handleOpenModal}
                title="Expand to Fullscreen Modal"
              >
                <Maximize2 size={12} />
              </button>
            )}

            <button
              type="button"
              className={`work-card__play-badge ${isPlaying ? 'playing' : ''}`}
              onClick={handleTogglePlay}
            >
              {isPlaying ? (
                <>
                  <Pause size={11} fill="currentColor" /> PAUSE
                </>
              ) : (
                <>
                  <Play size={11} fill="currentColor" /> WATCH HD
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center Play / Pause Controller - only shown for active video or on hover */}
        {isMp4 && isPlaying && (
          <button
            type="button"
            className="work-card__center-control"
            onClick={handleTogglePlay}
            aria-label="Pause video"
          >
            <Pause size={28} fill="currentColor" />
          </button>
        )}

        {/* Card Metadata */}
        <div className="work-card__meta">
          <div>
            <span className="work-card__subtext">{project.subCategory || (isVertical ? 'Reel / Short' : 'Widescreen Edit')}</span>
            <h3>{project.title}</h3>
            {project.description && <p className="work-card__desc">{project.description}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
