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
        <ExternalLink
          href="https://note.com/962ka?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZnRzaATTzTBwZG9mAmV4dG4DYWVtAjExAHNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp7uCHVkBqFPaxG4zYIbslg83ZOXemrRzbl1aFJr5FP_TkAbwmcJVjTe3I93q_aem_Y6HEGf4URMbeaobLppZ79g"
          className={styles.linkNote}
        >
          <svg>
            <use href="#svgLogoNote" />
          </svg>
        </ExternalLink>
        <ExternalLink
          href="https://www.instagram.com/kurojika.962ka?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          className={styles.linkInsta}
        >
          <svg>
            <use href="#svgInsta" />
          </svg>
        </ExternalLink>
      </div>
    </footer>
  );
};

export default Footer;
