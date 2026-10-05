import { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useCountdown from '../hooks/useCountdown.js';
import FloralCluster from './FloralCluster.jsx';
import './Countdown.css';

const WEDDING_DATE = new Date(2027, 2, 21, 0, 0, 0).getTime();
const ease = [.65, 0, .35, 1];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

function pad(n) {
  return String(n).padStart(2, '0');
}

function TickNumber({ value }) {
  return (
    <span className="countdown__number">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: .35, ease }}
          style={{ display: 'inline-block' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CallaSprig() {
  return (
    <svg className="countdown__sprig" viewBox="0 0 200 40" aria-hidden="true">
      <path d="M28 22 C70 30 120 28 190 12" stroke="#6f7d48" strokeWidth="1.6" fill="none" />
      <path d="M30 24 C80 34 130 30 186 18" stroke="#8d9a5c" strokeWidth="1" fill="none" />
      <path d="M30 22 C18 8 6 10 2 18 C8 30 20 32 30 24 Z" fill="#fbf8f1" stroke="#d8d2bf" strokeWidth=".6" />
      <path d="M28 22 C14 18 10 22 8 24" stroke="#e7c86a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M34 26 C26 36 14 38 8 36 C14 30 24 26 34 26 Z" fill="#f4efe2" />
    </svg>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, hasPassed } = useCountdown(WEDDING_DATE);
  const units = [
    { value: String(days), label: 'Días' },
    { value: pad(hours), label: 'Horas' },
    { value: pad(minutes), label: 'Minutos' },
    { value: pad(seconds), label: 'Segundos' },
  ];

  return (
    <section className="countdown" id="detalles">
      {/* Banda fotográfica en blanco y negro */}
      <div className="countdown__band countdown__band--photo">
        <div className="countdown__bg">
          <img src="photos/2.jpeg" alt="" aria-hidden="true" loading="lazy" />
        </div>
        <motion.div
          className="countdown__photo-copy"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: .5 }}
        >
          <p className="countdown__formal">
            La invitación formal
            <br />
            <span>llegará pronto…</span>
          </p>
          <div className="countdown__pill caps">
            21 de marzo de 2027
            <FloralCluster className="countdown__pill-floral" />
          </div>
        </motion.div>
      </div>

      {/* Contador */}
      <motion.div
        className="countdown__band countdown__band--timer"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: .4 }}
      >
        <p className="countdown__eyebrow">Nos vemos pronto</p>

        {!hasPassed ? (
          <div className="countdown__timer" role="timer" aria-label="Tiempo restante para la boda">
            {units.map((u, i) => (
              <Fragment key={u.label}>
                {i > 0 && <span className="countdown__sep" aria-hidden="true">:</span>}
                <div className="countdown__unit">
                  <TickNumber value={u.value} />
                  <span className="countdown__label caps">{u.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        ) : (
          <p className="countdown__message">¡Hoy es el día! Santander &amp; Keren ya son uno solo.</p>
        )}

        <CallaSprig />
      </motion.div>

      {/* Pie */}
      <footer className="countdown__band countdown__band--footer">
        <p className="countdown__couple caps">Santander &amp; Keren</p>
        <p className="countdown__date caps">21 . 03 . 27</p>
        <p className="countdown__place">Riohacha, La Guajira, Colombia</p>
        <a className="countdown__back caps" href="#inicio">Volver arriba</a>
      </footer>
    </section>
  );
}
