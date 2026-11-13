import { motion } from "framer-motion";
export function Confetti({ burst }: { burst: number }) {
  if (!burst) return null;
  return (
    <div className="confetti" aria-hidden="true" key={burst}>
      {Array.from({ length: 48 }, (_, i) => (
        <motion.i
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            background: ["#8b5cf6", "#ff4fa3", "#38bdf8", "#facc15"][i % 4],
          }}
          initial={{ y: -30, rotate: 0, opacity: 1 }}
          animate={{ y: "105vh", rotate: (i % 2 ? 1 : -1) * 540, opacity: 0 }}
          transition={{ duration: 2.4 + (i % 4) * 0.3, delay: (i % 7) * 0.06 }}
        />
      ))}
    </div>
  );
}
