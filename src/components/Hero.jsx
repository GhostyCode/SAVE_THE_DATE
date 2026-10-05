import { motion } from 'framer-motion';
import FloralCluster from './FloralCluster.jsx';
import './Hero.css';

const ease = [.65, 0, .35, 1];

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease, delay } },
});

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <motion.div
        className="hero__stage"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: .3 }}
      >
        <div className="hero__env-back paper-texture" aria-hidden="true" />
        <div className="hero__env-flap paper-texture" aria-hidden="true" />

        <motion.figure className="hero__polaroid hero__polaroid--a" variants={rise(.15)}>
          <img src="photos/3.jpeg" alt="Santander de rodillas abrazando a Keren entre rosas blancas" />
        </motion.figure>
        <motion.figure className="hero__polaroid hero__polaroid--b" variants={rise(.3)}>
          <img src="photos/1.jpeg" alt="Santander y Keren sonriendo, frente con frente" />
        </motion.figure>

        <motion.a href="#detalles" className="hero__badge" variants={rise(.55)}>
          <span className="hero__badge-small">Toca para ver</span>
          <span className="hero__badge-big">los detalles</span>
        </motion.a>

        <motion.div className="hero__ticket" variants={rise(.42)}>
          <div className="hero__ticket-stub" aria-hidden="true">
            <span>Santander + Keren</span>
          </div>
          <div className="hero__ticket-body">
            <span className="hero__ticket-eyebrow caps">Guarda nuestra fecha</span>
            <span className="hero__ticket-date">21.03.27</span>
            <span className="hero__ticket-script">¡Nos vamos a casar!</span>
          </div>
        </motion.div>

        <div className="hero__env-pocket paper-texture" aria-hidden="true">
          <span className="hero__monogram">S<em>&amp;</em>K</span>
        </div>

        <FloralCluster className="hero__floral hero__floral--l" />
        <FloralCluster className="hero__floral hero__floral--r" mirror />
      </motion.div>

      <motion.div
        className="hero__info"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: .6 }}
        transition={{ duration: 1, ease }}
      >
        <h1 className="hero__names">Santander Iglesias &amp; Keren León</h1>
        <p className="hero__date caps">
          21<sup>de</sup> marzo 2027
        </p>
        <p className="hero__place caps">Riohacha, La Guajira</p>
      </motion.div>
    </section>
  );
}
