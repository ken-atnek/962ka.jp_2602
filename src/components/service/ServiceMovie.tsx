/* =======================================
 * クロジカ Service / Credoページ 動画セクション
 * URL: /src/components/service/ServiceMovie.tsx
 * Referenced in: /src/app/service/page.tsx, /src/app/credo/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-07-11
 * ======================================= */
'use client';

import { useRef } from 'react';
import styles from '@/styles/PageCredo.module.scss';

const ServiceMovie = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    void videoRef.current.play();
  };

  return (
    <section className={styles.containerMovie} aria-label="service movie">
      <div className={styles.boxMedia}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onEnded={handleEnded}
        >
          <source src="/movie/credo.webm" type="video/webm" />
          <source src="/movie/credo.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default ServiceMovie;
