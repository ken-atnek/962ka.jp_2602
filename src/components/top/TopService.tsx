/* =======================================
 * クロジカ TOP Serviceセクション
 * URL: /src/components/top/TopService.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-17
 * ======================================= */
import styles from './TopService.module.scss';
import ScrollLink from '@/components/common/ScrollLink';
import AnimatedTitle from '@/components/common/AnimatedTitle';

const TopService = () => {
  return (
    <section
      className={styles.containerTopService}
      id="service"
      aria-label="service"
    >
      <article>
        <div className={styles.boxTitle}>
          <AnimatedTitle
            className={styles.titleAnimated}
            visibleClassName={styles.isVisible}
            text="Service"
          />
          <p>
            私たちにできる事。
            <br />
            サービス内容のご説明。
          </p>
        </div>
        <nav>
          <ScrollLink href="/service/#basic" className={styles.linkBasic}>
            <h3>01_BASIC</h3>
            <p>
              ビジョンの実現のために
              <br />
              これらのサービスを提供しています
            </p>
            <div className={styles.itemButton}>
              <span>service</span>
            </div>
          </ScrollLink>
          <ScrollLink
            href="/service/#consulting"
            className={styles.linkConsulting}
          >
            <h3>02_CONSULTING</h3>
            <p>
              通常業務の他に高付加価値な
              <br />
              コンサルティングサービスをご用意しています
            </p>
            <div className={styles.itemButton}>
              <span>service</span>
            </div>
          </ScrollLink>
        </nav>
      </article>
    </section>
  );
};

export default TopService;
