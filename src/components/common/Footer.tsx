/* =======================================
 * クロジカ FOOTER
 * URL: /src/components/common/Footer.tsx
 * Referenced in: /src/app/layout.tsx
 * Created: 2026-02-03
 * Last updated: 2026-07-13
 * ======================================= */
'use client';
import styles from './Footer.module.scss';
import { navMenu } from '@/data/navMenuData';
import ExternalLink from '@/components/common/ExternalLink';
import ScrollLink from '@/components/common/ScrollLink';

const Footer = () => {
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
        {navMenu.map((item) =>
          item.isExternal ? (
            <ExternalLink href={item.href} key={`${item.href}-${item.label}`}>
              {item.label}
            </ExternalLink>
          ) : (
            <ScrollLink href={item.href} key={`${item.href}-${item.label}`}>
              {item.label}
            </ScrollLink>
          )
        )}
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
