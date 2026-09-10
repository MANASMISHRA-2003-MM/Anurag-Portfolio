import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolio } from '../assets/portfolio';

export default function WhatsAppFab() {
  const [hovered, setHovered] = useState(false);

  const phone = portfolio.site.phone;
  const waLink = `https://wa.me/91${phone}?text=${encodeURIComponent("Hi Anurag! I'd love to discuss a project with you.")}`;

  return (
    <motion.a
      id="whatsapp-fab"
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Chat on WhatsApp"
    >
      {/* Ping ring */}
      <span className="whatsapp-fab__ping" />

      {/* WhatsApp SVG Icon */}
      <svg
        className="whatsapp-fab__icon"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.004 2.002C8.28 2.002 2.004 8.278 2.004 16.002c0 2.468.644 4.882 1.869 7.013L2 30l7.186-1.834A13.94 13.94 0 0 0 16.004 30c7.724 0 13.996-6.276 13.996-14S23.728 2.002 16.004 2.002Zm0 25.596a11.56 11.56 0 0 1-5.914-1.622l-.424-.252-4.398 1.154 1.174-4.293-.276-.44a11.52 11.52 0 0 1-1.77-6.143c0-6.387 5.2-11.586 11.608-11.586 6.408 0 11.596 5.2 11.596 11.586 0 6.388-5.188 11.596-11.596 11.596Zm6.356-8.678c-.348-.174-2.062-1.018-2.382-1.134-.32-.116-.554-.174-.786.174-.232.348-.902 1.134-1.106 1.368-.204.232-.408.262-.756.088-.348-.174-1.472-.542-2.804-1.73-1.036-.924-1.736-2.066-1.94-2.414-.204-.348-.022-.536.152-.71.158-.156.348-.408.524-.612.174-.204.232-.348.348-.58.116-.232.058-.436-.028-.61-.088-.174-.786-1.898-1.078-2.598-.284-.682-.572-.59-.786-.6-.204-.01-.436-.012-.668-.012s-.612.088-.932.436c-.32.348-1.222 1.194-1.222 2.914 0 1.72 1.25 3.382 1.426 3.614.174.232 2.462 3.76 5.966 5.272.834.36 1.484.576 1.992.736.836.266 1.598.228 2.2.138.67-.1 2.062-.844 2.354-1.658.29-.814.29-1.514.204-1.66-.088-.144-.32-.232-.668-.406Z"
          fill="currentColor"
        />
      </svg>

      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="whatsapp-fab__label"
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            Chat with me
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
