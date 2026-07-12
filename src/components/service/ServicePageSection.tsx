/* =======================================
 * クロジカ Serviceページ BASIC & CONSULTING
 * URL: /src/components/service/ServicePageSection.tsx
 * Referenced in: /src/app/service/page.tsx
 * Created: 2026-06-18
 * Last updated: 2026-06-20
 * ======================================= */

'use client';

import { useState } from 'react';
import styles from '@/styles/PageService.module.scss';

type ServicePageSectionItem = {
  id: string;
  title: string;
  description: readonly string[];
  defaultOpen?: boolean;
};

type ServicePageSectionProps = {
  anchorId: string;
  sectionNumber: string;
  title: string;
  lead: readonly string[];
  imageSrc: string;
  imageAlt: string;
  items: readonly ServicePageSectionItem[];
};

const ServicePageSection = ({
  anchorId,
  sectionNumber,
  title,
  lead,
  imageSrc,
  imageAlt,
  items,
}: ServicePageSectionProps) => {
  const initialOpenId = items.find((item) => item.defaultOpen)?.id ?? null;
  const [openItemId, setOpenItemId] = useState<string | null>(initialOpenId);

  return (
    <article
      id={anchorId}
      className={styles.blockServiceList}
      aria-label={title}
    >
      <div
        className={styles.headTitle}
        role="img"
        aria-label={imageAlt}
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <h2>
          {sectionNumber}_{title}
        </h2>
        <p>
          {lead.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>

      <div className={styles.detailList}>
        {items.map((item) => {
          const isOpen = openItemId === item.id;

          return (
            <div
              key={item.id}
              className={`${styles.listItem} ${isOpen ? styles.isOpen : ''}`.trim()}
            >
              <button
                type="button"
                className={styles.itemSummary}
                aria-expanded={isOpen}
                aria-controls={`${title}-${item.id}-panel`}
                onClick={() =>
                  setOpenItemId((currentId) => (currentId === item.id ? null : item.id))
                }
              >
                <span className={styles.itemId}>{item.id}</span>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemIcon} aria-hidden="true">
                  <svg>
                    <use href="#svgServiceAccordionArrow" />
                  </svg>
                </span>
              </button>

              <div
                id={`${title}-${item.id}-panel`}
                className={`${styles.itemDescriptionWrap} ${isOpen ? styles.isOpen : ''}`.trim()}
                aria-hidden={!isOpen}
              >
                <div className={styles.itemDescription}>
                  {item.description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ServicePageSection;
export type { ServicePageSectionProps };
