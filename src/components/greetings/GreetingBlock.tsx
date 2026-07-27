/* =======================================
 * クロジカ Greetings 挨拶ブロック
 * URL: /src/components/greetings/GreetingBlock.tsx
 * Referenced in: /src/app/greetings/page.tsx
 * Created: 2026-06-19
 * Last updated: 2026-07-27
 * ======================================= */

'use client';

import styles from '@/styles/PageGreetings.module.scss';
import useAddClassOnInView from '@/hooks/useAddClassOnInView';

const greetingLines: readonly string[] = [
  '未来をともに描く、税理士でありたい。',
  '',
  '「納税額が増えてしまう税理士」の山口真太郎です。',
  '初めて聞くと驚かれるかもしれません。しかし、この言葉こそ私たちが目指す税理士の姿を表しています。',
  '税理士の仕事は、税金を少なくすることだけではありません。会社が健全に利益を生み、安心して納税できる経営を支えることこそ、本当の役割だと考えています。',
  '多くの経営者と向き合う中で気づいたのは、本当に悩んでいるのは税金ではなく、資金繰りや人材、組織づくり、そして将来への不安だということでした。',
  '数字の奥には、必ず経営者の想いがあります。',
  'だから私は、税理士の仕事は過去の数字を整理することではなく、経営者とともに未来を描くことだと考えています。',
  'クロジカの理念は、',
  '「明日に怯えることなく、笑顔で納税する企業を増やし続けたい。」',
  '黒字企業が増えれば、社員が安心して働くことができます。社員が幸せになれば、その家族も幸せになります。そして、その積み重ねが地域社会を元気にすると信じています。',
  '私たちは数字だけではなく、お客様の想いや理念にも寄り添いながら、未来への一歩をともに考えるパートナーでありたいと思っています。',
  'AIの進化によって仕事の形は変わっても、人に寄り添い、ともに考え、未来を支える役割は変わりません。',
  'これからも、一社でも多くの企業が明日に希望を持ち、笑顔で納税できる未来を。',
  'その歩みを、お客様とともに続けてまいります。',
] as const;

export default function GreetingBlock() {
  const ref = useAddClassOnInView<HTMLDivElement>(styles.isVisible, {
    threshold: 0.3,
  });

  return (
    <div ref={ref} className={styles.boxGreeting}>
      <p>
        {greetingLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  );
}
