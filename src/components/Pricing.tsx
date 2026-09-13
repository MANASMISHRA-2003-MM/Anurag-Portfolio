import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolio, type Project } from '../assets/portfolio';
import VideoModal from './VideoModal';
import OptimizedVideoCard from './OptimizedVideoCard';

export default function Pricing() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Stick strictly to 4 featured videos on homepage work-grid
  const homepageProjects = portfolio.projects.slice(0, 4);

  return (
    <>
      <section id="work" className="section section--black work-section">
        <div className="section__head section__head--light">
          <p className="kicker">Selected work</p>
          <h2>Built to be watched.<br/><em>Made to be remembered.</em></h2>
          <p>A curated reel of commercial, creator, sports and story-led work. Click any project to watch in high-definition or explore the complete video archives.</p>
        </div>

        <div className="work-grid">
          {homepageProjects.map((p, i) => (
            <OptimizedVideoCard
              key={p.id}
              project={p}
              index={i}
              onSelect={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>

        {/* See All Works Button Route */}
        <div className="work-grid__cta-wrap">
          <Link to="/work" className="button button--light work-grid__see-all-btn">
            See All Works <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <VideoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        videoSource={selectedProject?.externalUrl || selectedProject?.driveId}
        title={selectedProject?.title}
        category={selectedProject?.category}
        aspectRatio={selectedProject?.aspectRatio}
      />
    </>
  );
}
