/* =======================================
 * クロジカ ページ遷移テンプレート（スクロール制御）
 * URL: /src/app/template.tsx
 * Referenced in: /src/app/layout.tsx
 * Created: 2026-04-23
 * Last updated: 2026-07-27
 * ======================================= */
'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const hash = window.location.hash;

    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
        } else {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
          }, 100);
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }
  }, [pathname]);

  return <>{children}</>;
}
