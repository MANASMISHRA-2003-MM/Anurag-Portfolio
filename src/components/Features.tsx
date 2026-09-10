
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolio } from '../assets/portfolio';

export default function Features() {
  return (
    <section id="services" className="section section--cream">
      <div className="section__head">
        <p className="kicker">What I do</p>
        <h2>From the first cut<br/><em>to the final frame.</em></h2>
        <p>Editing is where footage becomes a story. I work across formats, genres and platforms to make every second earn its place.</p>
      </div>
      <div className="pill-row" aria-label="Specialties">
        {[...portfolio.services.slice(0,8), ...portfolio.services.slice(0,8)].map((s,i)=><span key={i} className="pill">{s.title}</span>)}
      </div>
      <div className="service-grid">
        {portfolio.services.map((s, i)=>(
          <motion.article key={s.title} className="service-card" initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{delay:(i%4)*.06,duration:.7}}>
            <div className="service-card__index">{String(i+1).padStart(2,'0')}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-card__arrow"><ArrowUpRight size={17}/></span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
