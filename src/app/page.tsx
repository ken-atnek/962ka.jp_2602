/* =======================================
 * クロジカ TOPページ
 * URL: src/app/page.tsx
 * Created: 2026-02-03
 * Last updated: 2026-02-03
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';

export const generateMetadata = (): Metadata => {
  return {
    title: '税理士法人クロジカ',
    description: isRealProduction
      ? 'クロジカの「クロジ力」|熊本の会計事務所|クロジカではお客様のパートナーとして、税務はもちろん、「黒字化」を第一歩とした様々な施策を提案いたします。'
      : undefined,
  };
};
export default function Home() {
  return <></>;
}
