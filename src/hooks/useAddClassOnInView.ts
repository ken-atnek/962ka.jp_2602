/* =======================================
 * スクロール到達時クラス付与フック
 * URL: /src/hooks/useAddClassOnInView.ts
 * Referenced in: /src/components/about/CatchCopy.tsx
 * Created: 2026-07-15
 * Last updated: 2026-07-15
 * ======================================= */
import { useCallback, useRef } from 'react';

type Options = {
  threshold?: number;
  once?: boolean;
};

const useAddClassOnInView = <T extends HTMLElement>(
  className: string,
  defaultOptions: Options = {}
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const {
    threshold: defaultThreshold = 0.1,
    once: defaultOnce = true,
  } = defaultOptions;

  const ref = useCallback((el: T | null) => {
    observerRef.current?.disconnect();
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => el.classList.add(className));
          if (defaultOnce) {
            observerRef.current?.disconnect();
          }
          return;
        }

        if (!defaultOnce) {
          requestAnimationFrame(() => el.classList.remove(className));
        }
      },
      { threshold: defaultThreshold }
    );

    observerRef.current.observe(el);
  }, [className, defaultOnce, defaultThreshold]);

  return ref;
};

export default useAddClassOnInView;
