/* =======================================
 * クロジカ About キャッチコピー
 * URL: /src/components/about/CatchCopy.tsx
 * Referenced in: /src/components/about/AboutStatement.tsx
 * Created: 2026-06-20
 * Last updated: 2026-07-15
 * ======================================= */

'use client';

import styles from '@/styles/PageAbout.module.scss';
import useAddClassOnInView from '@/hooks/useAddClassOnInView';

const renderChars = (text: string, startDelay: number) =>
  text.split('').map((char, index) => (
    <span
      key={`${text}-${index}`}
      style={{ transitionDelay: `${startDelay + index * 140}ms` }}
    >
      {char}
    </span>
  ));

export default function CatchCopy() {
  const ref = useAddClassOnInView<HTMLDivElement>(styles.isVisible, {
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={styles.itemCatch}>
      <span>
        {renderChars('All', 0)}
        <em>{renderChars('WW', 420)}</em>
      </span>
      <span>{renderChars('in', 700)}</span>
      <span>{renderChars('the', 980)}</span>
      <span>{renderChars('BLACK', 1400)}</span>
    </div>
  );
}
