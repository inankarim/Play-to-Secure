import React, { useEffect, useMemo, useRef, useState } from "react";
import SEO from "@/components/map/SEO";
import { LevelNode } from "@/components/map/LevelNode";
import { useWorldProgress } from "@/components/hooks/useWorldProgress";
import bg from "@/assets/Blue-cyan galaxy background with nebula.png";
import mascot from "@/assets/mascot_astronaut.png";
import { toast } from "sonner";

const points = [
  { x: 10, y: 78 },
  { x: 24, y: 64 },
  { x: 39, y: 72 },
  { x: 54, y: 59 },
  { x: 69, y: 67 },
  { x: 63, y: 44 },
  { x: 47, y: 33 },
  { x: 32, y: 36 },
  { x: 20, y: 22 },
  { x: 36, y: 12 },
];

function pathD(pts) {
  if (!pts.length) return "";
  const p = pts.map(p => `${p.x},${p.y}`).join(" ");
  return `M ${p.split(" ")[0]} L ${p.split(" ").slice(1).join(" ")}`;
}

const ClickjackingMap = () => {
  const { progress, awardStarsAndUnlock } = useWorldProgress("clickjacking");
  const containerRef = useRef(null);
  const [pos, setPos] = useState(points[0]);

  const currentIndex = Math.max(0, Math.min(9, progress.currentLevel - 1));

  useEffect(() => {
    setPos(points[currentIndex]);
  }, [currentIndex]);

  const d = useMemo(() => pathD(points), []);

  const handleLevelClick = (level, locked) => {
    if (locked) {
      toast.warning("Please complete the previous level first!");
      return;
    }
    // Navigate to quiz page with vulnerability type and level
    window.location.href = `/quiz?vulnerability=clickjacking&level=${level}`;
  };

  return (
    <main className="min-h-screen w-full">
      <SEO
        title="Clickjacking World – Cybersecurity Galaxy Game"
        description="Play through 10 Clickjacking levels on a dotted galaxy path. Learn via tutorials and quizzes and earn stars to unlock the next planet."
        canonical="/game/clickjacking"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "Clickjacking World",
          genre: "Educational, Cybersecurity",
          numberOfPlayers: "1",
        }}
      />
      <section
        ref={containerRef}
        className="relative mx-auto max-w-5xl md:rounded-xl overflow-hidden"
        style={{ height: "1400px" }}
        aria-label="Clickjacking galaxy map"
      >
        <img
          src={bg}
          alt="Blue-cyan galaxy background with nebula"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_40%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.15),transparent_40%)]" />

        {/* Dotted path */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 90" preserveAspectRatio="none" aria-hidden>
          <path d={d}
            className="opacity-80 animate-dash"
            stroke="hsl(var(--accent))"
            strokeWidth={1.2}
            strokeDasharray="2 4"
            pathLength={1}
            fill="none"
          />
        </svg>

        {/* Mascot */}
        <img
          src={mascot}
          alt="Astronaut mascot"
          className="absolute z-20 size-10 md:size-12 animate-float transition-all duration-700 ease-out"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -70%)" }}
        />

        {/* Nodes */}
        {points.map((p, i) => {
          const level = i + 1;
          const completed = progress.levels[level]?.completed;
          const stars = progress.levels[level]?.stars ?? 0;
          const unlocked = level === 1 || (progress.levels[level - 1]?.completed ?? false);
          const state = completed ? "completed" : unlocked ? "unlocked" : "locked";
          return (
            <LevelNode
              key={level}
              x={`${p.x}%`}
              y={`${p.y}%`}
              level={level}
              state={state}
              stars={stars}
              onClick={() => handleLevelClick(level, state === "locked")}
            />
          );
        })}
      </section>
    </main>
  );
};

export default ClickjackingMap;