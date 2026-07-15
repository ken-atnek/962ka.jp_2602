/* =======================================
 * クロジカ 共通アニメーションタイトル
 * URL: /src/components/common/AnimatedTitle.tsx
 * Referenced in: /src/components/top/TopService.tsx
 * Created: 2026-06-17
 * Last updated: 2026-07-15
 * ======================================= */
'use client';

import useInView from '@/hooks/useInView';

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
  const { ref: titleRef, isInView } = useInView<HTMLHeadingElement>({
    threshold,
  });
  const lines = text.split('\n');

  return (
    <h2
      ref={titleRef}
      className={`${className} ${isInView ? visibleClassName : ''}`.trim()}
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
