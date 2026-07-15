/* =======================================
 * クロジカ Greetings スキャッターネーム
 * URL: /src/components/greetings/ScatterName.tsx
 * Referenced in: /src/app/greetings/page.tsx
 * Created: 2026-06-18
 * Last updated: 2026-07-15
 * ======================================= */

'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/PageGreetings.module.scss';
import useAddClassOnInView from '@/hooks/useAddClassOnInView';

export default function ScatterName() {
  const localRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useAddClassOnInView<HTMLDivElement>(styles.isVisible, {
    threshold: 0.4,
  });

  useEffect(() => {
    const el = localRef.current;
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
  }, []);

  const renderChars = (text: string) =>
    text.split('').map((char, i) => <span key={i}>{char}</span>);

  return (
    <div
      ref={(el) => {
        localRef.current = el;
        visibleRef(el);
      }}
      className={styles.itemName}
    >
      <i>{renderChars('SHINTAROU')}</i>
      <i>{renderChars('YAMAGUCHI')}</i>
    </div>
  );
}
