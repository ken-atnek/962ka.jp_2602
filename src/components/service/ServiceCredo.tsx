/* =======================================
 * クロジカ Serviceページ Credoセクション
 * URL: /src/components/service/ServiceCredo.tsx
 * Referenced in: /src/app/service/page.tsx
 * Created: 2026-06-22
 * Last updated: 2026-06-22
 * ======================================= */
import styles from '@/styles/PageService.module.scss';
import { serviceCredoData } from '@/app/service/serviceData';
import AnimatedTitle from '@/components/common/AnimatedTitle';
const ServiceCredo = () => {
  return (
    <section
      className={styles.containerServiceCredo}
      aria-label="service credo"
    >
      <article>
        <section className={styles.introBlock} aria-label="mission and vision">
          <div className={styles.boxTitle}>
            <AnimatedTitle
              className={styles.titleAnimated}
              visibleClassName={styles.isVisible}
              text="Credo"
            />
          </div>
          <div className={styles.introItem}>
            <h3>Mission</h3>
            <p>{serviceCredoData.mission}</p>
          </div>
          <div className={styles.introItem}>
            <h3>Vision</h3>
            <p>{serviceCredoData.vision}</p>
          </div>
        </section>

        <section className={styles.coreValueSection} aria-label="core values">
          <div className={styles.boxTitle}>
            <AnimatedTitle
              className={styles.titleAnimated}
              visibleClassName={styles.isVisible}
              text={'Core\u00A0Values'}
            />
            <p>
              {serviceCredoData.coreValuesLead.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
          <ul className={styles.cardGrid}>
            {serviceCredoData.coreValues.map((item) => (
              <li key={item.title} className={styles.valueCard}>
                <h3>{item.title}</h3>
                <p className={styles.subTitle}>{item.subTitle}</p>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
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
          <p className={styles.catch}>
            {serviceCredoData.commitmentLead.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
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
              <div key={group.title} className={styles.listDetails}>
                <h4 className={styles.groupTitle}>{group.title}</h4>
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
  );
};

export default ServiceCredo;
