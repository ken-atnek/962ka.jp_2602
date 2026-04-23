/* =======================================
 * アンカーナビゲーション用フック
 * URL: src/hooks/useAnchorNav.ts
 * Created: 2026-04-23
 * ======================================= */
import { usePathname } from 'next/navigation';

export const useAnchorNav = () => {
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hash = href.split('#')[1];
    if (!hash) return;

    if (pathname === '/') {
      const el = document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${hash}`);
    }
  };

  return { onNavClick: handleNavClick };
};
