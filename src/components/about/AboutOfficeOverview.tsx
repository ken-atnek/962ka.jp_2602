/* =======================================
 * クロジカ About 会社概要ブロック
 * URL: /src/components/about/AboutOfficeOverview.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-07-21
 * Last updated: 2026-07-21
 * ======================================= */

import Image from 'next/image';
import styles from '@/styles/PageAbout.module.scss';
import AnimatedTitle from '@/components/common/AnimatedTitle';
type OverviewRow = {
  label: string;
  value: string;
};

type OfficeOverview = {
  title: string;
  rows: readonly OverviewRow[];
};

const officeOverviews: readonly OfficeOverview[] = [
  {
    title: '宇土オフィス',
    rows: [
      { label: '会社名', value: '税理士法人クロジカ' },
      { label: '所在地', value: '熊本県宇土市北段原町16番地3' },
      { label: '電話番号', value: '0964-26-1515' },
      { label: 'FAX', value: '0964-26-1516' },
    ],
  },
  {
    title: '熊本オフィス',
    rows: [
      { label: '会社名', value: '税理士法人クロジカ　絆会計事務所' },
      { label: '所在地', value: '熊本県熊本市中央区本荘町719' },
      { label: '電話番号', value: '096-363-4520' },
      { label: 'FAX', value: '096-362-1150' },
    ],
  },
] as const;

export default function AboutOfficeOverview() {
  return (
    <section
      className={styles.containerOfficeOverview}
      aria-label="company overview"
    >
      <article>
        <div className={styles.boxTitle}>
          <AnimatedTitle
            className={styles.titleAnimated}
            visibleClassName={styles.isVisible}
            text={`Company\nOverview`}
          />
          <Image
            src="/images/logo.svg"
            alt="税理士法人クロジカ"
            width={256}
            height={38}
          />
        </div>

        <div className={styles.officeOverviewBody}>
          <div className={styles.officeOverviewColumns}>
            {officeOverviews.map((office) => (
              <section key={office.title} className={styles.officeCard}>
                <h3>{office.title}</h3>
                <dl>
                  {office.rows.map((row) => (
                    <div key={`${office.title}-${row.label}`}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
