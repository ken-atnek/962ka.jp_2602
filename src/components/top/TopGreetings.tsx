/* =======================================
 * クロジカ TOP Greetingsセクション
 * URL: /src/components/top/TopGreetings.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-17
 * ======================================= */
import AnimatedTitle from '@/components/common/AnimatedTitle';
import styles from './TopGreetings.module.scss';
import ScrollLink from '@/components/common/ScrollLink';

const TopGreetings = () => {
  return (
    <section
      className={styles.containerTopGreetings}
      id="greetings"
      aria-label="greetings"
    >
      <div className={styles.innerSection}>
        <article>
          <div className={styles.boxTitle}>
            <AnimatedTitle
              className={styles.titleAnimated}
              visibleClassName={styles.isVisible}
              text="Greetings"
            />
            <p>
              初めまして、山口です。
              <br />
              ご挨拶をさせてください。
            </p>
          </div>
        </article>
      </div>
      <div className={styles.boxDetails}>
        <div className={styles.wrapLogoLeft}>
          <div className={styles.itemName}>
            <span>SHINTAROU</span>
            <span>YAMAGUCHI</span>
          </div>
          <svg className={styles.svgLeft}>
            <use href="#svgLogoMarkLeft" />
          </svg>
        </div>
        <div className={styles.itemPerson}>
          <span className={styles.itemPersonMono}></span>
          <span className={styles.itemPersonColor}></span>
        </div>
        <div className={styles.wrapLogoRight}>
          <ScrollLink href="/greetings/" className={styles.pageLink}>
            <span>greetings</span>
          </ScrollLink>
          <svg className={styles.svgRight}>
            <use href="#svgLogoMarkRight" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TopGreetings;
