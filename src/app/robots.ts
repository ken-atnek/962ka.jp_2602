import type { MetadataRoute } from 'next';
import { isRealProduction } from '@/lib/env';

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_METADATA_BASE || 'https://962ka.jp';

export default function robots(): MetadataRoute.Robots {
  if (!isRealProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
