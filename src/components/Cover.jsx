import { useState } from 'react';
import { motion } from 'framer-motion';
import Envelope from './Envelope.jsx';
import './Cover.css';

const ease = [.65, 0, .35, 1];

export default function Cover({ onOpen }) {
  const [stage, setStage] = useState('closed'); // closed | flipping | opening

  function handleOpen() {
    if (stage !== 'closed') return;
    setStage('flipping');
    window.setTimeout(() => setStage('opening'), 850);
    window.setTimeout(onOpen, 2100);
  }

  return (
    <motion.section
      className="cover"
      exit={{ opacity: 0 }}
      transition={{ duration: .8, ease }}
    >
      <div className="cover__content">
        <motion.p
          className="cover__eyebrow caps"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .9, ease }}
        >
          Save the Date
        </motion.p>

        <motion.div
          className="cover__envelope"
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.2, ease, delay: .25 }}
        >
          <Envelope stage={stage} onOpenClick={handleOpen} />
        </motion.div>

        <motion.button
          type="button"
          className={`cover__hint caps ${stage !== 'closed' ? 'is-hidden' : ''}`}
          onClick={handleOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .9, ease, delay: 1 }}
        >
          Toca el sobre para abrir
        </motion.button>
      </div>
    </motion.section>
  );
}
