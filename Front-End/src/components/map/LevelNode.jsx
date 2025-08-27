import { Lock } from "lucide-react";
import starImg from "../../assets/star_gold.png";
import planetImg from "../../assets/planet_database.png";
import { cn } from "../../lib/utils";

export const LevelNode = ({ x, y, level, state, stars = 0, onClick }) => {
  const locked = state === "locked";
  const completed = state === "completed";
  
  return (
    <button
      aria-label={`Level ${level}`}
      onClick={onClick}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 hover-scale",
        "focus-visible:ring-2 focus-visible:ring-ring",
        locked ? "opacity-70" : ""
      )}
      style={{ left: x, top: y }}
    >
      <div className={cn(
        "relative size-16 md:size-20 rounded-full border border-border",
        "shadow-[var(--shadow-elegant)]",
        locked ? "bg-muted" : "bg-card"
      )}>
        <img src={planetImg} alt={`SQLi planet ${level}`} className="absolute inset-0 size-full object-contain" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center text-foreground font-extrabold">
          {level}
        </div>
        {locked && (
          <div className="absolute inset-0 bg-background/40 rounded-full grid place-items-center">
            <Lock className="text-foreground/80" />
          </div>
        )}
      </div>
      <div className="flex justify-center gap-1 mt-2" aria-label={`${stars} stars`}>
        {Array.from({ length: stars }).map((_, i) => (
          <img key={i} src={starImg} className="h-4 w-4 md:h-5 md:w-5" alt="gold star" loading="lazy" />
        ))}
      </div>
    </button>
  );
};