/* =======================================
 * クロジカ Greetings 挨拶ブロック
 * URL: /src/components/greetings/GreetingBlock.tsx
 * Referenced in: /src/app/greetings/page.tsx
 * Created: 2026-06-19
 * Last updated: 2026-06-19
 * ======================================= */

'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/PageGreetings.module.scss';

export default function GreetingBlock() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => el.classList.add(styles.isVisible));
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.boxGreeting}>
      <h3>こんにちは、山口です。</h3>
      <p>
        「黒字化がもたらす物心両面の豊かさを共に育む」これが私たちが掲げるミッションです。
        <br />
        正確な帳簿に基づいて得られる情報を活用し、資金繰りまで含めた計画の策定、コーチング（非指示型のコンサルティング）を用いた予実対比、行動の言語化や理念策定も業務として行っていきます。お客様が健全な黒字であれば当事務所も黒字となりお互いが納税し雇用を維持し社会貢献できます。
        <br />
        数年後、仮に申告納税制度がなくなっていたとしても(税理士が無償独占として保護されなくなったとしても)顧問契約が切れないという理想の状態を目指しています。
      </p>
    </div>
  );
}
