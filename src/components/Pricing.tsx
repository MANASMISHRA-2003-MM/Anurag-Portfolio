
import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolio, parseGoogleDriveUrl, type Project } from '../assets/portfolio';
import VideoModal from './VideoModal';

export default function Pricing() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="work" className="section section--black work-section">
        <div className="section__head section__head--light">
          <p className="kicker">Selected work</p>
          <h2>Built to be watched.<br/><em>Made to be remembered.</em></h2>
          <p>A portfolio shelf for commercial, creator, sports and story-led work. Drop your finished project media into the data file and the visual system stays the same.</p>
        </div>
        <div className="work-grid">
          {portfolio.projects.map((p, i) => (
            <motion.div
              key={p.id}
              onClick={() => (p.driveId || p.videoUrl || p.embedUrl) ? setSelectedProject(p) : null}
              className={`work-card work-card--${i % 2 ? 'tall' : 'wide'}`}
              style={{ cursor: (p.driveId || p.videoUrl || p.embedUrl) ? 'pointer' : 'default' }}
              initial={{ opacity: 0, scale: .98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: .15 }}
              transition={{ duration: .8 }}
            >
              <div className="work-card__media">
                <div className="work-card__placeholder">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
                {p.driveId && (
                  <>
                    <iframe
                      src={parseGoogleDriveUrl(p.driveId).embedUrl}
                      className="work-card__iframe"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      title={p.title}
                    />
                    <div className="work-card__play-badge">
                      <span className="work-card__play-icon">▶</span> PLAY VIDEO
                    </div>
                  </>
                )}
                <div className="work-card__veil" />
              </div>
              <div className="work-card__meta">
                <div><span>{p.category}</span><h3>{p.title}</h3></div><ArrowGlyph />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <VideoModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        videoSource={selectedProject?.driveId || selectedProject?.videoUrl || selectedProject?.embedUrl}
        title={selectedProject?.title}
        category={selectedProject?.category}
      />
    </>
  );
}

function ArrowGlyph() { return <span className="arrow-glyph">↗</span>; }
