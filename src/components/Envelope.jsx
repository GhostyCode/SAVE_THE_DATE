import { FloralStamp, OrnateStamp, Postmark } from './Stamp.jsx';
import FloralCluster from './FloralCluster.jsx';
import './Envelope.css';

/**
 * Sobre verde oliva de la portada.
 * stage: closed → flipping (se voltea) → opening (abre la solapa y asoma la tarjeta)
 */
export default function Envelope({ stage, onOpenClick }) {
  return (
    <div className="envelope-wrap">
      <div
        className={`envelope is-${stage}`}
        role="button"
        tabIndex={0}
        aria-label="Abrir el sobre"
        onClick={onOpenClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenClick()}
      >
        <div className="envelope__shadow" />

        <div className="envelope__card">
          <div className="envelope__face envelope__face--front paper-texture">
            <Postmark className="envelope__postmark" />
            <div className="envelope__stamps">
              <FloralStamp className="envelope__stamp envelope__stamp--1" />
              <OrnateStamp className="envelope__stamp envelope__stamp--2" />
            </div>
            <p className="envelope__names">
              <span className="envelope__name envelope__name--1">Santander</span>
              <span className="envelope__name envelope__name--2">
                <span className="envelope__amp">&amp;</span> Keren
              </span>
            </p>
          </div>

          <div className="envelope__face envelope__face--back">
            <div className="envelope__inner" />
            <div className="envelope__letter">
              <span className="caps">Guarda la fecha</span>
              <strong>21 · 03 · 27</strong>
            </div>
            <div className="envelope__pocket paper-texture" />
            <div className="envelope__flap paper-texture" />
            <div className="envelope__seal">S·K</div>
          </div>
        </div>

        <FloralCluster className="envelope__floral envelope__floral--tl" />
        <FloralCluster className="envelope__floral envelope__floral--br" mirror />
      </div>
    </div>
  );
}
