import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Cover from './components/Cover.jsx';
import Hero from './components/Hero.jsx';
import Countdown from './components/Countdown.jsx';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && <Cover key="cover" onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>

      <main className="main" aria-hidden={!isOpen}>
        <Hero />
        <Countdown />
      </main>
    </>
  );
}
