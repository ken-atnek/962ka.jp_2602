/* =======================================
 * クロジカ TOP Credoセクション
 * URL: /src/components/top/TopCredo.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-17
 * ======================================= */
'use client';

import { useRef } from 'react';
import AnimatedTitle from '@/components/common/AnimatedTitle';
import ScrollLink from '@/components/common/ScrollLink';
import styles from './TopCredo.module.scss';

const TopCredo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    void videoRef.current.play();
  };

  return (
    <section className={styles.containerTopCredo} id="credo" aria-label="credo">
      <article>
        <div className={styles.boxTitle}>
          <AnimatedTitle
            className={styles.titleAnimated}
            visibleClassName={styles.isVisible}
            text="Credo"
          />
          <p>
            クロジカの信念をお伝えしたいと思います。
            <br />
            笑顔で納税できる企業が増える事を祈って。
          </p>
        </div>
        <div className={styles.boxImage}>
          <ScrollLink href="#" className={styles.pageLink}>
            <span>credo</span>
          </ScrollLink>
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
            <svg
              className={styles.mask}
              viewBox="0 0 870 489"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <mask id="top-credo-grid-mask">
                  <rect width="870" height="489" fill="white" />
                  <rect
                    x="2"
                    y="2"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="219.5"
                    y="2"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="437"
                    y="2"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="654.5"
                    y="2"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="2"
                    y="165"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="219.5"
                    y="165"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="437"
                    y="165"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="654.5"
                    y="165"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="2"
                    y="328"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="219.5"
                    y="328"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="437"
                    y="328"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                  <rect
                    x="654.5"
                    y="328"
                    width="213.5"
                    height="159"
                    rx="18"
                    fill="black"
                  />
                </mask>
              </defs>
              <rect
                width="870"
                height="489"
                fill="#171c1b"
                mask="url(#top-credo-grid-mask)"
              />
            </svg>
          </div>
        </div>
      </article>
    </section>
  );
};

export default TopCredo;
