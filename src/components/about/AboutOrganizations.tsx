/* =======================================
 * クロジカ About 組織紹介ブロック
 * URL: /src/components/about/AboutOrganizations.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */
'use client';
import Image from 'next/image';
import styles from '@/styles/PageAbout.module.scss';
import useAddClassOnInView from '@/hooks/useAddClassOnInView';

export default function AboutOrganizations() {
  const ref = useAddClassOnInView<HTMLDivElement>(styles.isVisible, {
    threshold: 0.6,
  });
  return (
    <>
      <section className={styles.containerLead} aria-label="about lead">
        <div className={styles.itemLogo}>
          <svg>
            <title id="logoTitle">税理士法人クロジカ</title>
            <use href="#svgLogoMarkText" />
          </svg>
        </div>
        <article className={styles.blockTop} ref={ref}>
          <div className={styles.boxLeft}>
            <Image
              src="/images/about/item-box-left.svg"
              alt="税理士"
              width={194}
              height={127}
            />
          </div>
          <div className={styles.boxRight}>
            <Image
              src="/images/about/item-box-right.svg"
              alt="税理士"
              width={152}
              height={174}
            />
          </div>
        </article>
        <article className={styles.blockBottom} aria-label="company overview">
          <div className={styles.overviewCard}>
            <h2>
              OUR STORY
              <br />
              Two Histories. One Future.
            </h2>
            <p>
              税理士法人クロジカの歩みは、一つの事務所の歴史ではありません。
              <br />
              1983年、熊本市で創業した隈部会計事務所（のちの税理士法人絆）。
              <br />
              1996年、宇土市で創業した山口税理士事務所（のちの税理士法人やまぐち）。
              <br />
              それぞれの事務所が地域に根ざし、お客様一人ひとりと真摯に向き合いながら、信頼を積み重ねてきました。
              <br />
              そして2020年8月。
              <br />
              二つの歩みは一つとなり、税理士法人クロジカが誕生しました。
              <br />
              私たちが受け継いだのは、事務所という「形」ではありません。
              <br />
              創業者たちが大切にしてきた、お客様への想い。
              <br />
              誠実に仕事と向き合う姿勢。 人を育て、地域とともに歩む文化。
              <br />
              そして、長い年月をかけて築き上げてきた信頼です。
              <br />
              歴史とは、過去を語るためにあるものではありません。
              <br />
              未来へ想いをつないでいくためにあるもの。
              <br />
              税理士法人クロジカは、これからも熊本の企業とともに歩み、一社一社の未来に寄り添い続けます。
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
