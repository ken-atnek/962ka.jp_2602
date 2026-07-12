/* =======================================
 * TOP About 円モーションフック
 * URL: /src/hooks/useAboutCircleMotion.ts
 * Referenced in: /src/components/top/TopAbout.tsx
 * Created: 2026-07-11
 * Last updated: 2026-07-11
 * ======================================= */
import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
};

type CircleBase = {
  cx: number;
  cy: number;
};

type CircleMotionConfig = {
  circleCount: number;
  historyLength: number;
  motion: {
    circleEase: number;
    circleMoveX: number;
    circleMoveXStep: number;
    circleMoveY: number;
    circleMoveYStep: number;
    rotateFactor: number;
    svgEase: number;
    svgMoveX: number;
    svgMoveY: number;
    svgRotate: number;
    svgSkew: number;
  };
  getCircleBase: (line: number) => CircleBase;
};

const useAboutCircleMotion = (
  svgRef: React.RefObject<SVGSVGElement | null>,
  gRefs: React.RefObject<(SVGGElement | null)[]>,
  config: CircleMotionConfig
) => {
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const posRef = useRef(
    Array.from({ length: config.circleCount }, () => ({ x: 0, y: 0 }))
  );
  const svgPosRef = useRef<Point>({ x: 0, y: 0 });
  const historyRef = useRef<Point[]>([]);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const { x: tx, y: ty } = targetRef.current;

      historyRef.current.unshift({ x: tx, y: ty });
      if (historyRef.current.length > config.historyLength) {
        historyRef.current.pop();
      }

      svgPosRef.current.x +=
        (tx * config.motion.svgMoveX - svgPosRef.current.x) *
        config.motion.svgEase;
      svgPosRef.current.y +=
        (ty * config.motion.svgMoveY - svgPosRef.current.y) *
        config.motion.svgEase;

      if (svgRef.current) {
        const rot =
          (svgPosRef.current.x / config.motion.svgMoveX) *
          config.motion.svgRotate;
        const skew =
          (svgPosRef.current.x / config.motion.svgMoveX) * config.motion.svgSkew;

        svgRef.current.style.transform = `translate(${svgPosRef.current.x}px, ${svgPosRef.current.y}px) rotate(${rot}deg) skewY(${skew}deg)`;
      }

      for (let line = 0; line < config.circleCount; line++) {
        const delay = Math.round(
          line * (config.historyLength / config.circleCount)
        );
        const hist = historyRef.current[
          Math.min(delay, historyRef.current.length - 1)
        ] ?? { x: 0, y: 0 };
        const pos = posRef.current[line];

        pos.x +=
          (hist.x *
            (config.motion.circleMoveX +
              line * config.motion.circleMoveXStep) -
            pos.x) *
          config.motion.circleEase;
        pos.y +=
          (hist.y *
            (config.motion.circleMoveY +
              line * config.motion.circleMoveYStep) -
            pos.y) *
          config.motion.circleEase;

        const { cx, cy } = config.getCircleBase(line);
        const rotAngle = hist.x * line * config.motion.rotateFactor;
        const group = gRefs.current[line];

        if (group) {
          group.setAttribute(
            'transform',
            `translate(${pos.x}, ${pos.y}) rotate(${rotAngle}, ${cx}, ${cy})`
          );
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [config, gRefs, svgRef]);

  const updatePointer = (point: Point) => {
    targetRef.current = point;
  };

  const resetPointer = () => {
    targetRef.current = { x: 0, y: 0 };
  };

  return {
    resetPointer,
    updatePointer,
  };
};

export default useAboutCircleMotion;
