/* =======================================
 * クロジカ TKC infoページ
 * URL: /src/app/tkc/page.tsx
 * Referenced in: /src/app/tkc/page.tsx
 * Created: 2026-08-01
 * Last updated: 2026-08-01
 * ======================================= */

import type { Metadata } from 'next';
import FloatingOrbs from '@/components/common/FloatingOrbs';
import ScrambleText from '@/components/common/ScrambleText';
import { isRealProduction, ogpImage } from '@/lib/env';
import styles from '@/styles/PageTkc.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import ContactBlock from '@/components/common/ContactBlock';
import ServiceMovie from '@/components/service/ServiceMovie';
export const generateMetadata = (): Metadata => {
  return {
    title: 'TKC info | 税理士法人クロジカ',
    description: isRealProduction
      ? '税理士法人クロジカのTKC infoページです。'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/tkc/',
      },
      openGraph: {
        title: 'TKC info | 税理士法人クロジカ',
        description: '税理士法人クロジカのTKC infoページです。',
        url: '/tkc/',
        type: 'website',
        images: [ogpImage],
      },
    }),
  };
};
const tkcLinks = [
  {
    href: 'https://presidentasp.tkc.co.jp/PresidentASP/PresidentASPDeploy/PresidentASP.htm',
    label: '社長メニュー(貴社の最新業績を確認できます)',
  },
  {
    href: 'https://www.prft.tkc.co.jp/SystemqaCC/Main/SystemList.aspx?cds=%3c(%5e7%3aLI%27',
    label: '戦略経営者システムQ&A',
  },
  {
    href: 'https://www.123.tkcnf.or.jp/ContentsDelivery/Redirector.aspx?key=%3cH%5e%3c%3aJ7RLQ%27',
    label: '毎月更新！お役立ちコーナー',
  },
  {
    href: 'https://www.123.tkcnf.or.jp/ContentsDelivery/Redirector.aspx?key=%3cW%5e%3b%3aJ7RL!%27',
    label: '補助金・助成金情報',
  },
  {
    href: 'https://www.123.tkcnf.or.jp/ContentsDelivery/Redirector.aspx?key=%3cG%5e%3b%3aJ7RLQ%27',
    label: 'TCK戦略経営者ローン',
  },
  {
    href: 'https://www.123.tkcnf.or.jp/ContentsDelivery/Redirector.aspx?key=%3cV%5e%3a%3aJ7RL!%27',
    label: 'FX4クラウドのご紹介',
  },
  {
    href: 'https://www.tkcnf.or.jp/automatic/shienkikan.html',
    label: '経営革新等支援機関',
  },
  {
    href: 'https://www.tkcnf.or.jp/automatic/kaizen_c.html',
    label: '金融機関から信頼を高める「経営改善計画」',
  },
  {
    href: 'https://www.tkcnf.or.jp/automatic/tkc-denchou-invoice.html',
    label: '電子帳簿保存法・インボイス制度最新情報',
  },
];
export default function TkcPage() {
  return (
    <>
      <FloatingOrbs />
      <section className={styles.containerPageTitle}>
        <ScrambleText text={'TKC\u00a0info'} tag="h1" />
      </section>
      <section className={styles.containerTkc} aria-label="tkc">
        <nav>
          {tkcLinks.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </nav>
      </section>
      <ServiceMovie />
      <ContactBlock />
    </>
  );
}
