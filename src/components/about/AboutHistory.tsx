/* =======================================
 * クロジカ About Historyブロック
 * URL: /src/components/about/AboutHistory.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */

import AnimatedTitle from '@/components/common/AnimatedTitle';

import styles from '@/styles/PageAbout.module.scss';

const historyGroups = [
  {
    title: '宇土オフィスの歴史',
    items: [
      '1996年：山口税理士事務所 開業',
      '1997年：TKC全国会 入会',
      '2000年：現在の事務所へ移転',
      '2015年：黒字化支援を開始',
      '2017年：税理士法人やまぐち 設立',
      '2018年：理念経営への取り組みを開始',
    ],
  },
  {
    title: '熊本オフィスの歴史',
    items: [
      '1983年：隈部会計事務所 開業',
      '1984年：TKC全国会 入会',
      '1989年：事務所スペースを2倍へ拡張',
      '1995年：事務所へ移転 ',
      '2008年：理士法人絆 設立  ',
      '2016年：組織拡大・スタッフ増員',
    ],
  },
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
            {historyGroups.map((group) => (
              <div key={group.title} className={styles.historyGroup}>
                <h3>{group.title}</h3>
                {group.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ))}
          </div>
          <p className={styles.bottomText}>
            2020年8月
            <br />
            税理士法人クロジカ 誕生
            <br />
            税理士法人絆 × 税理士法人やまぐち
            <br />
            Two Histories. One Future.
          </p>
        </div>
      </article>
    </section>
  );
}
