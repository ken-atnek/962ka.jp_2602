/* =======================================
 * クロジカ HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2026-02-03
 * Last updated: 2026-02-03
 * ======================================= */
'use client';
import styles from './Header.module.scss';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// import Image from 'next/image';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  }, [isOpen]);

  // ページ判定
  const pathname = usePathname();
  const isTop = pathname === '/';

  return (
    <header
      className={clsx(
        styles.containerHeader,
        isTop ? styles['isTop'] : styles['isSub']
      )}
      id="Header"
    >
      <button
        type="button"
        className={`${styles.hamburgerButton} ${
          isOpen ? styles['is-open'] : ''
        }`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="メニューを開閉"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <article>
        <h1>
          <Link href="/" aria-label="株式会社九州運輸 トップページへ">
            {/* <Image
              src={isTop ? '/images/logo-wh.webp' : '/images/logo-bk.webp'}
              alt="株式会社九州運輸"
              width={360}
              height={40}
              loading="lazy"
            /> */}
          </Link>
        </h1>

        <nav className={styles.mainMenu}>
          <Link href="/works/">事業内容</Link>
          <Link href="/vehicles/">保有車両</Link>
          <Link href="/company/">会社概要</Link>
        </nav>
        <nav className={styles.subMenu}>
          <Link href="/recruit/" className={styles.linkRecruit}>
            採用情報
          </Link>
          <Link href="/contact/" className={styles.linkContact}>
            ご依頼・お問い合せ
          </Link>
        </nav>
      </article>
    </header>
  );
};

export default Header;
