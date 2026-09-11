import { MenuIcon, XIcon, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { portfolio } from '../assets/portfolio';

/* ── constants ─────────────────────────────────────────────── */
const EASE_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];
const NAME_CHARS = "Anurag".split("");

/* ── entrance variants ─────────────────────────────────────── */
const navWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};

const monogramEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.55, rotate: -10 },
  show: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.7, ease: EASE_EXPO }
  },
};


const subtitleEntrance: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 0.62, x: 0,
    transition: { duration: 0.55, ease: EASE_EXPO }
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.header
      initial={{ y: -34, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: EASE_EXPO }}
      className="s-nav"
    >
      <nav className="s-nav__inner">

        {/* ── Wordmark ──────────────────────────────────── */}
        <motion.a
          href="#home"
          className="s-wordmark"
          aria-label="Anurag — Home"
          variants={navWrap}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.04, transition: { duration: 0.28, ease: 'easeOut' } }}
        >

          {/* Monogram — floats like a bobbing wave */}
          <motion.span
            className="s-wordmark__monogram"
            variants={monogramEntrance}
            animate={{
              y: [0, -5, 0, -2, 0],
              rotate: [0, 2, 0, -1, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 1.9,
              ease: 'easeInOut',
              delay: 1.9,
            }}
          >
            <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="10" y1="38" x2="22" y2="6" stroke="currentColor" strokeWidth="0.9" />
              <line x1="22" y1="6" x2="34" y2="38" stroke="currentColor" strokeWidth="0.9" />
              <line x1="14" y1="28" x2="30" y2="28" stroke="currentColor" strokeWidth="0.7" />
              <path d="M30 14c0-4-3.5-7-8-7s-8 3-8 7c0 8 16 5 16 15 0 4.5-3.5 8-8 8s-8-3.5-8-8"
                stroke="currentColor" strokeWidth="0.9" fill="none" />
              <line x1="16" y1="40" x2="32" y2="4" stroke="currentColor" strokeWidth="0.45" opacity="0.35" />
            </svg>
          </motion.span>

          {/* Text stack */}
          <span className="s-wordmark__text">

            {/* Name — letter-by-letter continuous travelling wave */}
            <span className="s-wordmark__name" style={{ display: 'inline-flex', gap: '0.02em' }}>
              {NAME_CHARS.map((char, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: [0, -6, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.5 + i * 0.08 },
                    y: {
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 0,
                      ease: 'easeInOut',
                      delay: 0.8 + i * 0.24,
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Subtitle — flowing opacity wave */}
            <motion.span
              className="s-wordmark__subtitle"
              variants={subtitleEntrance}
              animate={{ opacity: [0.62, 1, 0.45, 1, 0.62] }}
              transition={{
                opacity: {
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                  delay: 2.4,
                }
              }}
            >
              Video Editor &amp; Creative
            </motion.span>

          </span>
        </motion.a>

        {/* nav links */}
        <div className="s-nav__links">
          {portfolio.navigation.slice(0, 4).map(l =>
            <a key={l.label} href={l.href}>{l.label}</a>
          )}
          <a href="#showreel">{portfolio.navigation[4].label}</a>
        </div>
        <a className="s-nav__cta" href="#contact">Let's Talk <ArrowUpRight size={14} /></a>
        <button className="s-nav__mobile" onClick={() => setIsOpen(v => !v)} aria-label="Open menu">
          {isOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>
    </motion.header>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          className="s-mobile-menu"
        >
          {portfolio.navigation.map(l =>
            <a key={l.label} href={l.href} onClick={() => setIsOpen(false)}>{l.label}</a>
          )}
          <a className="s-mobile-menu__cta" href="#contact" onClick={() => setIsOpen(false)}>
            Let's Talk <ArrowUpRight size={15} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
