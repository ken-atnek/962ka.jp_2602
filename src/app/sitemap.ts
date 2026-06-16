import type { MetadataRoute } from 'next';
import { isRealProduction } from '@/lib/env';

const siteUrl = process.env.NEXT_PUBLIC_METADATA_BASE || 'https://962ka.jp';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isRealProduction) {
    return [];
  }

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
