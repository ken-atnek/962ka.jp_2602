/* =======================================
 * クロジカ About Historyブロック
 * URL: /src/components/about/AboutHistory.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */

import AnimatedTitle from '@/components/common/AnimatedTitle';
import DistortionImage from '@/components/common/DistortionImage';
import styles from '@/styles/PageAbout.module.scss';

const historyGroups = [
  [
    '平成8年9月：山口貞義が山口会計事務所を開業',
    '平成29年1月：山口貞義と山口真太郎が税理士法人やまぐち設立',
    '令和元年5月：山口真太郎が税理士法人やまぐちの代表就任',
    '令和2年8月：税理士法人絆と合併し税理士法人クロジカを設立',
  ],
  [
    '昭和58年4月：隈部幸一が隈部会計事務所を開業',
    '平成8年1月：税理士法人絆　設立',
    '令和2年8月：税理士法人やまぐちと合併し税理士法人クロジカを設立',
  ],
] as const;

export default function AboutHistory() {
  return (
    <section className={styles.containerAboutHistory} aria-label="history">
      <article>
        <div className={styles.boxTitle}>
          <AnimatedTitle
            className={styles.titleAnimated}
            visibleClassName={styles.isVisible}
            text="History"
          />
        </div>

        <div className={styles.historyBody}>
          <div className={styles.historyText}>
            {historyGroups.map((group, index) => (
              <div key={index} className={styles.historyGroup}>
                {group.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </article>
      <div className={styles.historyImages}>
        <div className={styles.historyImageWide}>
          <DistortionImage
            src="/images/about/history-02.webp"
            alt="打ち合わせ風景"
          />
        </div>
        <div className={styles.historyImageTall}>
          <DistortionImage
            src="/images/about/history-01.webp"
            alt="スタッフ写真"
          />
        </div>
      </div>
    </section>
  );
}
