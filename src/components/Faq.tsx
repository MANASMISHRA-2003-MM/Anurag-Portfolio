
import { motion } from 'framer-motion';
import { portfolio } from '../assets/portfolio';

export default function Faq() {
  return (
    <section id="about" className="section section--cream faq-section">
      <div className="section__head">
        <p className="kicker">About the editor</p>
        <h2>Experience that works<br /><em>behind the story.</em></h2>
        <p>5+ years across sports, D2C brands, YouTube, social media and advertising, plus production, shooting, scripting and AI-assisted creative workflows.</p>
      </div>

      <div className="about-layout">

        {/* ── LEFT: sticky photo column ─────────────────── */}
        <motion.div
          className="about-photo-col"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-photo-frame">
            <img
              src="/About_Photo.webp"
              alt="Anurag Shakya – Video Editor"
              className="about-photo-img"
              loading="lazy"
            />
            <div className="about-photo-tag">
              <span className="about-photo-tag__dot" />
              Anurag Shakya
            </div>
          </div>
        </motion.div>

        {/* ── MIDDLE: quote + creator list ─────────────── */}
        <motion.div
          className="about-mid-col"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="big-quote">“Good editing is invisible when it works, you only feel the story.”</p>
          <div className="creator-list">
            {portfolio.creators.map((c, i) => (
              <div key={c}><span>0{i + 1}</span>{c}</div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: FAQ accordion ─────────────────────── */}
        <div className="faq-list" id="faq">
          {portfolio.faq.map((f, i) => (
            <motion.details
              key={i}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <summary><span>{f.q}</span><span>+</span></summary>
              <p>{f.a}</p>
            </motion.details>
          ))}
        </div>

      </div>
    </section>
  );
}
