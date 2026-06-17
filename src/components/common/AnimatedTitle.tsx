/* =======================================
 * クロジカ 共通アニメーションタイトル
 * URL: /src/components/common/AnimatedTitle.tsx
 * Referenced in: /src/components/top/TopService.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-17
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
      {text.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {char}
        </span>
      ))}
    </h2>
  );
};

export default AnimatedTitle;
