/* =======================================
 * クロジカ CONTACTブロック
 * URL: /src/components/common/ContactBlock.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-17
 * ======================================= */
import AnimatedTitle from '@/components/common/AnimatedTitle';
import ExternalLink from '@/components/common/ExternalLink';
import styles from './ContactBlock.module.scss';
import ScrollLink from '@/components/common/ScrollLink';

const ContactBlock = () => {
  return (
    <section className={styles.containerContact} aria-label="contact">
      <article>
        <div className={styles.boxTitle}>
          <AnimatedTitle
            className={styles.titleAnimated}
            visibleClassName={styles.isVisible}
            text="Contact"
          />
          <p>
            お電話、または
            <br />
            メールフォームにて受け付けております。
          </p>
        </div>
        <nav>
          <ExternalLink href="tel:0964261515">
            <span>Tel</span>
          </ExternalLink>
          <ScrollLink href="#" className={styles.linkForm}>
            <span>Mail Form</span>
          </ScrollLink>
        </nav>
      </article>
    </section>
  );
};

export default ContactBlock;
