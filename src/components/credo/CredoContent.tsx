/* =======================================
 * クロジカ Credoページ コンテンツ
 * URL: /src/components/credo/CredoContent.tsx
 * Referenced in: /src/app/credo/page.tsx
 * Created: 2026-06-22
 * Last updated: 2026-07-11
 * ======================================= */
import styles from '@/styles/PageCredo.module.scss';
import { serviceCredoData } from '@/app/credo/credoData';
import AnimatedTitle from '@/components/common/AnimatedTitle';
import ScrambleText from '@/components/common/ScrambleText';
const CredoContent = () => {
  return (
    <>
      <section className={styles.containerPageTitle}>
        <ScrambleText text="Credo" tag="h1" />
      </section>
      <section className={styles.containerServiceCredo} aria-label="credo">
        <div className={styles.boxHeadTitle}>Credo</div>
        <article>
          <section
            className={styles.introBlock}
            aria-label="mission and vision"
          >
            <div className={styles.introItem}>
              <div className={styles.boxTitle}>
                <AnimatedTitle
                  className={styles.titleAnimated}
                  visibleClassName={styles.isVisible}
                  text="Mission"
                />
              </div>
              <p>
                <em>{serviceCredoData.mission}</em>
              </p>
            </div>
            <div className={styles.introItem}>
              <div className={styles.boxTitle}>
                <AnimatedTitle
                  className={styles.titleAnimated}
                  visibleClassName={styles.isVisible}
                  text="Vision"
                />
              </div>
              <p>
                <span className={styles.head}>
                  All <i>WW</i> in the BLACK　〜豊かな和の輪を皆さまと共に〜
                </span>
                {serviceCredoData.vision.subHeading.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>
          </section>

          <section className={styles.commitmentSection} aria-label="commitment">
            <div className={styles.boxTitle}>
              <AnimatedTitle
                className={styles.titleAnimated}
                visibleClassName={styles.isVisible}
                text="Commitment"
              />
              <p>私たちの決意</p>
            </div>

            <ul className={styles.cardGrid}>
              {serviceCredoData.commitments.map((item) => (
                <li key={item.title} className={styles.valueCard}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.valueSection} aria-label="value">
            <div className={styles.boxTitle}>
              <AnimatedTitle
                className={styles.titleAnimated}
                visibleClassName={styles.isVisible}
                text="Value"
              />
              <p>
                {serviceCredoData.valueLead.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>
            <div className={styles.groupList}>
              {serviceCredoData.valueGroups.map((group) => (
                <div key={group.title.join('-')} className={styles.listDetails}>
                  <h4 className={styles.groupTitle}>
                    {group.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h4>
                  <p className={styles.groupLead}>{group.lead}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.title} className={styles.valueCard}>
                        <h5>{item.title}</h5>
                        <p>{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </article>
      </section>
    </>
  );
};

export default CredoContent;
