/* =======================================
 * クロジカ FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2026-02-03
 * Last updated: 2026-02-03
 * ======================================= */
'use client';
import styles from './Footer.module.scss';
import Link from 'next/link';
import { navMenu } from '@/data/navMenuData';
import { useAnchorNav } from '@/hooks/useAnchorNav';
import ExternalLink from '@/components/common/ExternalLink';

const Footer = () => {
  const { onNavClick } = useAnchorNav();

  return (
    <footer className={styles.containerFooter}>
      <div className={styles.itemLogo} aria-labelledby="logoTitle">
        <svg>
          <title id="logoTitle">税理士法人クロジカ</title>
          <use href="#svgLogoMarkText" />
        </svg>
      </div>
      <div className={styles.copyright}>©2026 KUROJIKA CO., LTD.</div>
      <nav>
        {navMenu.map((item) => (
          <Link
            href={item.href}
            onClick={(e) => onNavClick(e, item.href)}
            key={`${item.href}-${item.label}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.boxLink}>
        <span>follow</span>
        <ExternalLink href="#" className={styles.linkNote}>
          <svg>
            <use href="#svgLogoNote" />
          </svg>
        </ExternalLink>
        <ExternalLink href="#" className={styles.linkInsta}>
          <svg>
            <use href="#svgInsta" />
          </svg>
        </ExternalLink>
      </div>
    </footer>
  );
};

export default Footer;
