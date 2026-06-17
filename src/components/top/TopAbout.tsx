/* =======================================
 * クロジカ TOP Aboutセクション
 * URL: /src/components/top/TopAbout.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-17
 * ======================================= */
'use client';

import type { PointerEvent as ReactPointerEvent } from 'react';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './TopAbout.module.scss';
import ScrollLink from '@/components/common/ScrollLink';

const CIRCLE_COUNT = 22;
const circleLines = Array.from({ length: CIRCLE_COUNT }, (_, i) => i);

const TopAbout = () => {
  const targetRef = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const gRefs = useRef<(SVGGElement | null)[]>([]);
  const posRef = useRef(
    Array.from({ length: CIRCLE_COUNT }, () => ({ x: 0, y: 0 }))
  );
  const svgPos = useRef({ x: 0, y: 0 });
  const historyRef = useRef<{ x: number; y: number }[]>([]);
  const HISTORY_LEN = 55;

  useEffect(() => {
    let raf: number;

    const tick = () => {
      const { x: tx, y: ty } = targetRef.current;

      // マウス位置の履歴を先頭に追加
      historyRef.current.unshift({ x: tx, y: ty });
      if (historyRef.current.length > HISTORY_LEN) historyRef.current.pop();

      // SVG全体: translate + rotate + skewY（左右で斜めに傾く）
      svgPos.current.x += (tx * 55 - svgPos.current.x) * 0.1;
      svgPos.current.y += (ty * 44 - svgPos.current.y) * 0.1;
      if (svgRef.current) {
        const rot = (svgPos.current.x / 55) * 8;
        const skew = (svgPos.current.x / 55) * 30;
        svgRef.current.style.transform = `translate(${svgPos.current.x}px, ${svgPos.current.y}px) rotate(${rot}deg) skewY(${skew}deg)`;
      }

      for (let line = 0; line < CIRCLE_COUNT; line++) {
        // 外の輪ほど古い履歴のマウス位置を参照 → 時間的な遅延
        const delay = Math.round(line * (HISTORY_LEN / CIRCLE_COUNT));
        const hist = historyRef.current[
          Math.min(delay, historyRef.current.length - 1)
        ] ?? { x: 0, y: 0 };

        const pos = posRef.current[line];
        // 全輪に基礎移動(45px)を加え、内側の輪も動くようにする
        pos.x += (hist.x * (50 + line * 5) - pos.x) * 0.25;
        pos.y += (hist.y * (36 + line * 2.8) - pos.y) * 0.25;

        // 各輪をその中心を軸に回転（外の輪ほど大きく・遅れて回る）
        const cx = 172 + line * 13.6;
        const cy = 140 + line * 14.8;
        const rotAngle = hist.x * line * 5;

        const g = gRefs.current[line];
        if (g)
          g.setAttribute(
            'transform',
            `translate(${pos.x}, ${pos.y}) rotate(${rotAngle}, ${cx}, ${cy})`
          );
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };
  };

  const handlePointerLeave = () => {
    targetRef.current = { x: 0, y: 0 };
  };

  return (
    <section
      className={styles.containerTopAbout}
      id="about"
      aria-label="about"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.itemCircle} aria-hidden="true">
        <svg ref={svgRef} viewBox="0 0 780 780" className={styles.circleSvg}>
          {circleLines.map((line) => {
            const depth = line / (circleLines.length - 1);
            const baseCx = 172 + line * 13.6;
            const baseCy = 140 + line * 14.8;
            const baseR = 112 + line * 12.2;

            return (
              <g
                key={line}
                ref={(el) => {
                  gRefs.current[line] = el;
                }}
              >
                <circle
                  cx={baseCx}
                  cy={baseCy}
                  r={baseR}
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
      <div className={styles.headText}>
        <span className={styles.enHead}>
          All
          <em>
            <i>W</i>
            <i>W</i>
            <i>W</i>
          </em>
          in the
        </span>
        <div className={styles.wrapBottom}>
          <p>豊かな和の輪を、皆さまと共に。</p>
          <span>BLACK</span>
        </div>
      </div>
      <article>
        <div className={styles.boxImage}>
          <Image
            src="/images/top/about-person.webp"
            alt="アバウト画像"
            width={430}
            height={430}
          />
        </div>
        <div className={styles.boxText}>
          <span>in the BLACK</span>
          <h2>黒字であれ。</h2>
          <p>
            私たちクロジカは、
            <br />
            お客様の経営が常に黒字であるよう
            <br /> ⽀え続けます。
            <br />
            <br />
            そして、黒字経営により⽣まれる「和」が、
            <br />
            さらに「輪」のように関わる全ての皆さまに広がる。
            <br />
            そんな「全方良し」を目指して、
            <br />
            私たちクロジカは「ALL in」全力を尽くします。
          </p>
        </div>
        <ScrollLink href="#" className={styles.pageLink}>
          <span>about</span>
        </ScrollLink>
      </article>
    </section>
  );
};

export default TopAbout;
