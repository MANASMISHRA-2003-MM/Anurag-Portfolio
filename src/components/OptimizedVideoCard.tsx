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
  const { thumbnailUrl } = parseGoogleDriveUrl(project.driveId);
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
          src={thumbnailUrl}
          alt={project.title}
          loading="lazy"
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
