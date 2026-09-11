
import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolio, parseGoogleDriveUrl } from '../assets/portfolio';

export default function Pricing() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="work" className="section section--black work-section">
      <div className="section__head section__head--light">
        <p className="kicker">Selected work</p>
        <h2>Built to be watched.<br/><em>Made to be remembered.</em></h2>
        <p>A portfolio shelf for commercial, creator, sports and story-led work. Drop your finished project media into the data file and the visual system stays the same.</p>
      </div>
      <div className="work-grid">
        {portfolio.projects.map((p, i) => {
          const isPlaying = playingId === p.id;
          const { embedUrl } = parseGoogleDriveUrl(p.driveId || p.videoUrl || p.embedUrl);

          return (
            <motion.div
              key={p.id}
              className={`work-card work-card--${i % 2 ? 'tall' : 'wide'}`}
              initial={{ opacity: 0, scale: .98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: .15 }}
              transition={{ duration: .8 }}
            >
              <div className="work-card__media">
                {isPlaying && embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="work-card__inline-iframe"
                    allow="autoplay; encrypted-media; fullscreen"
                    title={p.title}
                  />
                ) : (
                  <>
                    <div className="work-card__placeholder">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    {embedUrl && (
                      <button
                        className="work-card__play-badge"
                        onClick={() => setPlayingId(p.id)}
                        aria-label={`Play ${p.title}`}
                      >
                        <span className="work-card__play-icon">▶</span> PLAY VIDEO
                      </button>
                    )}
                    <div className="work-card__veil" onClick={() => embedUrl && setPlayingId(p.id)} />
                  </>
                )}
              </div>
              <div className="work-card__meta">
                <div><span>{p.category}</span><h3>{p.title}</h3></div><ArrowGlyph />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ArrowGlyph() { return <span className="arrow-glyph">↗</span>; }
