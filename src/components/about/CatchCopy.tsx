/* =======================================
 * クロジカ About キャッチコピー（1文字stagger）
 * URL: /src/components/about/CatchCopy.tsx
 * Referenced in: /src/components/about/AboutStatement.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */

'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/PageAbout.module.scss';

const WORDS = ['ALL', 'IN', 'THE', 'BLACK'];

const wordData = WORDS.map((word, wi) => ({
  word,
  chars: word.split('').map((char, ci) => ({
    char,
    delay: (WORDS.slice(0, wi).join('').length + ci) * 140,
  })),
}));

export default function CatchCopy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => el.classList.add(styles.isVisible));
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.itemCatch}>
      {wordData.map(({ word, chars }) => (
        <i key={word}>
          {chars.map(({ char, delay }) => (
            <span key={delay} style={{ transitionDelay: `${delay}ms` }}>
              {char}
            </span>
          ))}
        </i>
      ))}
    </div>
  );
}
