import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, ExternalLink } from 'lucide-react';
import { parseGoogleDriveUrl, type Project } from '../assets/portfolio';

interface OptimizedVideoCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  variant?: 'grid' | 'feed';
}

export default function OptimizedVideoCard({ project, index, onSelect, variant = 'grid' }: OptimizedVideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const { streamUrl, thumbnailUrl } = parseGoogleDriveUrl(project.driveId);
  const posterUrl = thumbnailUrl;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.25,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isIntersecting && isLoaded && !hasError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
          });
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isIntersecting, isLoaded, hasError]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const isVertical = project.aspectRatio === 'vertical';

  return (
    <motion.div
      ref={containerRef}
      onClick={() => onSelect(project)}
      className={`work-card work-card-optimized ${isVertical ? 'work-card--vertical' : 'work-card--horizontal'} ${variant === 'feed' ? 'work-card--feed' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05 }}
    >
      <div className="work-card__media">
        {/* Poster Image (Instant & Lightweight) */}
        <img
          src={posterUrl}
          alt={project.title}
          loading="lazy"
          className={`work-card__poster ${isPlaying ? 'work-card__poster--hidden' : ''}`}
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Video Element — Lazy Loaded only when in view */}
        {isIntersecting && !hasError && (
          <video
            ref={videoRef}
            src={streamUrl}
            poster={posterUrl}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            className="work-card__video"
            onLoadedData={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        )}

        <div className="work-card__veil" />

        {/* Top Badges */}
        <div className="work-card__badges">
          <span className="work-card__cat-badge">{project.category}</span>
          
          <div className="work-card__actions">
            {isPlaying && (
              <button
                type="button"
                className="work-card__icon-btn"
                onClick={toggleSound}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                title={isMuted ? 'Unmute preview' : 'Mute preview'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            )}
            
            <button
              type="button"
              className="work-card__play-badge"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(project);
              }}
            >
              <Play size={10} fill="currentColor" /> WATCH HD
            </button>
          </div>
        </div>

        {/* Card Metadata */}
        <div className="work-card__meta">
          <div>
            <span className="work-card__subtext">{project.subCategory || (isVertical ? 'Reel / Short' : 'Widescreen Edit')}</span>
            <h3>{project.title}</h3>
            {project.description && <p className="work-card__desc">{project.description}</p>}
          </div>
          <span className="arrow-glyph"><ExternalLink size={18} /></span>
        </div>
      </div>
    </motion.div>
  );
}
