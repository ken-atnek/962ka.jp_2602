/* =======================================
 * クロジカ 共通フローティングオーブ
 * URL: /src/components/common/FloatingOrbs.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-18
 * ======================================= */
'use client';

import { useState } from 'react';
import styles from './FloatingOrbs.module.scss';

type OrbItem = {
  colorClassName: string;
  duration: number;
  left: number;
  size: number;
  top: number;
};

const orbCount = 5;
const orbSlots = [
  { leftMin: 6, leftMax: 24, topMin: 8, topMax: 24 },
  { leftMin: 30, leftMax: 48, topMin: 10, topMax: 28 },
  { leftMin: 58, leftMax: 76, topMin: 8, topMax: 26 },
  { leftMin: 80, leftMax: 92, topMin: 18, topMax: 34 },
  { leftMin: 10, leftMax: 28, topMin: 42, topMax: 58 },
  { leftMin: 72, leftMax: 90, topMin: 42, topMax: 60 },
  { leftMin: 18, leftMax: 36, topMin: 70, topMax: 88 },
  { leftMin: 62, leftMax: 84, topMin: 72, topMax: 90 },
];

const createOrbItems = () =>
  Array.from({ length: orbCount }, (_, index) => {
    const isGreen = index % 2 === 0;
    const slot = orbSlots[index % orbSlots.length];

    return {
      colorClassName: isGreen ? styles.green : styles.black,
      duration: 6.4 + Math.random() * 4.2,
      left: slot.leftMin + Math.random() * (slot.leftMax - slot.leftMin),
      size: 0.9 + Math.random() * 1.2,
      top: slot.topMin + Math.random() * (slot.topMax - slot.topMin),
    };
  });

const FloatingOrbs = () => {
  const [orbItems] = useState<OrbItem[]>(createOrbItems);

  return (
    <div className={styles.floatingOrbs} aria-hidden="true">
      {orbItems.map((orb, index) => (
        <span
          key={`${orb.colorClassName}-${index}`}
          className={`${styles.orb} ${orb.colorClassName}`}
          style={{
            animationDelay: `${index * 1.1}s`,
            animationDuration: `${orb.duration}s`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: `${orb.size}rem`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
