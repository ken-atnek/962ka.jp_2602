/* =======================================
 * クロジカ Greetingsページ
 * URL: /src/app/greetings/page.tsx
 * Referenced in: /src/data/navMenuData.ts
 * Created: 2026-06-18
 * Last updated: 2026-06-19
 * ======================================= */

import type { Metadata } from 'next';
import Image from 'next/image';
import ContactBlock from '@/components/common/ContactBlock';
import FloatingOrbs from '@/components/common/FloatingOrbs';
import GreetingBlock from '@/components/greetings/GreetingBlock';
import GreetingGalleryBlock from '@/components/greetings/GreetingGalleryBlock';
import ProfileBlock from '@/components/greetings/ProfileBlock';
import ScatterName from '@/components/greetings/ScatterName';
import { isRealProduction } from '@/lib/env';
import ScrambleText from '@/components/common/ScrambleText';
import styles from '@/styles/PageGreetings.module.scss';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Greetings | 税理士法人クロジカ',
    description: isRealProduction
      ? '税理士法人クロジカ代表・山口真太郎からのご挨拶です。クロジカが大切にしている姿勢と、企業の黒字化に向けた想いをお伝えします。'
      : undefined,
    ...(isRealProduction && {
      alternates: {
        canonical: '/greetings/',
      },
    }),
  };
};

export default function GreetingsPage() {
  return (
    <>
      <FloatingOrbs />
      <section className={styles.containerHero}>
        <ScrambleText text="Greetings" tag="h1" />
        <ScatterName />
        <ProfileBlock />
        <GreetingBlock />
        <div className={styles.imagePerson}>
          <Image
            src="/images/greeting/hero-person.webp"
            alt="山口真太郎の画像"
            width={593}
            height={1821}
          />
        </div>
      </section>
      <GreetingGalleryBlock />
      <ContactBlock />
    </>
  );
}
