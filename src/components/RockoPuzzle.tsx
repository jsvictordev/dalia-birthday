import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Check,
  Gift,
  Heart,
  PawPrint,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { invitation } from "../config/invitation";
import { initialTiles, isPuzzleSolved, swapTiles } from "../utils/puzzle";

function RockoArt({ tile }: { tile?: number }) {
  const x = tile === undefined ? 0 : (tile % 3) * 100;
  const y = tile === undefined ? 0 : Math.floor(tile / 3) * 100;
  return (
    <svg
      viewBox={tile === undefined ? "0 0 300 300" : `${x} ${y} 100 100`}
      aria-hidden="true"
    >
      <path fill="#e8ddfa" d="M0 0h300v300H0z" />
      <path
        d="M0 50h300M0 150h300M0 250h300M50 0v300M150 0v300M250 0v300"
        stroke="#d6c4ef"
        strokeWidth="2"
      />
      <path d="m12 22 28-8 17 10-28 9Z" fill="#c5a5ef" />
      <path d="M12 22v24l17 11V33l28-9v24L29 57" fill="#ab88de" />
      <path d="m250 30 12-4 12 5-12 5Z" fill="#ffe483" />
      <path d="M250 30v15l12 6V36l12-5v14l-12 6" fill="#f2c756" />
      {/* Rocko: french poodle original, con rizos y silueta de bloques. */}
      <ellipse cx="153" cy="268" rx="88" ry="12" fill="#c5ace7" opacity=".5" />
      <path
        d="M209 193q52-18 37-54"
        fill="none"
        stroke="#bdb3ce"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M209 190q47-15 35-49"
        fill="none"
        stroke="#fffaf3"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="m233 123 12-6 13 7 4 15-8 13-18-1-10-12Z"
        fill="#fffaf3"
        stroke="#c9bfd7"
        strokeWidth="3"
      />
      <path
        d="M104 166h99v64h-99z"
        fill="#fffaf3"
        stroke="#c9bfd7"
        strokeWidth="3"
      />
      <path
        d="M115 211h22v44h-22zM176 211h22v44h-22z"
        fill="#eee7f1"
        stroke="#c9bfd7"
        strokeWidth="3"
      />
      <path
        d="m103 246 12-8 17 2 10 10-3 14h-39Z"
        fill="#fffaf3"
        stroke="#c9bfd7"
        strokeWidth="3"
      />
      <path
        d="m165 246 13-8 17 2 10 10-3 14h-40Z"
        fill="#fffaf3"
        stroke="#c9bfd7"
        strokeWidth="3"
      />
      <path
        d="M88 100h111v78H88z"
        fill="#fffaf3"
        stroke="#c9bfd7"
        strokeWidth="3"
      />
      <path
        d="m80 103-15 15-2 38 11 18 20-2 10-17-4-40Z"
        fill="#e4dce9"
        stroke="#bfb2ce"
        strokeWidth="3"
      />
      <path
        d="m196 103 17 14 3 39-12 18-20-2-9-17 5-40Z"
        fill="#e4dce9"
        stroke="#bfb2ce"
        strokeWidth="3"
      />
      <path
        d="m89 96 2-16 17-5 5-15 20-1 13 8 17-6 16 9 1 14 16 6 4 19-13 9H99Z"
        fill="#fffaf3"
        stroke="#c9bfd7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M106 86q7-12 15 0m9-10q9-10 17 1m7 10q10-12 19-1M78 132q-9 7 0 14m119-13q10 6 1 14M118 188q9-12 18 0m20 12q9-11 18 0m8-17q8-9 15 1"
        fill="none"
        stroke="#d9cede"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="111" y="119" width="10" height="13" rx="3" fill="#40314f" />
      <rect x="164" y="119" width="10" height="13" rx="3" fill="#40314f" />
      <path d="m123 138 18-5 19 5 6 13-11 14h-27l-12-13Z" fill="#eee5ec" />
      <path d="m133 139 9-4 10 4-4 9h-11Z" fill="#493653" />
      <path
        d="M142 148v7m-13 0q5 10 13 1 9 9 14-1"
        fill="none"
        stroke="#68516e"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M138 160h9v9q-5 8-9 0Z" fill="#f896b9" />
      <path d="M99 174h87v13H99z" fill="#8b5cf6" />
      <path d="m142 184 10 6v12l-10 6-10-6v-12Z" fill="#facc5c" />
      <path d="m140 190 5 0 2 3-4 3 4 5h-4l-3-4v4h-3v-11Z" fill="#886339" />
      <path d="m31 188 7-7 8 7 7-7 8 7v9l-15 15-15-15Z" fill="#ff84b6" />
      <path d="M253 78h9v-9h8v9h9v8h-9v9h-8v-9h-9Z" fill="#fff5c3" />
      <path
        d="M15 277h48v9H15zM245 258h10v-10h10v10h10v10h-10v10h-10v-10h-10Z"
        fill="#c5ace7"
      />
    </svg>
  );
}

