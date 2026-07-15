/* =======================================
 * クロジカ TOP Aboutセクション
 * URL: /src/components/top/TopAbout.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-27
 * ======================================= */
'use client';

import clsx from 'clsx';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import useAboutCircleMotion from '@/hooks/useAboutCircleMotion';
import useInView from '@/hooks/useInView';
import styles from './TopAbout.module.scss';
import ScrollLink from '@/components/common/ScrollLink';

const CIRCLE_COUNT = 22;
const HISTORY_LEN = 55;
const circleLines = Array.from({ length: CIRCLE_COUNT }, (_, i) => i);
const CIRCLE_MOTION = {
  baseCx: 172,
  baseCy: 140,
  baseR: 112,
  circleEase: 0.25,
  circleMoveX: 50,
  circleMoveXStep: 5,
  circleMoveY: 36,
  circleMoveYStep: 2.8,
  circleStepCx: 13.6,
  circleStepCy: 14.8,
  circleStepR: 12.2,
  rotateFactor: 5,
  svgEase: 0.1,
  svgMoveX: 55,
  svgMoveY: 44,
  svgRotate: 8,
  svgSkew: 30,
} as const;
const RIPPLE_SETTINGS = {
  delayBase: 600,
  delayRange: 1000,
  durationBase: 2.5,
  durationRange: 2,
  leftBase: 5,
  leftRange: 90,
  ringBaseCount: 3,
  ringRangeCount: 2,
  sizeBase: 420,
  sizeRange: 520,
  staggerMs: 250,
  topBase: 10,
  topRange: 80,
} as const;

const getCircleBase = (line: number) => ({
  cx: CIRCLE_MOTION.baseCx + line * CIRCLE_MOTION.circleStepCx,
  cy: CIRCLE_MOTION.baseCy + line * CIRCLE_MOTION.circleStepCy,
  r: CIRCLE_MOTION.baseR + line * CIRCLE_MOTION.circleStepR,
});

const createRipple = (container: HTMLDivElement, className: string) => {
  const left =
    RIPPLE_SETTINGS.leftBase + Math.random() * RIPPLE_SETTINGS.leftRange;
  const top =
    RIPPLE_SETTINGS.topBase + Math.random() * RIPPLE_SETTINGS.topRange;
  const duration =
    RIPPLE_SETTINGS.durationBase +
    Math.random() * RIPPLE_SETTINGS.durationRange;
  const ringCount =
    RIPPLE_SETTINGS.ringBaseCount +
    Math.floor(Math.random() * RIPPLE_SETTINGS.ringRangeCount);
  const rippleSize =
    RIPPLE_SETTINGS.sizeBase +
    Math.floor(Math.random() * RIPPLE_SETTINGS.sizeRange);

  for (let i = 0; i < ringCount; i++) {
    const ring = document.createElement('span');
    ring.setAttribute('class', className);
    ring.style.left = `${left}%`;
    ring.style.top = `${top}%`;
    ring.style.setProperty('--ripple-duration', `${duration}s`);
    ring.style.setProperty('--ripple-size', `${rippleSize}px`);
    ring.style.animationDelay = `${i * RIPPLE_SETTINGS.staggerMs}ms`;

    container.appendChild(ring);
    ring.addEventListener('animationend', () => ring.remove(), { once: true });
  }
};

const clearRipples = (container: HTMLDivElement) => {
  while (container.firstChild) container.removeChild(container.firstChild);
};

const getNextRippleDelay = () =>
  RIPPLE_SETTINGS.delayBase + Math.random() * RIPPLE_SETTINGS.delayRange;
const ABOUT_SLIDES = [
  '/images/top/about/slide01.webp',
  '/images/top/about/slide02.webp',
  '/images/top/about/slide03.webp',
] as const;
const SLIDE_INTERVAL_MS = 4000;
const OUTER_LEAD_MS = 600;

