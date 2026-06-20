/* =======================================
 * クロジカ Serviceページ 動画セクション
 * URL: /src/components/service/ServiceMovie.tsx
 * Referenced in: /src/app/service/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */
'use client';

import { useRef } from 'react';
import styles from '@/styles/PageService.module.scss';

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
          src="/movie/top-sample.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onEnded={handleEnded}
        />
      </div>
    </section>
  );
};

export default ServiceMovie;
