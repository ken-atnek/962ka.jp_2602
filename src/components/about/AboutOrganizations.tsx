/* =======================================
 * クロジカ About 組織紹介ブロック
 * URL: /src/components/about/AboutOrganizations.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */

import Image from 'next/image';
import styles from '@/styles/PageAbout.module.scss';

const companyCards = [
  {
    number: '#01',
    title: '税理士法人クロジカ',
    description: [
      '「租税正義の実現」を目指して、企業や店舗、病院などの税務顧問として従事するほか、新規開業も応援。',
      '税務署や金融機関に信用される決算書・申告書の作成、経営判断に必要な会計数値の提供、節税対策のご提案などを行っています。',
    ],
    items: ['各種税務相談', '自計化支援', '事業承継／株式評価'],
  },
  {
    number: '#02',
    title: '税理士法人クロジカ 竹村会計事務所',
    description: [
      'コーチングを通して、お金の流れを「見える化」。適切な黒字化へ導く経営コンサルティングが主な業務。',
      '加えて「企業防衛」を意図した各種生命保険の取り扱い、「資産防衛」としての不動産に関するご提案も行います。',
    ],
    items: [
      '黒字化・資金繰改善支援',
      '企業防衛(各種生保取り扱い)',
      '資産防衛(各種住宅メーカー提携)',
    ],
  },
] as const;

export default function AboutOrganizations() {
  return (
    <>
      <section className={styles.containerLead} aria-label="about lead">
        <div className={styles.itemLogo}>
          <svg>
            <title id="logoTitle">税理士法人クロジカ</title>
            <use href="#svgLogoMarkText" />
          </svg>
        </div>
        <article className={styles.blockTop}>
          <div className={styles.boxLeft}>
            <Image
              src="/images/about/item-box-left.svg"
              alt="税理士"
              width={194}
              height={127}
            />
          </div>
          <div className={styles.boxRight}>
            <Image
              src="/images/about/item-box-right.svg"
              alt="税理士"
              width={152}
              height={174}
            />
          </div>
        </article>
        <article className={styles.blockBottom} aria-label="company overview">
          <h2>Kurojikaは、2つの組織から出来ています。</h2>
          {companyCards.map((card) => (
            <div key={card.number} className={styles.overviewCard}>
              <p className={styles.cardNumber}>{card.number}</p>
              <h3>{card.title}</h3>
              <div className={styles.cardDescription}>
                {card.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <ul className={styles.cardList}>
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
