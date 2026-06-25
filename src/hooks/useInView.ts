/* =======================================
 * スクロールによるビュー検出フック
 * URL: src/hooks/useInView.ts
 * Created: 2026-06-23
 * Last updated: 2026-06-23
 * ======================================= */
import { useCallback, useRef, useState } from 'react';

type Options = {
  threshold?: number;
  once?: boolean;
};

const useInView = <T extends HTMLElement>(defaultOptions: Options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { threshold: defaultThreshold = 0.1, once: defaultOnce = true } = defaultOptions;

  const ref = useCallback((el: T | null, overrides?: Options) => {
    observerRef.current?.disconnect();
    if (!el) return;

    const threshold = overrides?.threshold ?? defaultThreshold;
    const once = overrides?.once ?? defaultOnce;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observerRef.current?.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observerRef.current.observe(el);
  }, [defaultThreshold, defaultOnce]);

  return { ref, isInView };
};

export default useInView;
