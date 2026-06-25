/* =======================================
 * クロジカ スクランブルテキスト（汎用）
 * URL: /src/components/common/ScrambleText.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-23
 * Last updated: 2026-06-23
 * ======================================= */

'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/components/ScrambleText.module.scss';

type Props = {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  className?: string;
  startDelay?: number;
  stagger?: number;
  duration?: number;
};

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const randomChar = (upper: boolean) => {
  const pool = upper ? UPPER : LOWER;
  return pool[Math.floor(Math.random() * pool.length)];
};

export default function ScrambleText({
  text,
  tag: Tag = 'span',
  className,
  startDelay = 180,
  stagger = 180,
  duration = 1200,
}: Props) {
  const chars = text.split('');
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const charList = text.split('');

    // アニメーション前はすべて正しい文字を薄く表示（.char の opacity が基準）
    spanRefs.current.forEach((span, i) => {
      if (!span) return;
      span.textContent = charList[i];
      span.classList.remove(styles.locked);
    });

    const lastUpdated = new Array(charList.length).fill(-Infinity);

    const timer = setTimeout(() => {
      let startTime: number | null = null;

      const animate = (ts: number) => {
        if (startTime === null) startTime = ts;
        const elapsed = ts - startTime;

        charList.forEach((char, i) => {
          const span = spanRefs.current[i];
          if (!span || char === ' ') return;

          const startAt = i * stagger;
          const lockAt = i * stagger + duration;

          if (elapsed >= lockAt) {
            if (!span.classList.contains(styles.locked)) {
              span.textContent = char;
              span.classList.add(styles.locked);
            }
          } else if (elapsed >= startAt) {
            const progress = (elapsed - startAt) / duration;
            // progress 0→1 につれて更新間隔を広げてease-out
            const interval = 80 + progress * 280;
            if (elapsed - lastUpdated[i] >= interval) {
              span.textContent = randomChar(char === char.toUpperCase());
              lastUpdated[i] = elapsed;
            }
          }
        });

        const lastLockAt = (charList.length - 1) * stagger + duration;
        const allLocked = elapsed >= lastLockAt;
        if (!allLocked) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, startDelay, stagger, duration]);

  return (
    <Tag className={className}>
      {chars.map((ch, i) => (
        <span
          key={i}
          ref={(el) => {
            spanRefs.current[i] = el;
          }}
          className={styles.char}
        >
          {ch}
        </span>
      ))}
    </Tag>
  );
}
