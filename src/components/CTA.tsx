import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section id="showreel" className="showreel">
      <div 
        className="showreel__frame" 
        onClick={() => navigate('/work')} 
        style={{ cursor: 'pointer' }}
      >
        <div className="showreel__poster">
          <div className="showreel__play">EXPLORE WORK</div>
        </div>
        <div className="showreel__overlay" />
        <motion.div 
          className="showreel__content" 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
        >
          <p className="kicker">Showreel &amp; Gallery</p>
          <h2>A glimpse into the worlds,<br/><em>stories and styles.</em></h2>
          <Link 
            to="/work" 
            className="button button--light" 
            onClick={(e) => e.stopPropagation()}
          >
            Watch Showreel &amp; Gallery <ArrowUpRight size={16}/>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
