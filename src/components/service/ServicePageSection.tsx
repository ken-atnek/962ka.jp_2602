/* =======================================
 * クロジカ Serviceページ BASIC & CONSULTING
 * URL: /src/components/service/ServicePageSection.tsx
 * Referenced in: /src/app/service/page.tsx
 * Created: 2026-06-18
 * Last updated: 2026-06-18
 * ======================================= */

import styles from './ServicePageSection.module.scss';

type ServicePageSectionItem = {
  id: string;
  title: string;
  description?: readonly string[];
  defaultOpen?: boolean;
};

type ServicePageSectionProps = {
  sectionNumber: string;
  title: string;
  lead: readonly string[];
  imageSrc: string;
  imageAlt: string;
  items: readonly ServicePageSectionItem[];
};

const ServicePageSection = ({
  sectionNumber,
  title,
  lead,
  imageSrc,
  imageAlt,
  items,
}: ServicePageSectionProps) => {
  return (
    <article className={styles.blockServiceList} aria-label={title}>
      <div
        className={styles.headTitle}
        role="img"
        aria-label={imageAlt}
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className={styles.sectionHeading}>
          <h2>
            {sectionNumber}_{title}
          </h2>
          <p>
            {lead.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </div>

      <div className={styles.detailList}>
        {items.map((item) => (
          <details
            key={item.id}
            className={styles.listItem}
            open={item.defaultOpen}
          >
            <summary className={styles.serviceSummary}>
              <span className={styles.itemId}>{item.id}</span>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.itemIcon} aria-hidden="true">
                ↓
              </span>
            </summary>

            {item.description && item.description.length > 0 ? (
              <div className={styles.itemDescription}>
                {item.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}
          </details>
        ))}
      </div>
    </article>
  );
};

export default ServicePageSection;
export type { ServicePageSectionProps };
