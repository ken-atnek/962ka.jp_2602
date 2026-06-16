## Next.js 15 App Router の制約

### params は Promise型を使う（同期型は型エラーになる）

**Next.js 15 では `output: 'export'` であっても、型制約として `params: Promise<...>` が必須。**  
ビルド時に静的生成されるため `await params` は問題なく動作する。

#### ✅ 正しい書き方（静的エクスポートでも同じ）

```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
}
```

#### ❌ NG（型エラーになる）

```typescript
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Type error: Promise のプロパティが不足
}
```

### generateMetadata / generateStaticParams

**静的エクスポート時は async 禁止**

#### ❌ NG

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return { title: "Page" };
}

export async function generateStaticParams() {
  return [{ id: "1" }];
}
```

#### ✅ OK

```typescript
export function generateMetadata(): Metadata {
  return { title: "Page" };
}

export function generateStaticParams() {
  return [{ id: "1" }];
}
```

**理由**: `output: 'export'` 時は全て事前生成されるため、非同期処理は不要

### `robots.ts` / `sitemap.ts` は `force-static` を明示する

`output: 'export'` を使う案件で `src/app/robots.ts` / `src/app/sitemap.ts` を置く場合は、先頭に `export const dynamic = 'force-static';` を付ける。

#### ✅ 推奨

```typescript
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
}
```

#### 症状

- `Failed to collect page data for /robots.txt`
- `export const dynamic = "force-static"/export const revalidate not configured ...`

### `useSearchParams()` を使う client component は `Suspense` で包む

静的ビルド対象ページで `useSearchParams()` を使う client component を読む場合、page 側で `Suspense` 境界を用意する。

#### ✅ 推奨

```tsx
import { Suspense } from 'react';
import WorksArchive from '@/components/works/WorksArchive';

export default function WorksPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <WorksArchive />
      </Suspense>
    </main>
  );
}
```

#### 症状

- `useSearchParams() should be wrapped in a suspense boundary`
- `Error occurred prerendering page "/works"`
