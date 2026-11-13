import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Download,
  Gamepad2,
  Heart,
  MapPin,
  Music2,
  PartyPopper,
  Sparkles,
  Star,
  VolumeX,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Confetti } from "./components/Effects";
import { RockoPuzzle } from "./components/RockoPuzzle";
import { World } from "./components/World";
import { invitation as c } from "./config/invitation";
import { useCountdown } from "./hooks/useCountdown";
import { RSVP } from "./sections/RSVP";
import {
  asset,
  calendarUrl,
  downloadCalendar,
  hasEvent,
  validDate,
} from "./utils/calendar";
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
export default function App() {
  const [entryStage, setEntryStage] = useState<
    "welcome" | "puzzle" | "invitation"
  >("welcome");
  const [burst, setBurst] = useState(0);
  const [taps, setTaps] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [musicUnlocked, setMusicUnlocked] = useState(false);
  const [audioError, setAudioError] = useState("");
  const audio = useRef<HTMLAudioElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { left, values } = useCountdown();
  useEffect(() => {
    if (!c.music) return;
    const player = new Audio(asset(c.music));
    player.loop = true;
    player.volume = 0.3;
    audio.current = player;
    return () => {
      player.pause();
      audio.current = null;
    };
  }, []);
  async function startMusic() {
    if (!audio.current) return;
    try {
      await audio.current.play();
      setPlaying(true);
      setAudioError("");
    } catch {
      setAudioError("Toca el botón de música para activar el audio.");
    }
  }
  async function toggleMusic() {
    if (!audio.current) {
      setAudioError("La música todavía no está configurada.");
      return;
    }
    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      try {
        await audio.current.play();
        setPlaying(true);
        setAudioError("");
      } catch {
        setAudioError(
          "No se pudo reproducir la música. Puedes continuar con la invitación.",
        );
      }
    }
  }
  const date = validDate(c.startsAt)
    ? new Intl.DateTimeFormat("es-MX", {
        timeZone: c.timeZone,
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(c.startsAt))
    : "Fecha por confirmar";
  const time = validDate(c.startsAt)
    ? new Intl.DateTimeFormat("es-MX", {
        timeZone: c.timeZone,
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(c.startsAt))
    : "Hora por confirmar";
  const safeMaps =
    !!c.mapsUrl &&
    /^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+\/|maps\.app\.goo\.gl\/|goo\.gl\/maps)/.test(
      c.mapsUrl,
    );
  function celebrate() {
    setTaps((t) => t + 1);
    if ((taps + 1) % 5 === 0) {
      setBurst((b) => b + 1);
      setAudioError(
        "¡Nivel secreto desbloqueado! Eres parte del equipo de Dalia.",
      );
    }
  }
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#aventura">
        Saltar al contenido
      </a>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      {!reduced && <Confetti burst={burst} />}
      {entryStage === "welcome" ? (
        <main className="welcome">
          <div className="welcome-content">
            <span className="tag">
              <Sparkles size={14} /> UNA NUEVA AVENTURA TE ESPERA
            </span>
            <World />
            <h1>{c.messages.welcome}</h1>
            <p>{c.messages.subtitle}</p>
            <button
              autoFocus
              className="button primary"
              onClick={() => {
                setEntryStage("puzzle");
                setBurst((b) => b + 1);
                window.scrollTo(0, 0);
              }}
            >
              <Gamepad2 size={21} /> ¡Entrar al juego! <ArrowRight size={19} />
            </button>
            <span className="tiny">
              INVITACIÓN EXCLUSIVA · JUGADOR/A ESPECIAL
            </span>
          </div>
        </main>
      ) : entryStage === "puzzle" ? (
        <RockoPuzzle
          onCelebrate={() => setBurst((b) => b + 1)}
          onOpenGift={() => { setMusicUnlocked(true); void startMusic(); }}
          onEnter={() => {
            setEntryStage("invitation");
            window.scrollTo(0, 0);
            window.requestAnimationFrame(() =>
              document.getElementById("aventura")?.focus(),
            );
          }}
        />
      ) : (
        <>
          <header className="nav">
            <a href="#aventura" className="brand">
              <span className="brand-icon">d.</span> dalia
              <span className="brand-level">/ level {c.age}</span>
            </a>
            <a href="#equipo" className="nav-cta">
              Me uno al equipo <ArrowUpRight size={15} />
            </a>
          </header>
          <motion.main
            id="aventura"
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <section className="hero">
              <div className="hero-copy">
                <span className="tag">
                  <span className="status-dot" /> NUEVA AVENTURA DESBLOQUEADA
                </span>
                <p className="hero-kicker">
                  DALIA’S BIRTHDAY <span>✦</span>
                </p>
                <h1>
                  Un nuevo nivel.
                  <br />
                  La misma <em>magia.</em>
                </h1>
                <p className="hero-sub">
                  ¡{c.name} cumple <strong>{c.age} años!</strong>
                  <br />
                  {c.messages.hero}.
                </p>
                <a className="button primary" href="#detalles">
                  Descubre la aventura <ArrowDown size={19} />
                </a>
                <div className="hero-foot">
                  <span className="mini-stars">✦ ✦ ✦</span> Construyamos un
                  recuerdo increíble.
                </div>
              </div>
              <div className="hero-art">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <span className="floating-label label-top">
                  <Star size={14} fill="currentColor" /> LEVEL {c.age} UNLOCKED
                </span>
                <World />
                <button
                  onClick={celebrate}
                  className="level-badge"
                  aria-label={`Nivel ${c.age}. Tócalo cinco veces para una sorpresa`}
                >
                  <span>LEVEL</span>
                  <strong>{c.age}</strong>
                  <span>
                    UNLOCKED <Sparkles size={10} />
                  </span>
                </button>
                <span className="floating-label label-bottom">
                  <Gamepad2 size={17} /> Player: {c.name}{" "}
                  <span className="online-dot" />
                </span>
                <span className="art-spark">✦</span>
              </div>
              <a href="#cuenta" className="scroll-hint">
                DESLIZA PARA EXPLORAR <ArrowDown size={14} />
              </a>
            </section>
            <div className="ticker" aria-hidden="true">
              <span>+ DIVERSIÓN SIN LÍMITES</span>
              <span>✦</span>
              <span>CREA RECUERDOS</span>
              <span>✦</span>
              <span>LEVEL {c.age} UNLOCKED</span>
              <span>✦</span>
              <span>EL MEJOR EQUIPO</span>
              <span>✦</span>
            </div>
            <Reveal>
              <section id="cuenta" className="countdown section">
                <div>
                  <span className="eyebrow">LA AVENTURA ESTÁ POR COMENZAR</span>
                  <h2>{c.messages.countdown}</h2>
                  <p>
                    {left === null
                      ? "Estamos preparando la fiesta. ¡Pronto tendrás la fecha!"
                      : left === 0
                        ? "¡El gran día ha llegado!"
                        : "El siguiente nivel está cada vez más cerca."}
                  </p>
                </div>
                {left !== 0 && (
                  <div className="timer" aria-label="Cuenta regresiva">
                    {values.map((v, i) => (
                      <div key={i}>
                        <strong>{v}</strong>
                        <span>
                          {["DÍAS", "HORAS", "MINUTOS", "SEGUNDOS"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </Reveal>
            <Reveal>
              <section id="detalles" className="section details">
                <div className="section-heading">
                  <span className="eyebrow">GUARDA TU PARTIDA</span>
                  <h2>El punto de encuentro</h2>
                  <p>Todo lo que necesitas para unirte a la diversión.</p>
                </div>
                <div className="detail-grid">
                  <article className="detail-card">
                    <span className="icon-box lavender">
                      <CalendarDays />
                    </span>
                    <span className="card-label">CUÁNDO</span>
                    <h3>{date}</h3>
                    <p>{time}</p>
                    <span className="card-foot">Hora de Ciudad de México</span>
                  </article>
                  <article className="detail-card">
                    <span className="icon-box blue">
                      <MapPin />
                    </span>
                    <span className="card-label">DÓNDE</span>
                    <h3>{c.venue || "Un lugar por descubrir"}</h3>
                    <p>{c.address || "La dirección está por confirmar."}</p>
                    {safeMaps ? (
                      <a
                        className="text-link"
                        href={c.mapsUrl!}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver ubicación <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <span className="card-foot">Ubicación pendiente</span>
                    )}
                  </article>
                </div>
                <div className="calendar-bar">
                  <span>
                    <CalendarDays size={18} /> Reserva espacio para esta
                    aventura
                  </span>
                  <div>
                    <a
                      aria-disabled={!hasEvent()}
                      className="small-button"
                      href={hasEvent() ? calendarUrl() : undefined}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Google Calendar <ArrowUpRight size={14} />
                    </a>
                    <button
                      className="small-button"
                      disabled={!hasEvent()}
                      onClick={downloadCalendar}
                    >
                      <Download size={15} /> Archivo .ics
                    </button>
                  </div>
                </div>
                {!hasEvent() && (
                  <p className="pending-note">
                    Los calendarios estarán disponibles al confirmar fecha y
                    horario.
                  </p>
                )}
              </section>
            </Reveal>
            <Reveal>
              <section className="missions section">
                <div className="mission-intro">
                  <span className="tag dark-tag">
                    <Gamepad2 size={15} /> QUEST /{" "}
                    {c.age.toString().padStart(2, "0")}
                  </span>
                  <h2>
                    Tu misión,
                    <br />
                    si decides <em>aceptarla...</em>
                  </h2>
                  <p>
                    No necesitas superpoderes.
                    <br />
                    Solo muchas ganas de pasarla increíble.
                  </p>
                  <span className="mission-star">✧</span>
                </div>
                <div className="mission-list">
                  {c.messages.missions.map((mission, i) => {
                    const Icon = [Zap, Heart, PartyPopper][i];
                    return (
                      <Reveal key={mission}>
                        <div className="mission">
                          <span className="mission-number">0{i + 1}</span>
                          <Icon size={23} />
                          <p>{mission}</p>
                          <Check size={17} className="mission-check" />
                        </div>
                      </Reveal>
                    );
                  })}
                  <span className="reward">
                    <Sparkles size={15} /> RECOMPENSA: RECUERDOS PARA SIEMPRE
                  </span>
                </div>
              </section>
            </Reveal>
            <Reveal>
              <RSVP />
            </Reveal>
            <Reveal>
              <section className="meet section">
                <MapPin size={28} />
                <h2>Nos vemos en el mapa</h2>
                <p>
                  {c.address ||
                    "El destino de nuestra aventura se revelará pronto."}
                </p>
                {safeMaps ? (
                  <a
                    className="button secondary"
                    href={c.mapsUrl!}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cómo llegar <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <button className="button secondary" disabled>
                    Ubicación por confirmar
                  </button>
                )}
              </section>
            </Reveal>
            <footer className="footer">
              <div className="footer-stars" aria-hidden="true">
                ✦ <span>✧</span> ✦
              </div>
              <span className="eyebrow">ESTA AVENTURA ES MEJOR CONTIGO</span>
              <h2>{c.messages.farewell}</h2>
              <p>Nos vemos en el siguiente nivel.</p>
              <p className="signature">Con cariño, {c.name} 💜</p>

              <div className="footer-bottom">
                <span>
                  {c.name.toUpperCase()} / LEVEL {c.age}
                </span>
                <span>HECHO CON MAGIA Y MUCHOS BLOQUES ✦</span>
              </div>
            </footer>
          </motion.main>

        </>
      )}
      {musicUnlocked && (
        <button
          className="music-button"
          onClick={toggleMusic}
          aria-label={playing ? "Pausar música" : "Activar música"}
          aria-pressed={playing}
        >
          {playing ? <Music2 size={20} /> : <VolumeX size={20} />}
        </button>
      )}
      <div className="audio-notice" role="status">
        {audioError}
      </div>
    </MotionConfig>
  );
}
