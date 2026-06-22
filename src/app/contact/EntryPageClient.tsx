/* =======================================
 * クロジカ Contactフォームコンポーネント
 * URL: /src/app/contact/EntryPageClient.tsx
 * Referenced in: /src/app/contact/page.tsx
 * Created: 2026-06-22
 * Last updated: 2026-06-22
 * ======================================= */

'use client';

import { useState } from 'react';
import styles from '@/styles/PageContact.module.scss';

type FormState = {
  name: string;
  furigana: string;
  phone: string;
  email: string;
  message: string;
};

type Step = 'input' | 'confirm' | 'done';
type ServerFieldErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: '',
  furigana: '',
  phone: '',
  email: '',
  message: '',
};

const CONTACT_URL = 'https://demo-962ka.tuna-pic.co.jp/backend/contact.php';

const labels: Record<keyof FormState, string> = {
  name: 'お名前',
  furigana: 'フリガナ',
  phone: '電話番号',
  email: 'メールアドレス',
  message: '本文',
};

const requiredFields: (keyof FormState)[] = [
  'name',
  'furigana',
  'phone',
  'email',
];

export default function EntryPageClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState<Step>('input');
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [serverFieldErrors, setServerFieldErrors] = useState<ServerFieldErrors>(
    {}
  );
  const [errorFields, setErrorFields] = useState<Set<keyof FormState>>(
    new Set()
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormState;

    setForm((prev) => ({ ...prev, [fieldName]: value }));

    const nextErrorFields = new Set(errorFields);
    nextErrorFields.delete(fieldName);
    setErrorFields(nextErrorFields);

    const nextServerFieldErrors = { ...serverFieldErrors };
    delete nextServerFieldErrors[fieldName];
    setServerFieldErrors(nextServerFieldErrors);

    if (
      nextErrorFields.size === 0 &&
      Object.keys(nextServerFieldErrors).length === 0
    ) {
      setFormError('');
    }
  };

  const validateForConfirm = () => {
    setFormError('');
    setErrorMsg('');
    setServerFieldErrors({});

    const missing = requiredFields.filter((field) => form[field].trim() === '');

    if (missing.length > 0) {
      setErrorFields(new Set(missing));
      setFormError(
        `未入力の必須項目があります：${missing
          .map((field) => labels[field])
          .join('、')}`
      );
      return false;
    }

    setErrorFields(new Set());
    return true;
  };

  const handleConfirm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForConfirm()) return;

    setStep('confirm');
  };

  const handleSubmit = async () => {
    setSending(true);
    setErrorMsg('');

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));

    try {
      const response = await fetch(CONTACT_URL, {
        method: 'POST',
        body,
      });

      const json = await response.json();

      if (json.success) {
        setStep('done');
        return;
      }

      const nextServerFieldErrors: ServerFieldErrors = {};

      if (json.fields && typeof json.fields === 'object') {
        Object.entries(json.fields).forEach(([key, value]) => {
          if (key in initialForm && typeof value === 'string') {
            nextServerFieldErrors[key as keyof FormState] = value;
          }
        });
      }

      if (Object.keys(nextServerFieldErrors).length > 0) {
        setServerFieldErrors(nextServerFieldErrors);
        setErrorFields(
          new Set(Object.keys(nextServerFieldErrors) as (keyof FormState)[])
        );
        setFormError(
          json.error ?? '入力内容に不備があります。ご確認ください。'
        );
        setStep('input');
        return;
      }

      setErrorMsg(json.error ?? '送信に失敗しました。もう一度お試しください。');
    } catch {
      setErrorMsg(
        '通信エラーが発生しました。しばらく経ってから再度お試しください。'
      );
    } finally {
      setSending(false);
    }
  };

  if (step === 'done') {
    return (
      <article className={styles.blockDone} aria-label="contact completed">
        <p>お問い合わせありがとうございました。</p>
        <p>
          具体的なご依頼はもちろん、ご検討中の段階でお話を聞いてみたいという場合でもお気軽にご連絡ください。
        </p>
        <p>内容を確認のうえ、２〜３営業日以内にメールでご返信いたします。</p>
      </article>
    );
  }

  if (step === 'confirm') {
    return (
      <article className={styles.blockConfirm} aria-label="contact confirm">
        <div className={styles.blockLead}>
          <p>こちらの内容でよろしいですか？</p>
          <p>宜しければ送信を押してください。</p>
        </div>

        <dl>
          <div>
            <dt>{labels.name}</dt>
            <dd>{form.name}</dd>
          </div>
          <div>
            <dt>{labels.furigana}</dt>
            <dd>{form.furigana}</dd>
          </div>
          <div>
            <dt>{labels.phone}</dt>
            <dd>{form.phone}</dd>
          </div>
          <div className={styles.itemMail}>
            <dt>{labels.email}</dt>
            <dd>{form.email}</dd>
          </div>
          {form.message.trim() !== '' && (
            <div className={styles.itemComment}>
              <dd>{form.message}</dd>
            </div>
          )}
        </dl>

        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

        <div className={styles.blockAction}>
          <button
            type="button"
            className={styles.buttonEdit}
            onClick={() => setStep('input')}
          >
            <span>修正</span>
          </button>
          <button
            type="button"
            className={`${styles.buttonSubmit} ${styles.isFilled}`}
            onClick={handleSubmit}
            disabled={sending}
          >
            <span>{sending ? '送信中' : '送信'}</span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.blockForm} aria-label="contact form">
      <form onSubmit={handleConfirm} noValidate>
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <span className={styles.required}>*</span>
            <label htmlFor="name" className={styles.label}>
              <span>{labels.name}</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className={errorFields.has('name') ? styles.inputError : ''}
            />
            {serverFieldErrors.name && (
              <p className={styles.errorText}>{serverFieldErrors.name}</p>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.required}>*</span>
            <label htmlFor="furigana" className={styles.label}>
              <span>{labels.furigana}</span>
            </label>
            <input
              id="furigana"
              type="text"
              name="furigana"
              value={form.furigana}
              onChange={handleChange}
              autoComplete="off"
              className={errorFields.has('furigana') ? styles.inputError : ''}
            />
            {serverFieldErrors.furigana && (
              <p className={styles.errorText}>{serverFieldErrors.furigana}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              <span>{labels.phone}</span>
              <span className={styles.required}>*</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              className={errorFields.has('phone') ? styles.inputError : ''}
            />
            {serverFieldErrors.phone && (
              <p className={styles.errorText}>{serverFieldErrors.phone}</p>
            )}
          </div>

          <div className={`${styles.field} ${styles.itemMail}`}>
            <label htmlFor="email" className={styles.label}>
              <span>{labels.email}</span>
              <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className={errorFields.has('email') ? styles.inputError : ''}
            />
            {serverFieldErrors.email && (
              <p className={styles.errorText}>{serverFieldErrors.email}</p>
            )}
          </div>

          <div className={`${styles.field} ${styles.itemComment}`}>
            <label htmlFor="message" className={styles.label}>
              <span>{labels.message}</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={7}
              className={errorFields.has('message') ? styles.inputError : ''}
            />
            {serverFieldErrors.message && (
              <p className={styles.errorText}>{serverFieldErrors.message}</p>
            )}
          </div>
        </div>

        {formError && <p className={styles.errorMsg}>{formError}</p>}

        <div className={styles.blockAction}>
          <button type="submit" className={styles.buttonCheck}>
            <span>確認</span>
          </button>
        </div>
      </form>
    </article>
  );
}
