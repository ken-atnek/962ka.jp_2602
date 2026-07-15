/* =======================================
 * クロジカ Greetings 挨拶ブロック
 * URL: /src/components/greetings/GreetingBlock.tsx
 * Referenced in: /src/app/greetings/page.tsx
 * Created: 2026-06-19
 * Last updated: 2026-07-15
 * ======================================= */

'use client';

import styles from '@/styles/PageGreetings.module.scss';
import useAddClassOnInView from '@/hooks/useAddClassOnInView';

export default function GreetingBlock() {
  const ref = useAddClassOnInView<HTMLDivElement>(styles.isVisible, {
    threshold: 0.3,
  });

  return (
    <div ref={ref} className={styles.boxGreeting}>
      <p>
        「納税額が増えてしまう税理士」の山口真太郎と申します。
        <br />
        現在、税理士×中小企業診断士としての知識経験を積みながら、税金だけでなく経営という視点でお客様と向き合っています。
        <br />
        振り返ってみると、ご要望によっては税額がとにかく少なくなるような提案を行っていた時期もありました。しかしそこには、黒字化支援の視点はありませんでした。
        どうすれば、企業様のつまずきを先回りして取り除き、健全な成長経営を支援できるか？そして、その経営活動によってより良い社会創りに私たちが貢献できるか？これを突き詰めた結果、経営者のお困りごとの上位は、①にお金②に人事③④がなくて⑤に税務、だということに気付き、お金や組織のお困り事の解決があっての税務であるという想いに至りました。今後、クロジカビジョンと真摯に向き合い、正確な帳簿に基づいて得られる情報を活用した資金繰りまで含めた計画の策定、コーチング（非指示型のコンサルティング）を用いた予実対比、行動の言語化や理念策定も業務として行っていきます。また、経営者様の多くは孤独感を感じておられます。経営者様の本当のお困り事解決のニーズはこれからＡＩ等が普及したところで変わらないものだと思います。やはり生身の人間の思考や感情が必要なのではないでしょうか。数年後、仮に申告納税制度がなくなっていたとしても(税理士が無償独占として保護されなくなったとしても)、顧問契約が継続するという理想の状態を目指してまいります。
      </p>
    </div>
  );
}
