/* =======================================
 * クロジカ Greetings ギャラリーブロック
 * URL: /src/components/greetings/GreetingGalleryBlock.tsx
 * Referenced in: /src/app/greetings/page.tsx
 * Created: 2026-06-19
 * Last updated: 2026-06-19
 * ======================================= */

import DistortionImage from '@/components/common/DistortionImage';
import styles from '@/styles/PageGreetings.module.scss';

export default function GreetingGalleryBlock() {
  return (
    <section className={styles.containerGallery} aria-label="greetings gallery">
      <div className={styles.itemImage01}>
        <DistortionImage
          src="/images/greeting/image-01.webp"
          alt="工場内の風景"
          cameraFar={2}
          cameraNear={0.94}
          firstDistortion={200}
        />
      </div>
      <div className={styles.galleryGrid}>
        <p className={styles.textEn}>
          Rooted in our love for Uto, we grow alongside our
          <br />
          customers and become stronger as one team.
          <br />
          That is who we are — Team Kurojika.
        </p>
        <div className={styles.itemImage02}>
          <DistortionImage
            src="/images/greeting/image-02.webp"
            alt="山口真太郎の立ち姿"
            cameraFar={2}
            cameraNear={0.99}
            firstDistortion={200}
          />
        </div>
        <div className={styles.itemImage03}>
          <DistortionImage
            src="/images/greeting/image-03.webp"
            alt="室内で対話する様子"
            cameraFar={2}
            cameraNear={0.94}
            firstDistortion={200}
          />
        </div>
      </div>
      <p className={styles.textJp}>
        地元・宇土への愛を礎に、お客様とともに歩み、ともに成長し、
        <br />
        一つのチームとして強くなっていく。
        <br />
        それが私たち、チーム『クロジカ』です。
      </p>
      <div className={styles.itemImage04}>
        <DistortionImage
          src="/images/greeting/image-04.webp"
          alt="握手の写真"
          cameraFar={2}
          cameraNear={0.98}
          firstDistortion={200}
        />
      </div>
      <div className={styles.itemImage05}>
        <DistortionImage
          src="/images/greeting/image-05.webp"
          alt="熊本城を望む風景"
          cameraFar={2}
          cameraNear={0.94}
          firstDistortion={200}
        />
      </div>
    </section>
  );
}
