/* =======================================
 * クロジカ About ステートメントブロック
 * URL: /src/components/about/AboutStatement.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-07-27
 * ======================================= */
import styles from '@/styles/PageAbout.module.scss';
import DistortionImage from '@/components/common/DistortionImage';
import CatchCopy from '@/components/about/CatchCopy';

const statementLines: readonly string[] = [
  '私たちは、熊本に事務所を構え、常に企業様や店舗様の「黒字化」を第一に考えてまいりました。',
  '地元・熊本への愛を礎に、お客様とともに歩み、ともに成長し、',
  '一つのチームとして強くなっていく。',
  'それが私たち、チーム『クロジカ』です。',
] as const;

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
            {statementLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </article>
    </section>
  );
}
