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
          <dt>1982年</dt>
          <dd>
            <p>宮崎県延岡市生まれ　熊本県宇土市育ち</p>
            <p>さまざまな地域で過ごし、10歳から宇土市で育つ。</p>
          </dd>
        </div>
        <div>
          <dt>2004年</dt>
          <dd>
            <p>熊本学園大学 商学部卒業</p>
            <p>山口税理士事務所 入所</p>
            <p>税理士としての第一歩を踏み出す</p>
          </dd>
        </div>
        <div>
          <dt>2010年</dt>
          <dd>
            <p>熊本学園大学大学院 修了</p>
            <p>税理士資格取得</p>
            <p>税理士法人 絆 入所</p>
            <p>
              隈部先生との出会いを通じて、人として、税理士としての在り方を学ぶ。
            </p>
          </dd>
        </div>
        <div>
          <dt>2015年</dt>
          <dd>
            <p>山口税理士事務所へ戻る</p>
            <p>数字だけではなく、経営者の未来に向き合う仕事を志す。</p>
          </dd>
        </div>
        <div>
          <dt>2017年</dt>
          <dd>
            <p>父から事務所を承継 税理士法人やまぐち 設立</p>
            <p>キャッシュフローコーチ認定</p>
            <p>株式会社トリプルウィン 設立</p>
            <p>受け継いだ想いを、自分らしい経営へつなげる。</p>
          </dd>
        </div>
        <div>
          <dt>2020年</dt>
          <dd>
            <p>税理士法人クロジカ 設立</p>
            <p>代表社員 就任</p>
            <p>二つの歴史と信頼を未来へつなぐ。</p>
          </dd>
        </div>
        <div>
          <dt>2022年</dt>
          <dd>
            <p>隈部先生より事務所を完全承継</p>
            <p>受け継いだ信頼を胸に、新たな歴史を歩み始める。</p>
          </dd>
        </div>
        <div>
          <dt>2026年</dt>
          <dd>
            <p>中小企業診断士取得</p>
            <p>営をより広い視点で支えるため、学びを深める。</p>
          </dd>
        </div>
        <div>
          <dt>NOW</dt>
          <dd>
            <p>明日に怯えることなく、笑顔で納税する企業を増やし続けたい。</p>
            <p>学び続け、変わり続けながら、経営者の未来に伴走しています。</p>
          </dd>
        </div>
      </dl>
    </div>
  );
}
