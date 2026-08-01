<?php

declare(strict_types=1);

/* =======================================
 * クロジカ お問い合わせ送信API
 * URL: /backend/contact.php
 * Last updated: 2026-07-31
 * ======================================= */

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allow_origin = false;

$fixed_origins = [
  'https://962ka.jp',
  'https://www.962ka.jp',
  'https://demo-962ka.tuna-pic.co.jp',
];

if ($origin !== '' && in_array($origin, $fixed_origins, true)) {
  $allow_origin = true;
}

if (
  $origin !== '' &&
  (
    preg_match('#^http://localhost:\d+$#', $origin) === 1 ||
    preg_match('#^http://127\.0\.0\.1:\d+$#', $origin) === 1 ||
    preg_match('#^http://192\.168\.\d+\.\d+:\d+$#', $origin) === 1
  )
) {
  $allow_origin = true;
}

if ($allow_origin) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
}

header('Content-Type: application/json; charset=UTF-8');

function json_exit(int $code, array $payload): void
{
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  json_exit(204, ['success' => true]);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  json_exit(405, ['success' => false, 'error' => '無効なリクエストです。']);
}

function send_japanese_mail(
  string $to_email,
  string $to_name,
  string $subject,
  string $body,
  string $from_name,
  string $from_email,
  ?string $reply_to = null,
  ?string $cc_email = null
): array {
  $warning_message = null;
  $org_encoding = mb_internal_encoding();
  $previous_handler = set_error_handler(static function (int $severity, string $message) use (&$warning_message): bool {
    $warning_message = $message;
    return true;
  });

  mb_language('uni');
  mb_internal_encoding('UTF-8');

  $headers  = 'From: "' . mb_encode_mimeheader($from_name, 'ISO-2022-JP') . '" <' . $from_email . ">\r\n";

  if ($reply_to !== null && $reply_to !== '') {
    $headers .= 'Reply-To: ' . $reply_to . "\r\n";
  }

  if ($cc_email !== null && $cc_email !== '') {
    $headers .= 'Cc: ' . $cc_email . "\r\n";
  }

  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/plain; charset=ISO-2022-JP\r\n";
  $headers .= "Content-Transfer-Encoding: 7bit\r\n";

  $send_target = $to_email;
  if ($to_name !== '') {
    $send_target = mb_encode_mimeheader($to_name, 'ISO-2022-JP') . ' <' . $to_email . '>';
  }

  try {
    $result = mb_send_mail($send_target, $subject, $body, $headers, '-f' . $from_email);
  } finally {
    mb_internal_encoding($org_encoding);
    restore_error_handler();
    if ($previous_handler !== null) {
      set_error_handler($previous_handler);
      restore_error_handler();
    }
  }

  if ($result) {
    return [
      'success' => true,
      'error' => null,
    ];
  }

  return [
    'success' => false,
    'error' => $warning_message ?? 'mb_send_mail returned false.',
  ];
}

$name = trim($_POST['name'] ?? '');
$furigana = trim($_POST['furigana'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$website = trim($_POST['website'] ?? '');
$form_started_at = trim($_POST['formStartedAt'] ?? '');
$min_submit_seconds = 3;

if ($website !== '') {
  json_exit(400, [
    'success' => false,
    'error' => '無効な送信です。',
  ]);
}

if ($form_started_at === '' || preg_match('/^\d+$/', $form_started_at) !== 1) {
  json_exit(400, [
    'success' => false,
    'error' => '送信情報が不正です。',
  ]);
}

$elapsed_seconds = (time() * 1000 - (int) $form_started_at) / 1000;

if ($elapsed_seconds < $min_submit_seconds) {
  json_exit(400, [
    'success' => false,
    'error' => '送信まで少し時間をおいてください。',
  ]);
}

$validation_fields = [];

if ($name === '') {
  $validation_fields['name'] = 'お名前は必須です。';
}

if ($furigana === '') {
  $validation_fields['furigana'] = 'フリガナは必須です。';
}

if ($phone === '') {
  $validation_fields['phone'] = '電話番号は必須です。';
} elseif (preg_match('/^[0-9\-]+$/', $phone) !== 1) {
  $validation_fields['phone'] = '電話番号は半角数字とハイフンで入力してください。';
}

if ($email === '') {
  $validation_fields['email'] = 'メールアドレスは必須です。';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $validation_fields['email'] = 'メールアドレスの形式が不正です。';
}

foreach (
  [
    'name' => $name,
    'furigana' => $furigana,
    'email' => $email,
  ] as $field_name => $value
) {
  if ($value !== '' && preg_match("/[\r\n]/", $value) === 1) {
    $validation_fields[$field_name] = '入力値が不正です。';
  }
}

if ($message !== '' && preg_match("/[\0]/", $message) === 1) {
  $validation_fields['message'] = '本文の入力値が不正です。';
}

if ($validation_fields !== []) {
  json_exit(400, [
    'success' => false,
    'error' => '入力内容に不備があります。',
    'fields' => $validation_fields,
  ]);
}

$admin_to = 'contact962ka@962ka.jp';
$admin_cc_email = '';
$admin_to_name = '税理士法人クロジカ';
$from_name = '税理士法人クロジカ';
$from_email = 'contact962ka@962ka.jp';
$user_subject = 'お問い合わせを受け付けました。';
$admin_subject = '【税理士法人クロジカ】お問い合わせを受け付けました';
$send_date = date('Y/n/j H:i');

$mail_body  = "お問い合わせフォームより\n";
$mail_body .= "--------------------\n";
$mail_body .= "■お名前\n{$name}\n\n";
$mail_body .= "■フリガナ\n{$furigana}\n\n";
$mail_body .= "■電話番号\n{$phone}\n\n";
$mail_body .= "■メールアドレス\n{$email}\n\n";

if ($message !== '') {
  $mail_body .= "■本文\n{$message}\n\n";
}

$mail_body .= "--------------------\n";
$mail_body .= $send_date . "\n";
$mail_body = str_replace(["\r\n", "\r"], "\n", $mail_body);

$user_mail_body = <<<EOT
{$name} 様

お問い合わせありがとうございました。
具体的なご依頼はもちろん、ご検討中の段階でお話を聞いてみたいという場合でもお気軽にご連絡ください。
内容を確認のうえ、２〜３営業日以内にメールでご返信いたします。

【お問い合わせ内容】
お名前：{$name}
フリガナ：{$furigana}
電話番号：{$phone}
メールアドレス：{$email}
EOT;

if ($message !== '') {
  $user_mail_body .= "\n本文：{$message}\n";
}

$user_mail_result = send_japanese_mail(
  $email,
  $name,
  $user_subject,
  $user_mail_body,
  $from_name,
  $from_email,
  $from_email
);

$admin_mail_result = send_japanese_mail(
  $admin_to,
  $admin_to_name,
  $admin_subject,
  $mail_body,
  $from_name,
  $from_email,
  $email,
  $admin_cc_email
);

if (!$user_mail_result['success'] || !$admin_mail_result['success']) {
  json_exit(500, [
    'success' => false,
    'error' => 'メール送信に失敗しました。時間をおいて再度お試しください。',
  ]);
}

json_exit(200, [
  'success' => true,
  'message' => 'お問い合わせを送信しました。',
]);
