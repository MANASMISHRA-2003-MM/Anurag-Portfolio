
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolio } from '../assets/portfolio';

export default function Footer() {
  return (
    <>
      <section id="experience" className="section section--black experience">
        <div className="section__head section__head--light">
          <p className="kicker">Experience</p>
          <h2>Different rooms.<br/><em>Same obsession.</em></h2>
        </div>
        <div className="experience-list">
          {portfolio.experience.map((e,i)=><motion.div className="experience-row" key={e.company} initial={{opacity:0,x:-25}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.06,duration:.6}}>
            <span className="experience-row__no">{String(i+1).padStart(2,'0')}</span>
            <div className="experience-row__company">{e.company}</div>
            <div className="experience-row__role">{e.role}</div>
            <div className="experience-row__period">{e.period}{e.location ? ` · ${e.location}` : ''}</div>
          </motion.div>)}
        </div>
        <div className="process" id="process">
          <div className="process__intro"><p className="kicker">Process</p><h3>How an idea<br/>becomes an edit.</h3></div>
          <div className="process__steps">
            {portfolio.process.map(s=><div key={s.no} className="process-step"><span>{s.no}</span><h4>{s.title}</h4><p>{s.desc}</p></div>)}
          </div>
        </div>
        <div className="education">
          <p className="kicker">Education</p>
          {portfolio.education.map(e=><div key={e.institution} className="edu-row"><strong>{e.institution}</strong><span>{e.detail}</span></div>)}
        </div>
      </section>
      <footer id="contact" className="footer">
        <div className="footer__main">
          <div>
            <p className="kicker">Let's create something.</p>
            <h2>Have a story<br/><em>worth telling?</em></h2>
          </div>
          <div className="footer__contact">
            <p>Let's turn your footage into something people want to watch.</p>
            <a className="footer__big-link" href={`tel:${portfolio.site.phone}`}>{portfolio.site.phone} <ArrowUpRight/></a>
            <div className="footer__socials">
              <a href={portfolio.site.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={portfolio.site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {portfolio.site.name}</span>
          <span>{portfolio.site.role}</span>
          <span className="footer__credit">
            <a 
              href="https://mt-technology-fullscreen-video-webs.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer__credit-badge"
              title="Visit Designer & Creator - MT Technology"
            >
              <span className="footer__credit-shimmer"></span>
              <span className="footer__credit-sparkle">✨</span>
              <span className="footer__credit-label">Designed & Built by</span>
              <span className="footer__credit-name">MT Technology</span>
              <ArrowUpRight className="footer__credit-arrow" />
            </a>
          </span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
