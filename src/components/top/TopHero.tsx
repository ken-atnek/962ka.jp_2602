/* =======================================
 * クロジカ TOP Heroセクション
 * URL: /src/components/top/TopHero.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-17
 * ======================================= */
'use client';

import { useRef } from 'react';
import AnimatedTitle from '@/components/common/AnimatedTitle';
import styles from './TopHero.module.scss';

const TopHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    void videoRef.current.play();
  };

  return (
    <section className={styles.containerTopHero} id="top" aria-label="top hero">
      <article>
        <div className={styles.boxTitle}>
          <AnimatedTitle
            className={styles.titleAnimated}
            visibleClassName={styles.isVisible}
            text="Kurojika"
          />
        </div>
        <div className={styles.boxMedia}>
          <video
            ref={videoRef}
            src="/movie/top-sample.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onEnded={handleEnded}
          />
        </div>
      </article>
    </section>
  );
};

export default TopHero;
