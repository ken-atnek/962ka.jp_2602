# SEO初期設定メモ

このファイルは、新規サイト立ち上げ時のSEO設計メモです。  
コンテンツ未確定のため、まずは必要項目の枠だけ用意します。

---

## サイト基本情報

- サイト名:
- ドメイン:
- 公開URL:
- 公開ステータス:

---

## ページ別メタ情報

### トップページ `/`

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

### 下層ページ1

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

### 下層ページ2

- title:
- description:
- canonical:
- og:title:
- og:description:
- og:image:
- robots:

---

## 初期実装で必要なSEO項目

- `metadata`
- `robots.ts`
- `sitemap.ts`
- OGP画像の管理方針
- canonical設計

---

## デモ公開 / 本番公開の切り替え方針

- デモ公開時と本番公開時で、SEO系の出力を切り替える
- 判定は `NEXT_PUBLIC_IS_REAL_PROD` を使う
- `true` の時だけ本番SEOを有効にする
- `false` の時はデモ公開扱いにして `noindex` 系にする

### 基本方針

- `src/lib/env.ts` に `isRealProduction` を用意する
- `src/app/layout.tsx` の `metadata` は `isRealProduction` で分岐する
- 本番時だけ `metadataBase` / `openGraph` / `twitter` を有効にする
- デモ時は `robots: 'noindex, nofollow'` を返す
- `src/app/robots.ts` はデモ時に `disallow: '/'` を返す
- `src/app/sitemap.ts` はデモ時に空配列を返す

### 想定ファイル

- `src/lib/env.ts`
- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

### `src/lib/env.ts` 例

```ts
export const isRealProduction = process.env.NEXT_PUBLIC_IS_REAL_PROD === 'true';
```

### `layout.tsx` 側の考え方

- `metadataBase` は本番時だけ設定する
- OGP URL や canonical の基準URLも本番時だけ有効にする
- デモURLを検索エンジンに正規URLとして認識させない

### 注意点

- `NEXT_PUBLIC_METADATA_BASE` は `build:demo` / `build:prod` で切り替える
- デモ時に `metadataBase` を常時出すと、意図しないURLで canonical / OGP が生成されやすい
- `robots.ts` と `sitemap.ts` は `force-static` を付けた上で、本番判定を合わせる
- この切り替えは他案件でも再利用する前提で残す

---

## 注意点

- 仮公開中は `noindex` を検討
- 本番URL確定前に canonical を仮置きしすぎない
- title / description は後から差し替え前提でOK
