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
          Consistency Wins.
          <br /> Do the ordinary extraordinarily well.
          <br /> Steady efforts build trust
          <br />
          and become the foundation for our clients&apos; future.
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
        「コツコツが勝つコツ」
        <br />
        誰でもできることを、誰もできないくらい続ける。
        <br />
        その積み重ねが信頼となり、
        <br />
        お客様の未来を支える礎になると信じています。
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
