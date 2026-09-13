import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { parseGoogleDriveUrl, type Project } from '../assets/portfolio';

interface OptimizedVideoCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  variant?: 'grid' | 'feed';
}

export default function OptimizedVideoCard({ project, index, onSelect, variant = 'grid' }: OptimizedVideoCardProps) {
  const isDriveVideo = !!project.driveId;
  const parsedDrive = isDriveVideo ? parseGoogleDriveUrl(project.driveId) : { id: '' };
  
  const primaryThumb = project.thumbnailUrl || (isDriveVideo ? `https://lh3.googleusercontent.com/d/${parsedDrive.id}=s1000` : '');
  const secondaryThumb = isDriveVideo ? `https://drive.google.com/thumbnail?id=${parsedDrive.id}&sz=w1000` : primaryThumb;
  const tertiaryThumb = isDriveVideo ? `https://lh3.googleusercontent.com/d/${parsedDrive.id}=s800` : primaryThumb;

  const [imgSrc, setImgSrc] = useState(primaryThumb);
  const [retryCount, setRetryCount] = useState(0);

  const handleImgError = () => {
    if (project.thumbnailUrl?.includes('youtube') && imgSrc.includes('maxresdefault')) {
      setImgSrc(project.thumbnailUrl.replace('maxresdefault', 'hqdefault'));
      return;
    }
    
    if (!isDriveVideo) return; // Don't retry if it's a custom thumbnail (and not youtube)
    if (retryCount === 0) {
      setImgSrc(secondaryThumb);
      setRetryCount(1);
    } else if (retryCount === 1) {
      setImgSrc(tertiaryThumb);
      setRetryCount(2);
    }
  };

  const isVertical = project.aspectRatio === 'vertical';

  return (
    <motion.div
      onClick={() => onSelect(project)}
      className={`work-card work-card-optimized ${isVertical ? 'work-card--vertical' : 'work-card--horizontal'} ${variant === 'feed' ? 'work-card--feed' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
    >
      <div className="work-card__media">
        {/* High-Definition Poster Thumbnail */}
        <img
          src={imgSrc}
          alt={project.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={handleImgError}
          className="work-card__poster work-card__poster--active"
        />

        <div className="work-card__veil" />

        {/* Top Badges */}
        <div className="work-card__badges">
          <span className="work-card__cat-badge">{project.category}</span>
          
          <button
            type="button"
            className="work-card__play-badge"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
          >
            <Play size={11} fill="currentColor" /> WATCH HD
          </button>
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
