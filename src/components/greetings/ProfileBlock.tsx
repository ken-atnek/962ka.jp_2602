/* =======================================
 * クロジカ Greetings プロフィールブロック
 * URL: /src/components/greetings/ProfileBlock.tsx
 * Referenced in: /src/app/greetings/page.tsx
 * Created: 2026-06-19
 * Last updated: 2026-07-15
 * ======================================= */

'use client';

import styles from '@/styles/PageGreetings.module.scss';
import useAddClassOnInView from '@/hooks/useAddClassOnInView';

export default function ProfileBlock() {
  const ref = useAddClassOnInView<HTMLDivElement>(styles.isVisible, {
    threshold: 0.3,
  });

  return (
    <div ref={ref} className={styles.boxProfile}>
      <h2>
        <span>山口</span>
        <span>真太郎</span>
      </h2>
      <dl>
        <div>
          <dt>2010年</dt>
          <dd>
            熊本学園大学大学院経営学研究科卒業。同年税理士法人 絆
            隈部会計事務所　入社。
          </dd>
        </div>
        <div>
          <dt>2015年</dt>
          <dd>山口税理士事務所 入所</dd>
        </div>
        <div>
          <dt>2017年</dt>
          <dd>
            <span>税理士法人やまぐち設立</span>
            <span>TKC全国会入会</span>
            <span>株式会社トリプルウィン設立</span>
          </dd>
        </div>
        <div>
          <dt>2020年</dt>
          <dd>税理士法人絆と合併し税理士法人クロジカ設立、代表社員就任</dd>
        </div>
      </dl>
    </div>
  );
}
