/* =======================================
 * クロジカ About ステートメントブロック
 * URL: /src/components/about/AboutStatement.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-06-20
 * ======================================= */
import styles from '@/styles/PageAbout.module.scss';
import DistortionImage from '@/components/common/DistortionImage';
import CatchCopy from '@/components/about/CatchCopy';

export default function AboutStatement() {
  return (
    <section className={styles.containerAboutStatement}>
      <article>
        <div className={styles.boxTop}>
          <CatchCopy />
          <div className={styles.itemImage}>
            <DistortionImage
              src="/images/about/statement-01.webp"
              alt="海岸ポートレート"
            />
          </div>
        </div>
        <div className={styles.boxBottom}>
          <h2>黒字であれ。</h2>
          <div className={styles.itemImage}>
            <DistortionImage
              src="/images/about/statement-02.webp"
              alt="海岸ポートレート"
            />
          </div>
          <p>
            私たちは、熊本に事務所を構え、常に企業様や店舗様の「黒字化」を第一に考えてまいりました。
            <br />
            どんな状態であっても、資金が回るようになれば、企業・店舗は適切に機能していきます。
            <br />
            資金繰りにフォーカスを当てたアドバイスとコンサルを。
            <br />
            私たちに、皆様の黒字化のお手伝いをさせてください。
          </p>
        </div>
      </article>
    </section>
  );
}
