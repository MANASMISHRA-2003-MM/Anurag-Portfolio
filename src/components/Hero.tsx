
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { portfolio } from '../assets/portfolio';

export default function Hero() {
  const scenes = [
    "/hero-videos/plants-desktop.webm",
    "/hero-videos/creative-desktop.webm",
    "/hero-videos/barber-desktop.webm",
    "/hero-videos/tutor-desktop.webm",
    "/hero-videos/wellness-desktop.webm",
  ];
  const [scene, setScene] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setScene(v => (v + 1) % scenes.length), 6200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <>
      <section id="home" className="hero">
        <div className="hero__media">
          <video
            className="hero__video"
            autoPlay muted loop playsInline preload="auto"
            poster=""
            src={scenes[scene]}
            aria-label="Anurag Shakya hero reel"
          />
          <div className="hero__shade" />
          <div className="hero__grain" />
        </div>
        <div className="hero__content">
          <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{delay:.35,duration:.7}} className="hero__eyebrow">
            {portfolio.hero.eyebrow}
          </motion.p>
          <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{delay:.48,duration:.8,ease:[.22,1,.36,1]}}>
            Stories come alive<br/><em>in the edit.</em>
          </motion.h1>
          <motion.p className="hero__desc" initial={{ opacity:0,y:25 }} animate={{ opacity:1,y:0 }} transition={{delay:.62,duration:.7}}>
            {portfolio.hero.description}
          </motion.p>
          <motion.div className="hero__actions" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{delay:.78,duration:.7}}>
            <a className="button button--light" href={portfolio.hero.primaryCta.href}>{portfolio.hero.primaryCta.label}<ArrowRight size={16}/></a>
            <a className="button button--ghost" href={portfolio.hero.secondaryCta.href}>{portfolio.hero.secondaryCta.label}</a>
          </motion.div>
        </div>
        <div className="hero__bottom">
          <span>Scroll to explore</span>
          <span className="hero__line" />
          <span>Video Editor · Creative Professional</span>
        </div>
      </section>
      <section className="stat-band">
        <div className="stat-band__inner">
          {portfolio.stats.map((s, i) => <motion.div key={i} className="stat" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08,duration:.6}}>
            <div className="stat__value">{s.value}</div><div className="stat__label">{s.label}</div>
          </motion.div>)}
        </div>
      </section>
    </>
  );
}
