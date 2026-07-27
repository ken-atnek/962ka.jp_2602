import type { MetadataRoute } from 'next';
import { isRealProduction } from '@/lib/env';

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_METADATA_BASE || 'https://962ka.jp/';

const pagePaths = ['', 'about/', 'credo/', 'greetings/', 'service/', 'contact/'];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isRealProduction) {
    return [];
  }

  return pagePaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
