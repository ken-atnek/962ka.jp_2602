/* =======================================
 * クロジカ Contactページ
 * URL: /src/app/contact/page.tsx
 * Referenced in: /src/app/contact/page.tsx
 * Created: 2026-06-22
 * Last updated: 2026-06-22
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
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
