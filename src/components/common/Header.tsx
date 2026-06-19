/* =======================================
 *クロジカ HEADER
 * URL: /src/components/common/Header.tsx
 * Referenced in: /src/app/layout.tsx
 * Created: 2026-04-23
 * Last updated: 2026-06-18
 * ======================================= */
'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { navMenu } from '@/data/navMenuData';
import styles from './Header.module.scss';
import clsx from 'clsx';
import ScrollLink from '@/components/common/ScrollLink';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isTopPage = pathname === '/';
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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

  const logo = (
    <svg>
      <title id="logoTitle">税理士法人クロジカ</title>
      <use href="#svgLogoMarkText" />
    </svg>
  );

  return (
    <header
      className={clsx(styles.containerHeader, !isTopPage && styles.isSubpage)}
    >
      <article
        className={clsx(
          styles.blockMenu,
          isOpen && styles.isOpen,
          !isOpen && styles.closing
        )}
        ref={navRef}
      >
        {isTopPage ? (
          <h1 className={styles.itemLogo} aria-labelledby="logoTitle">
            {logo}
          </h1>
        ) : (
          <div className={styles.itemLogo} aria-hidden="true">
            {logo}
          </div>
        )}
        <nav>
          {navMenu.map((item) => (
            <ScrollLink
              href={item.href}
              onClick={closeMenu}
              key={`${item.href}-${item.label}`}
            >
              {item.label}
            </ScrollLink>
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
          <span></span>
        </div>
        <p>menu</p>
      </button>
    </header>
  );
};

export default Header;
