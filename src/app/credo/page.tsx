/* =======================================
 * クロジカ Credoページ
 * URL: /src/app/credo/page.tsx
 * Referenced in: /src/data/navMenuData.ts
 * Created: 2026-07-11
 * Last updated: 2026-07-11
 * ======================================= */

import type { Metadata } from 'next';

import ContactBlock from '@/components/common/ContactBlock';
import CredoContent from '@/components/credo/CredoContent';
import FloatingOrbs from '@/components/common/FloatingOrbs';
import ServiceMovie from '@/components/service/ServiceMovie';
import { isRealProduction } from '@/lib/env';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Credo | 税理士法人クロジカ',
    description: isRealProduction
      ? '税理士法人クロジカのクレドをご紹介します。ミッション・ビジョン・コミットメント・バリューを通じて、私たちが大切にしている考え方を掲載しています。'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/credo/',
      },
    }),
  };
};

export default function CredoPage() {
  return (
    <>
      <FloatingOrbs />
      <CredoContent />
      <ServiceMovie />
      <ContactBlock />
    </>
  );
}
