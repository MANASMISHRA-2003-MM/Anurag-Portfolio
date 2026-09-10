
import { MenuIcon, XIcon, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolio } from '../assets/portfolio';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="s-nav"
    >
      <nav className="s-nav__inner">
        <a href="#home" className="s-wordmark" aria-label="Anurag Shakya — Home">
          <span className="s-wordmark__monogram">
            {/* AS monogram SVG — stylized thin serif letterforms */}
            <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Letter A */}
              <line x1="10" y1="38" x2="22" y2="6" stroke="currentColor" strokeWidth="0.9"/>
              <line x1="22" y1="6" x2="34" y2="38" stroke="currentColor" strokeWidth="0.9"/>
              <line x1="14" y1="28" x2="30" y2="28" stroke="currentColor" strokeWidth="0.7"/>
              {/* Letter S — elegant curve */}
              <path d="M30 14c0-4-3.5-7-8-7s-8 3-8 7c0 8 16 5 16 15 0 4.5-3.5 8-8 8s-8-3.5-8-8" stroke="currentColor" strokeWidth="0.9" fill="none"/>
              {/* Decorative diagonal slash */}
              <line x1="16" y1="40" x2="32" y2="4" stroke="currentColor" strokeWidth="0.45" opacity="0.35"/>
            </svg>
          </span>
          <span className="s-wordmark__text">
            <span className="s-wordmark__name">Anurag Shakya</span>
            <span className="s-wordmark__subtitle">Video Editor & Creative</span>
          </span>
        </a>
        <div className="s-nav__links">
          {portfolio.navigation.slice(0, 4).map(l => <a key={l.label} href={l.href}>{l.label}</a>)}
          <a href="#showreel">{portfolio.navigation[4].label}</a>
        </div>
        <a className="s-nav__cta" href="#contact">Let's Talk <ArrowUpRight size={14}/></a>
        <button className="s-nav__mobile" onClick={() => setIsOpen(v => !v)} aria-label="Open menu">
          {isOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="s-mobile-menu">
            {portfolio.navigation.map(l => <a key={l.label} href={l.href} onClick={() => setIsOpen(false)}>{l.label}</a>)}
            <a className="s-mobile-menu__cta" href="#contact" onClick={() => setIsOpen(false)}>Let's Talk <ArrowUpRight size={15}/></a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
