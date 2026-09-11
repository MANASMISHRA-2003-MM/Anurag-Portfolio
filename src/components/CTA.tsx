
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolio } from '../assets/portfolio';
import VideoModal from './VideoModal';

export default function CTA() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <section id="showreel" className="showreel">
        <div className="showreel__frame" onClick={() => setIsPlaying(true)} style={{ cursor: 'pointer' }}>
          <div className="showreel__poster">
            <div className="showreel__play">PLAY</div>
          </div>
          <div className="showreel__overlay" />
          <motion.div className="showreel__content" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}}>
            <p className="kicker">Showreel</p>
            <h2>A glimpse into the worlds,<br/><em>stories and styles.</em></h2>
            <button 
              className="button button--light" 
              onClick={(e) => { e.stopPropagation(); setIsPlaying(true); }}
            >
              Watch Showreel <ArrowUpRight size={16}/>
            </button>
          </motion.div>
        </div>
      </section>

      <VideoModal
        isOpen={isPlaying}
        onClose={() => setIsPlaying(false)}
        videoSource={portfolio.showreel.driveUrl || portfolio.showreel.driveId}
        title="Featured Showreel"
        category="Highlight Edit"
      />
    </>
  );
}
