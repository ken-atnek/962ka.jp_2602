/* =======================================
 * クロジカ TOPページ
 * URL: src/app/page.tsx
 * Created: 2026-02-03
 * Last updated: 2026-06-17
 * ======================================= */

import type { Metadata } from 'next';
import ContactBlock from '@/components/common/ContactBlock';
import FloatingOrbs from '@/components/common/FloatingOrbs';
import TopAbout from '@/components/top/TopAbout';
import TopCredo from '@/components/top/TopCredo';
import TopGreetings from '@/components/top/TopGreetings';
import TopHero from '@/components/top/TopHero';
import TopService from '@/components/top/TopService';
import { isRealProduction } from '@/lib/env';

export const generateMetadata = (): Metadata => {
  return {
    title: '税理士法人クロジカ|「黒字化」が第一歩|熊本の会計事務所',
    description: isRealProduction
      ? 'クロジカの「クロジ力」|熊本の会計事務所|クロジカではお客様のパートナーとして、税務はもちろん、「黒字化」を第一歩とした様々な施策を提案いたします。'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/',
      },
    }),
  };
};
export default function Home() {
  return (
    <>
      <FloatingOrbs />
      <TopHero />
      <TopAbout />
      <TopService />
      <TopGreetings />
      <TopCredo />
      <ContactBlock />
    </>
  );
}
