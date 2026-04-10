"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  root: React.RefObject<HTMLElement | null>;
  threshold?: number;
  rootMargin?: string;
  lockDuration?: number;
}

function useScrollSpy({
  sectionIds,
  root,
  threshold = 0.3,
  rootMargin = "-20% 0px -60% 0px",
  lockDuration = 800,
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const lockRef = useRef(false);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      lockRef.current = true;
      setActiveId(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        lockRef.current = false;
      }, lockDuration);
    },
    [lockDuration]
  );

  useEffect(() => {
    const container = root.current;
    if (!container) return;

    const ratioMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;

        for (const entry of entries) {
          ratioMap.set(entry.target.id, entry.intersectionRatio);
        }

        let best = "";
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = ratioMap.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }

        if (best && bestRatio > 0) {
          setActiveId(best);
        }
      },
      {
        root: container,
        rootMargin,
        threshold: [0, 0.1, 0.2, threshold, 0.5, 0.75, 1],
      }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds, root, threshold, rootMargin]);

  return { activeId, scrollTo };
}

export { useScrollSpy };