export function RockoPuzzle({
  onEnter,
  onCelebrate,
  onOpenGift,
}: {
  onEnter: () => void;
  onCelebrate: () => void;
  onOpenGift: () => void;
}) {
  const [tiles, setTiles] = useState(initialTiles);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [phase, setPhase] = useState<"puzzle" | "gift" | "opening">("puzzle");
  const [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const enter = useRef(onEnter);
  enter.current = onEnter;
  const reduced = useReducedMotion();
  useEffect(() => {
    heading.current?.focus();
  }, [phase]);
  useEffect(() => {
    if (phase !== "opening") return;
    const timer = window.setTimeout(
      () => enter.current(),
      reduced ? 400 : 1900,
    );
    return () => window.clearTimeout(timer);
  }, [phase, reduced]);
  function choose(index: number) {
    if (selected === null) {
      setSelected(index);
      return;
    }
    if (selected === index) {
      setSelected(null);
      return;
    }
    const next = swapTiles(tiles, selected, index);
    setTiles(next);
    setSelected(null);
    setMoves((n) => n + 1);
    if (isPuzzleSolved(next)) {
      setPhase("gift");
      onCelebrate();
    } else setNotice("Piezas intercambiadas. ¡Sigue armando a Rocko!");
  }
  function openGift() {
    if (phase !== "gift") return;
    onOpenGift();
    setPhase("opening");
    onCelebrate();
  }
  return (
    <main className="rocko-game" id="aventura">
      <div className="game-topline">
        <span className="tag">
          <PawPrint size={15} /> MISIÓN: ROCKO
        </span>
        <span>LEVEL {invitation.age}</span>
      </div>
      {phase === "puzzle" ? (
        <motion.section
          className="puzzle-panel"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="eyebrow">
            EL COMPAÑERO MÁS PELUDO DE LA AVENTURA
          </span>
          <h1 ref={heading} tabIndex={-1}>
            ¡Conoce a Rocko!
            <br />
            <em>Nueve piezas, mil aventuras.</em>
          </h1>
          <p>
            Rocko, el french poodle de {invitation.name}, tiene una sorpresa
            para ti. ¡Completa su rompecabezas para descubrirla!
          </p>
          <div className="puzzle-instructions">
            <span>01 · Toca una pieza</span>
            <span>02 · Toca otra para intercambiarlas</span>
          </div>
          <div className="puzzle-workspace">
            <div
              className="puzzle-board"
              role="group"
              aria-label="Rompecabezas de Rocko, el french poodle. Nueve piezas: selecciona dos para intercambiarlas."
            >
              {tiles.map((tile, index) => (
                <button
                  key={index}
                  className={`puzzle-tile ${selected === index ? "tile-selected" : ""}`}
                  aria-label={`Casilla ${index + 1}, pieza ${tile + 1}${selected === index ? ", seleccionada" : ""}`}
                  aria-pressed={selected === index}
                  onClick={() => choose(index)}
                >
                  <RockoArt tile={tile} />
                  <span className="tile-number">{tile + 1}</span>
                </button>
              ))}
            </div>
            <div className="puzzle-reference">
              <div>
                <RockoArt />
              </div>
              <span>
                <Heart size={12} /> ASÍ QUEDARÁ ROCKO
              </span>
            </div>
          </div>
          <div className="puzzle-tools">
            <span>
              {moves} {moves === 1 ? "movimiento" : "movimientos"}{" "}
              <span aria-hidden="true">·</span>{" "}
              {tiles.filter((tile, i) => tile === i).length}/9 en su lugar
            </span>
            <button
              onClick={() => {
                setTiles(initialTiles);
                setSelected(null);
                setMoves(0);
                setNotice("Rompecabezas reiniciado.");
              }}
            >
              <RotateCcw size={14} /> Reiniciar
            </button>
          </div>
          <p className="puzzle-status" role="status">
            {selected !== null
              ? `Pieza ${tiles[selected] + 1} seleccionada. Toca otra para intercambiarlas.`
              : notice || "Sin prisa: ¡Rocko te acompaña en cada pieza!"}
          </p>
        </motion.section>
      ) : (
        <section className="gift-panel">
          <span className="tag">
            <Check size={15} /> ¡MISIÓN COMPLETADA!
          </span>
          <h1 ref={heading} tabIndex={-1}>
            {phase === "opening"
              ? "¡Sorpresa desbloqueada!"
              : "Hay un regalo para ti."}
          </h1>
          <p>
            {phase === "opening"
              ? "Tu próxima aventura está a punto de comenzar…"
              : "¡Completaste a Rocko! Tu compañero de aventuras te dejó este regalo."}
          </p>
          <div
            className={`gift-scene ${phase === "opening" ? "gift-opening" : ""}`}
          >
            <div className="gift-glow" />
            <div className="gift-surprise">
              <Sparkles size={34} />
              <Heart size={55} fill="currentColor" />
              <span>¡ESTÁS INVITADO!</span>
            </div>
            <div className="gift-box">
              <div className="gift-body">
                <span className="gift-stripe" />
                <span className="gift-seal">
                  <Gift size={27} />
                </span>
              </div>
              <div className="gift-lid">
                <span />
              </div>
              <div className="gift-bow">
                <i />
                <i />
              </div>
            </div>
            <motion.button
              className="ribbon-pull"
              aria-label="Jalar el listón y abrir la invitación"
              disabled={phase === "opening"}
              drag={phase === "gift" ? "y" : false}
              dragConstraints={{ top: 0, bottom: 100 }}
              dragElastic={0.12}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                if (info.offset.y > 45) openGift();
              }}
              onClick={openGift}
              whileTap={{ scale: 0.96 }}
            >
              <span className="ribbon-tail" />
              <span className="ribbon-grip">
                <ArrowDown size={20} />
              </span>
            </motion.button>
          </div>
          <p className="ribbon-hint">
            {phase === "opening" ? (
              <>
                <Sparkles size={16} /> Abriendo tu invitación…
              </>
            ) : (
              <>
                <ArrowDown size={17} /> Jala el listón hacia abajo o tócalo para
                abrir
              </>
            )}
          </p>
          <span className="tiny">
            HECHO DE BLOQUES, HUELLITAS Y MUCHO CARIÑO
          </span>
        </section>
      )}
    </main>
  );
}
