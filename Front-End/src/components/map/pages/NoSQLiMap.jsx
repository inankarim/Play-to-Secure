import React, { useEffect, useMemo, useRef, useState } from "react";
import SEO from "@/components/map/SEO";
import { LevelNode } from "@/components/map/LevelNode";
import { useWorldProgress } from "@/components/hooks/useWorldProgress";
import bg from "@/assets/Blue-cyan galaxy background with nebula.png";
import mascot from "@/assets/mascot_astronaut.png";
import { toast } from "sonner";

const points = [
  { x: 15, y: 75 },
  { x: 28, y: 60 },
  { x: 42, y: 68 },
  { x: 56, y: 55 },
  { x: 70, y: 63 },
  { x: 65, y: 40 },
  { x: 50, y: 30 },
  { x: 35, y: 33 },
  { x: 22, y: 20 },
  { x: 38, y: 10 },
];

function pathD(pts) {
  if (!pts.length) return "";
  const p = pts.map(p => `${p.x},${p.y}`).join(" ");
  return `M ${p.split(" ")[0]} L ${p.split(" ").slice(1).join(" ")}`;
}

const NoSQLiMap = () => {
  const { progress, awardStarsAndUnlock } = useWorldProgress("nosqli");
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
    window.location.href = `/quiz?vulnerability=nosqli&level=${level}`;
  };

  return (
    <main className="min-h-screen w-full">
      <SEO
        title="NoSQL Injection World – Cybersecurity Galaxy Game"
        description="Play through 10 NoSQLi levels on a dotted galaxy path. Learn via tutorials and quizzes and earn stars to unlock the next planet."
        canonical="/game/nosqli"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "NoSQL Injection World",
          genre: "Educational, Cybersecurity",
          numberOfPlayers: "1",
        }}
      />
      <section
        ref={containerRef}
        className="relative mx-auto max-w-5xl md:rounded-xl overflow-hidden"
        style={{ height: "1400px" }}
        aria-label="NoSQL Injection galaxy map"
      >
        <img
          src={bg}
          alt="Purple galaxy background with nebula"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_40%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.15),transparent_40%)]" />

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

        <img
          src={mascot}
          alt="Astronaut mascot"
          className="absolute z-20 size-10 md:size-12 animate-float transition-all duration-700 ease-out"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -70%)" }}
        />

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

export default NoSQLiMap;