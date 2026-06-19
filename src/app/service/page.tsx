/* =======================================
 * クロジカ Serviceページ
 * URL: /src/app/service/page.tsx
 * Referenced in: /src/app/service/page.tsx
 * Created: 2026-06-18
 * Last updated: 2026-06-18
 * ======================================= */

import type { Metadata } from 'next';
import ContactBlock from '@/components/common/ContactBlock';
import FloatingOrbs from '@/components/common/FloatingOrbs';
import ServicePageSection from '@/components/service/ServicePageSection';
import TopCredo from '@/components/top/TopCredo';
import { isRealProduction } from '@/lib/env';
import { serviceSections } from './serviceData';
import styles from '@/styles/PageService.module.scss';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Service | 税理士法人クロジカ',
    description: isRealProduction
      ? '税理士法人クロジカのサービス内容をご紹介します。日常業務の支援から経営判断に関わるコンサルティングまで、企業の黒字化を支える取り組みを掲載しています。'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/service/',
      },
    }),
  };
};

export default function ServicePage() {
  return (
    <>
      <FloatingOrbs />
      <section className={styles.containerPageTitle}>
        <h1>Service</h1>
      </section>
      <section
        aria-label="service introduction"
        className={styles.containerHero}
      >
        <article>
          <p className={styles.head}>
            明日に怯えることなく 笑顔で納税する企業を増やし続けたい
            <br />
            関わるお客様99％の『健全な黒字化』と『信頼性の高い税務申告』を実現します。
          </p>
          <p>
            このビジョン実現に向けて私たちチームクロジカは事務所経営を行っています。経営者の皆様は実現したいビジョンがあり、その為に事業をされているはずです。
            <br />
            <br />
            ビジョンとお金は両輪です。
            <br />
            <br />
            やりたい事のためにお金は絶対条件ではないですが必須条件です。そして、お金が増える時は税金も発生します。
          </p>
          <p>
            『お客様が黒字でやりたいことができる』
            <br />
            『私たちも適正な報酬を長くいただける』
            <br />
            『双方が正しく納税し雇用も持続できる』
            <br />
            <br />
            結果的に地域社会から応援されます。
            <br />
            チームクロジカは、夢を持つ経営者が安心して本業に専念できるように、お客様の黒字決算割合と税務調査省略・申告是認割合を高めつづけ、お客様・私たち・地域社会の三方良しを目指します。
          </p>
        </article>
      </section>

      <section
        className={styles.containerServiceBlocks}
        aria-label="service details"
      >
        <div className={styles.serviceBlocksInner}>
          {serviceSections.map((section) => (
            <ServicePageSection key={section.sectionNumber} {...section} />
          ))}
        </div>
      </section>

      <TopCredo />
      <ContactBlock />
    </>
  );
}
