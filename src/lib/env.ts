// 開発環境と本番環境の状態チェック
export const isRealProduction = process.env.NEXT_PUBLIC_IS_REAL_PROD === 'true';

// 各ページ共通のOGP画像
export const ogpImage = {
  url: '/ogp.jpg',
  width: 1200,
  height: 630,
  alt: 'クロジカのOGP画像',
} as const;
