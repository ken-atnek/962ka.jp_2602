/* =======================================
 * クロジカ Layout
 * URL:src/app/layout.tsx
 * Created: 2026-02-03
 * Last updated: 2026-04-23
 * ======================================= */

import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { Noto_Sans_JP, Google_Sans_Flex } from 'next/font/google';
import SvgDefs from '@/components/SvgDefs';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { isRealProduction } from '@/lib/env';

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-google-sans-flex',
});

// 本番のみ metadataBase を設定
const metadataBase = isRealProduction
  ? new URL(process.env.NEXT_PUBLIC_METADATA_BASE || 'https://962ka.jp/')
  : undefined;

export const metadata: Metadata = {
  ...(isRealProduction && {
    metadataBase,
    openGraph: {
      url: metadataBase?.toString(),
      type: 'website',
      images: [
        {
          url: '/ogp.jpg',
          width: 1200,
          height: 630,
          alt: 'クロジカのOGP画像',
        },
      ],
    },
  }),
  robots: isRealProduction ? 'index, follow' : 'noindex, nofollow',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-light.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon/favicon-dark.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
      // { url: '/favicon/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${notoSans.className} ${googleSansFlex.variable}`}>
      <head>
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body>
        <SvgDefs />
        <Header />
        <main id="Main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
