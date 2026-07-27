/* =======================================
 * クロジカ HEADER
 * URL: /src/components/common/Header.tsx
 * Referenced in: /src/app/layout.tsx
 * Created: 2026-04-23
 * Last updated: 2026-07-27
 * ======================================= */
'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { navMenu } from '@/data/navMenuData';
import styles from './Header.module.scss';
import clsx from 'clsx';
import ScrollLink from '@/components/common/ScrollLink';
import ExternalLink from '@/components/common/ExternalLink';
import Image from 'next/image';

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
    <Image
      src="/images/logo.svg"
      alt="税理士法人クロジカ"
      width={256}
      height={38}
    />
  );

  return (
    <header
      className={clsx(styles.containerHeader, !isTopPage && styles.isSubpage)}
    >
      <article
        className={clsx(
          styles.topHeader,
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
          {navMenu.map((item) =>
            item.isExternal ? (
              <ExternalLink
                href={item.href}
                onClick={closeMenu}
                key={`${item.href}-${item.label}`}
              >
                {item.label}
              </ExternalLink>
            ) : (
              <ScrollLink
                href={item.href}
                onClick={closeMenu}
                key={`${item.href}-${item.label}`}
              >
                {item.label}
              </ScrollLink>
            )
          )}
        </nav>
      </article>
      <article
        className={clsx(
          styles.blockMenu,
          isOpen && styles.isOpen,
          !isOpen && styles.closing
        )}
        ref={navRef}
      >
        <div className={styles.blockInner}>
          <div className={styles.itemLogo}>
            <svg>
              <title id="logoTitle">税理士法人クロジカ</title>
              <use href="#svgLogoMarkText" />
            </svg>
          </div>
          <div className={styles.boxNav}>
            <nav>
              {navMenu.map((item) =>
                item.isExternal ? (
                  <ExternalLink
                    href={item.href}
                    onClick={closeMenu}
                    key={`${item.href}-${item.label}`}
                  >
                    {item.label}
                  </ExternalLink>
                ) : (
                  <ScrollLink
                    href={item.href}
                    onClick={closeMenu}
                    key={`${item.href}-${item.label}`}
                  >
                    {item.label}
                  </ScrollLink>
                )
              )}
            </nav>
          </div>
          <div className={styles.wrapTel}>
            <ExternalLink href="tel:0964261515">
              <span className={styles.title}>
                <i className={styles.number}>0964.26.1515</i>
              </span>
              <span className={styles.name}>宇土オフィス</span>
            </ExternalLink>
            <ExternalLink href="tel:0963634520">
              <span className={styles.title}>
                <i className={styles.number}>096.363.4520</i>
              </span>
              <span className={styles.name}>熊本オフィス</span>
            </ExternalLink>
          </div>
          <ScrollLink
            href="/contact/"
            className={styles.linkForm}
            onClick={closeMenu}
          >
            <span>Mail Form</span>
          </ScrollLink>
        </div>
      </article>
      <button
        type="button"
        ref={buttonRef}
        className={clsx(styles.hamburgerButton, isOpen && styles.isOpen)}
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
