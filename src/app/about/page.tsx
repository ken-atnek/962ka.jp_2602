/* =======================================
 * クロジカ Aboutページ
 * URL: /src/app/about/page.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */

import type { Metadata } from 'next';
import AboutCompanyOverview from '@/components/about/AboutCompanyOverview';
import AboutHistory from '@/components/about/AboutHistory';
import AboutOrganizations from '@/components/about/AboutOrganizations';
import AboutStatement from '@/components/about/AboutStatement';
import ContactBlock from '@/components/common/ContactBlock';
import FloatingOrbs from '@/components/common/FloatingOrbs';
import { isRealProduction } from '@/lib/env';
import styles from '@/styles/PageAbout.module.scss';

export const generateMetadata = (): Metadata => {
  return {
    title: 'About | 税理士法人クロジカ',
    description: isRealProduction
      ? '税理士法人クロジカについてご紹介します。黒字化支援への考え方、法人概要、これまでの歩みを掲載しています。'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/about/',
      },
    }),
  };
};

export default function AboutPage() {
  return (
    <>
      <FloatingOrbs />
      <section className={styles.containerPageTitle}>
        <h1>About</h1>
      </section>
      <AboutOrganizations />
      <AboutStatement />
      <AboutCompanyOverview />
      <AboutHistory />

      <ContactBlock />
    </>
  );
}
