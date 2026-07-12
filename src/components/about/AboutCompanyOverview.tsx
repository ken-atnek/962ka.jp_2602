/* =======================================
 * クロジカ About 会社概要ブロック
 * URL: /src/components/about/AboutCompanyOverview.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */

import styles from '@/styles/PageAbout.module.scss';
import AnimatedTitle from '@/components/common/AnimatedTitle';
import ExternalLink from '@/components/common/ExternalLink';
import DistortionImage from '@/components/common/DistortionImage';
type OverviewRow = {
  label: string;
  value: readonly string[];
  href?: string;
};

type OverviewCard = {
  title: string;
  rows: readonly OverviewRow[];
};

const overviewCards: readonly OverviewCard[] = [
  {
    title: '宇土オフィス',
    rows: [
      { label: '会社名', value: ['税理士法人クロジカ'] },
      { label: '所在地', value: ['熊本県宇土市北段原町16番地3'] },
      { label: '電話番号', value: ['0964-26-1515'], href: 'tel:0964261515' },
      { label: 'FAX', value: ['0964-26-1516'] },
      // {
      //   label: 'MAIL',
      //   value: ['info-y@962ka.jp'],
      //   href: 'mailto:info-y@962ka.jp',
      // },
      // { label: '代表者名', value: ['山口真太郎'] },
      // {
      //   label: '設立年月',
      //   value: ['令和2年8月3日', '平成8年9月設立(山口会計事務所)'],
      // },
    ],
  },
  {
    title: '熊本オフィス',
    rows: [
      { label: '会社名', value: ['税理士法人クロジカ　絆会計事務所'] },
      { label: '所在地', value: ['熊本県熊本市中央区本荘町719'] },
      { label: '電話番号', value: ['096-363-4520'], href: 'tel:0963634520' },
      { label: 'FAX', value: ['096-362-1150'] },
      // {
      //   label: 'MAIL',
      //   value: ['info-k@962ka.jp'],
      //   href: 'mailto:info-k@962ka.jp',
      // },
      // { label: 'HP', value: ['https://962ka.jp'], href: 'https://962ka.jp' },
      // { label: '代表者名', value: ['隈部幸一'] },
      // {
      //   label: '設立年月',
      //   value: ['令和2年8月3日', '昭和58年4月設立（隈部会計事務所）'],
      // },
    ],
  },
] as const;

export default function AboutCompanyOverview() {
  return (
    <section
      className={styles.containerCompanyOverview}
      aria-label="company overview details"
    >
      <article>
        <div className={styles.boxTitle}>
          <AnimatedTitle
            className={styles.titleAnimated}
            visibleClassName={styles.isVisible}
            text={`Company\nOverview`}
          />
        </div>
        <div className={styles.overviewColumns}>
          {overviewCards.map((card) => (
            <section key={card.title} className={styles.companyCard}>
              <h3>{card.title}</h3>
              <dl>
                {card.rows.map((row) => (
                  <div key={`${card.title}-${row.label}`}>
                    <dt>{row.label}</dt>
                    <dd>
                      {row.href ? (
                        <ExternalLink href={row.href}>
                          {row.value.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </ExternalLink>
                      ) : (
                        row.value.map((line) => <span key={line}>{line}</span>)
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </article>
      <div className={styles.overviewImages}>
        <div className={styles.overviewImageWide}>
          <DistortionImage
            src="/images/about/overview-02.webp"
            alt="2ショット写真"
            cameraFar={1.5}
            cameraNear={0.99}
            // firstDistortion={200}
          />
        </div>
        <div className={styles.overviewImageTall}>
          <DistortionImage
            src="/images/about/overview-01.webp"
            alt="スタッフ写真"
            cameraFar={1.5}
            cameraNear={0.99}
            firstDistortion={200}
          />
        </div>
      </div>
      <div className={styles.overviewImageBottom}>
        <DistortionImage
          src="/images/about/overview-03.webp"
          alt="スタッフ集合写真"
          cameraFar={1.5}
          cameraNear={0.99}
          firstDistortion={200}
        />
      </div>
    </section>
  );
}
