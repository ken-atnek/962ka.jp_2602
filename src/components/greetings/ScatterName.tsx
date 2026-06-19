/* =======================================
 * クロジカ Greetings スキャッターネーム
 * URL: /src/components/greetings/ScatterName.tsx
 * Referenced in: /src/app/greetings/page.tsx
 * Created: 2026-06-18
 * Last updated: 2026-06-18
 * ======================================= */

'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/PageGreetings.module.scss';

export default function ScatterName() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    el.querySelectorAll('span').forEach((span) => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      span.style.setProperty(
        '--tx',
        `${Math.round((Math.random() - 0.5) * 1200)}px`
      );
      span.style.setProperty(
        '--ty',
        `${Math.round((Math.random() - 0.5) * 800)}px`
      );
      span.style.setProperty(
        '--scale',
        `${(4 + Math.random() * 2).toFixed(1)}`
      );
      span.style.setProperty(
        '--rx',
        `${Math.round((Math.random() - 0.5) * 180)}deg`
      );
      span.style.setProperty(
        '--rz',
        `${Math.round(dir * (360 + Math.random() * 1420))}deg`
      );
      span.style.setProperty('--delay', `${(Math.random() * 0.5).toFixed(2)}s`);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => el.classList.add(styles.isVisible));
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderChars = (text: string) =>
    text.split('').map((char, i) => <span key={i}>{char}</span>);

  return (
    <div ref={wrapperRef} className={styles.itemName}>
      <i>{renderChars('SHINTAROU')}</i>
      <i>{renderChars('YAMAGUCHI')}</i>
    </div>
  );
}
