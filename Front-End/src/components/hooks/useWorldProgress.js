import { useEffect, useState } from "react";

const DEFAULT_WORLD = {
  currentLevel: 1,
  levels: {},
};

export function useWorldProgress(worldKey) {
  const storageKey = `progress_${worldKey}`;
  const [progress, setProgress] = useState(DEFAULT_WORLD);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) try {
      const parsed = JSON.parse(raw);
      setProgress({ ...DEFAULT_WORLD, ...parsed });
    } catch {
      // ignore
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const awardStarsAndUnlock = (level, stars) => {
    setProgress(prev => {
      const prevStars = prev.levels[level]?.stars ?? 0;
      const best = Math.max(prevStars, Math.min(3, Math.max(0, stars)));
      const nextLevel = Math.max(prev.currentLevel, level + (best > 0 ? 1 : 0));
      return {
        currentLevel: Math.min(10, nextLevel),
        levels: {
          ...prev.levels,
          [level]: { stars: best, completed: best > 0 },
        },
      };
    });
  };

  return { progress, setProgress, awardStarsAndUnlock };
}