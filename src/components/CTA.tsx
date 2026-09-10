
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolio } from '../assets/portfolio';

export default function CTA() {
  return (
    <section id="showreel" className="showreel">
      <div className="showreel__frame">
        <div className="showreel__poster"><div className="showreel__play">PLAY</div></div>
        <div className="showreel__overlay" />
        <motion.div className="showreel__content" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}}>
          <p className="kicker">Showreel</p>
          <h2>A glimpse into the worlds,<br/><em>stories and styles.</em></h2>
          <a className="button button--light" href="#contact">Watch Showreel <ArrowUpRight size={16}/></a>
        </motion.div>
      </div>
    </section>
  );
}
