/* =======================================
 * クロジカ About Messageブロック
 * URL: /src/components/about/AboutMessage.tsx
 * Referenced in: /src/app/about/page.tsx
 * Created: 2026-06-20
 * Last updated: 2026-07-21
 * ======================================= */

import styles from '@/styles/PageAbout.module.scss';
import AnimatedTitle from '@/components/common/AnimatedTitle';
import DistortionImage from '@/components/common/DistortionImage';

type OverviewSection = {
  title: string;
  lines: readonly string[];
};

const overviewSections: readonly OverviewSection[] = [
  {
    title: 'TODAY',
    lines: [
      '受け継いだ想いを、今は私たち全員で未来へつないでいます。',
      '「明日に怯えることなく、笑顔で納税する企業を増やし続けたい。」',
      'このミッションのもと、一社一社の未来に寄り添い、',
      '地域とともに歩み続けます。',
    ],
  },
  {
    title: 'FOR THE FUTURE',
    lines: [
      '創業から積み重ねてきた信頼。',
      '受け継いできた理念。',
      'そして、未来への挑戦。',
      '税理士法人クロジカは、これからも熊本の企業とともに、新しい歴史を刻み続けます。',
    ],
  },
] as const;

export default function AboutMessage() {
  return (
    <section
      className={styles.containerMessage}
      aria-label="company overview details"
    >
      <article>
        <div className={styles.boxTitle}>
          <AnimatedTitle
            className={styles.titleAnimated}
            visibleClassName={styles.isVisible}
            text={`Message`}
          />
        </div>
        <div className={styles.overviewColumns}>
          {overviewSections.map((section) => (
            <section key={section.title} className={styles.overviewSection}>
              <h3>{section.title}</h3>
              <div className={styles.overviewText}>
                {section.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
      <div className={styles.overviewImages}>
        <div className={styles.overviewImageWide}>
          <DistortionImage
            src="/images/about/overview-02.webp"
            alt="2ショット写真"
            cameraFar={1.5}
            cameraNear={0.99}
            // firstDistortion={200}
          />
        </div>
        <div className={styles.overviewImageTall}>
          <DistortionImage
            src="/images/about/overview-01.webp"
            alt="スタッフ写真"
            cameraFar={1.5}
            cameraNear={0.99}
            firstDistortion={200}
          />
        </div>
      </div>
      <div className={styles.overviewImageBottom}>
        <DistortionImage
          src="/images/about/overview-03.webp"
          alt="スタッフ集合写真"
          cameraFar={1.5}
          cameraNear={0.99}
          firstDistortion={200}
        />
      </div>
    </section>
  );
}
