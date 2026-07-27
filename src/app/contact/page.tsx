/* =======================================
 * クロジカ Contactページ
 * URL: /src/app/contact/page.tsx
 * Referenced in: /src/app/contact/page.tsx
 * Created: 2026-06-22
 * Last updated: 2026-07-27
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction, ogpImage } from '@/lib/env';
import styles from '@/styles/PageContact.module.scss';
import EntryPageClient from './EntryPageClient';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Contact | 税理士法人クロジカ',
    description: isRealProduction
      ? '税理士法人クロジカへのお問い合わせページです。ご相談やご依頼のご連絡を受け付けています。'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/contact/',
      },
      openGraph: {
        title: 'Contact | 税理士法人クロジカ',
        description:
          '税理士法人クロジカへのお問い合わせページです。ご相談やご依頼のご連絡を受け付けています。',
        url: '/contact/',
        type: 'website',
        images: [ogpImage],
      },
    }),
  };
};

export default function ContactPage() {
  return (
    <>
      <section className={styles.containerContact}>
        <div className={styles.blockTitle}>
          <h1>Contact</h1>
        </div>
        <EntryPageClient />
      </section>
    </>
  );
}
