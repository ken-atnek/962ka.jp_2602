/* =======================================
 * クロジカ 共通アニメーションタイトル
 * URL: /src/components/common/AnimatedTitle.tsx
 * Referenced in: /src/components/top/TopService.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-20
 * ======================================= */
'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedTitleProps = {
  className?: string;
  visibleClassName?: string;
  text: string;
  threshold?: number;
};

const AnimatedTitle = ({
  className = '',
  visibleClassName = '',
  text,
  threshold = 0.45,
}: AnimatedTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const lines = text.split('\n');

  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold,
      }
    );

    observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <h2
      ref={titleRef}
      className={`${className} ${isVisible ? visibleClassName : ''}`.trim()}
    >
      {lines.map((line, lineIndex) => {
        const delayOffset = lines
          .slice(0, lineIndex)
          .join('')
          .length;

        return (
          <span key={`${line}-${lineIndex}`} className="animatedTitleLine">
            {line.split('').map((char, index) => (
              <span
                key={`${char}-${lineIndex}-${index}`}
                style={{ transitionDelay: `${(delayOffset + index) * 100}ms` }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </h2>
  );
};

export default AnimatedTitle;
