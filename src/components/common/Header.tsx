/* =======================================
 *クロジカ HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2026-04-23
 * Last updated: 2026-04-23
 * ======================================= */
'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navMenu } from '@/data/navMenuData';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { useAnchorNav } from '@/hooks/useAnchorNav';

const HeaderInner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { onNavClick } = useAnchorNav();
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    closeMenu();
    onNavClick(e, href);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isOpen &&
        navRef.current &&
        buttonRef.current &&
        !navRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  }, [isOpen]);

  return (
    <header className={styles.containerHeader}>
      <article
        className={clsx(
          styles.blockMenu,
          isOpen && styles.isOpen,
          !isOpen && styles.closing
        )}
        ref={navRef}
      >
        <h1 aria-labelledby="logoTitle">
          <svg>
            <title id="logoTitle">税理士法人クロジカ</title>
            <use href="#svgLogoMarkText" />
          </svg>
        </h1>
        <nav>
          {navMenu.map((item) => (
            <Link
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              key={`${item.href}-${item.label}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </article>
      <button
        type="button"
        ref={buttonRef}
        className={`${styles.hamburgerButton} ${
          isOpen ? styles['is-open'] : ''
        }`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="メニューを開閉"
      >
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>menu</p>
      </button>
    </header>
  );
};

const Header = () => {
  const pathname = usePathname();
  return <HeaderInner key={pathname} />;
};

export default Header;
