/* =======================================
 * クロジカ Serviceページ
 * URL: /src/app/service/page.tsx
 * Referenced in: /src/app/service/page.tsx
 * Created: 2026-06-18
 * Last updated: 2026-07-27
 * ======================================= */

import type { Metadata } from 'next';
import ContactBlock from '@/components/common/ContactBlock';
import FloatingOrbs from '@/components/common/FloatingOrbs';
import ServiceMovie from '@/components/service/ServiceMovie';
import ServicePageSection from '@/components/service/ServicePageSection';
import { isRealProduction, ogpImage } from '@/lib/env';
import { serviceSections } from './serviceData';
import ScrambleText from '@/components/common/ScrambleText';
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
      openGraph: {
        title: 'Service | 税理士法人クロジカ',
        description:
          '税理士法人クロジカのサービス内容をご紹介します。日常業務の支援から経営判断に関わるコンサルティングまで、企業の黒字化を支える取り組みを掲載しています。',
        url: '/service/',
        type: 'website',
        images: [ogpImage],
      },
    }),
  };
};

export default function ServicePage() {
  return (
    <>
      <FloatingOrbs />
      <section className={styles.containerPageTitle}>
        <ScrambleText text="Service" tag="h1" />
      </section>
      <section
        aria-label="service introduction"
        className={styles.containerHero}
      >
        <article>
          <p className={styles.head}>
            明日に怯えることなく 笑顔で納税する企業を増やし続けたい
            <br />
            「All
            <span>
              <i>W</i>
              <i>W</i>
            </span>
            in the BLACK　〜豊かな輪の輪を皆さまと共に〜」
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
            チームクロジカは、夢を持つ経営者が安心して本業に専念できるように、お客様の黒字決算割合と税務調査省略・申告是認割合を高めつづけ、お客様・私たち・地域社会の全方良しを目指します。
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
      <ServiceMovie />
      <ContactBlock />
    </>
  );
}
