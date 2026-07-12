/* =======================================
 * クロジカ TOP Heroセクション
 * URL: /src/components/top/TopHero.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-07-08
 * ======================================= */
'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedTitle from '@/components/common/AnimatedTitle';
import styles from './TopHero.module.scss';

const TopHero = () => {
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    backgroundVideoRef.current?.pause();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    void backgroundVideoRef.current?.play();
  };

  const handleEnded = () => {
    if (!backgroundVideoRef.current) return;

    backgroundVideoRef.current.currentTime = 0;
    void backgroundVideoRef.current.play();
  };

  useEffect(() => {
    if (!isModalOpen) {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
        modalVideoRef.current.currentTime = 0;
      }
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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
            ref={backgroundVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={handleEnded}
          >
            <source src="/movie/top-movie.webm" type="video/webm" />
            <source src="/movie/top-movie.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            className={styles.playButton}
            onClick={openModal}
            aria-label="音声付き動画を再生"
          ></button>
        </div>
      </article>
      {isModalOpen && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label="TOP動画プレーヤー"
        >
          <button
            type="button"
            className={styles.modalBackdrop}
            onClick={closeModal}
            aria-label="動画モーダルを閉じる"
          />
          <div className={styles.modalInner}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="閉じる"
            >
              Close
            </button>
            <video
              ref={modalVideoRef}
              className={styles.modalVideo}
              controls
              autoPlay
              playsInline
              preload="auto"
            >
              <source src="/movie/top-movie.webm" type="video/webm" />
              <source src="/movie/top-movie.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopHero;