const TopAbout = () => {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  const ripplesContainerRef = useRef<HTMLDivElement>(null);
  const gRefs = useRef<(SVGGElement | null)[]>([]);
  const [activeInnerSlide, setActiveInnerSlide] = useState(0);
  const [activeOuterSlide, setActiveOuterSlide] = useState(0);
  const { updatePointer, resetPointer } = useAboutCircleMotion(svgRef, gRefs, {
    circleCount: CIRCLE_COUNT,
    getCircleBase,
    historyLength: HISTORY_LEN,
    motion: CIRCLE_MOTION,
  });

  useEffect(() => {
    const container = ripplesContainerRef.current;
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        createRipple(container, styles.rippleRing);
        scheduleNext();
      }, getNextRippleDelay());
    };

    scheduleNext();

    return () => {
      clearTimeout(timeoutId);
      clearRipples(container);
    };
  }, []);

  useEffect(() => {
    let innerTimeoutId = 0;

    const intervalId = window.setInterval(() => {
      setActiveOuterSlide((prev) => (prev + 1) % ABOUT_SLIDES.length);

      innerTimeoutId = window.setTimeout(() => {
        setActiveInnerSlide((prev) => (prev + 1) % ABOUT_SLIDES.length);
      }, OUTER_LEAD_MS);
    }, SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(innerTimeoutId);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    updatePointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const handlePointerLeave = () => {
    resetPointer();
  };

  return (
    <section
      ref={sectionRef}
      className={styles.containerTopAbout}
      id="about"
      aria-label="about"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={ripplesContainerRef}
        className={styles.ripplesLayer}
        aria-hidden="true"
      />
      <div className={styles.itemCircle} aria-hidden="true">
        <svg ref={svgRef} viewBox="0 0 780 780" className={styles.circleSvg}>
          {circleLines.map((line) => {
            const depth = line / (circleLines.length - 1);
            const { cx, cy, r } = getCircleBase(line);

            return (
              <g
                key={line}
                ref={(el) => {
                  gRefs.current[line] = el;
                }}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.7 + depth * 0.45}
                  opacity={0.18 + depth * 0.58}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className={clsx(styles.headText, isInView && 'is-active')}>
        <span className={styles.wrapHead}>
          <i className={styles.textAll}>All</i>
          <em>
            <i className={styles.textFirstW}>W</i>
            <i className={styles.textSecondW}>W</i>
          </em>
          <i className={styles.textIn}>in</i>
          <i className={styles.textThe}>the</i>
        </span>
        <div className={styles.wrapBottom}>
          <p>
            豊かな和の輪を、
            <br className="sp" />
            皆さまと共に
          </p>
          <span className={styles.textBlack}>BLACK</span>
        </div>
        <div className={styles.wrapComment}>
          <div className={styles.title}>
            <span className={styles.en}>in the BLACK</span>
            <span className={styles.jp}>黒字であれ。</span>
          </div>
          <p className={styles.text01}>
            私たちクロジカは、
            <br />
            お客様が常に黒字出るよう、 支え続けます。
          </p>
          <p className={styles.text02}>
            そして、黒字経営により⽣まれる「和」が、
            <br />
            さらに「輪」のように関わる全ての皆さまに広がる。
          </p>
          <p className={styles.text03}>そんな「全方良し」を目指して、</p>
          <p className={styles.text04}>
            私たちクロジカは「ALL in」全力を尽くします。
          </p>
        </div>
      </div>
      <article>
        <div className={styles.boxImage}>
          <div className={styles.outerSlides}>
            {ABOUT_SLIDES.map((src, index) => (
              <div
                key={`outer-${src}`}
                className={clsx(
                  styles.slideImage,
                  index === activeOuterSlide && styles.isActive
                )}
              >
                <Image src={src} alt="アバウト画像" width={430} height={430} />
              </div>
            ))}
          </div>
          <div className={styles.innerImage}>
            {ABOUT_SLIDES.map((src, index) => (
              <div
                key={`inner-${src}`}
                className={clsx(
                  styles.slideImage,
                  index === activeInnerSlide && styles.isActive
                )}
              >
                <Image src={src} alt="アバウト画像" width={430} height={430} />
              </div>
            ))}
          </div>
        </div>
        <ScrollLink href="/about/" className={styles.pageLink}>
          <span>about</span>
        </ScrollLink>
      </article>
    </section>
  );
};

export default TopAbout;
