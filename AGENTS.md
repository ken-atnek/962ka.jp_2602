# プロジェクト方針（共通テンプレ）

このプロジェクトは **静的HTML（Next export）** を基本方針とする。  
目的は **「共有サーバー/FTP運用でも安定」「ビルド頻度を下げる」** こと。

---

# 技術スタック

- Next.js（App Router）
- TypeScript
- SCSS（Sass）
- `next.config.ts` 運用

---

# 開発セットアップ

## 初期セットアップ

```bash
npx create-next-app@latest . --typescript
# App Router: Yes
```

## 開発依存（devDependencies）

```bash
npm install -D prettier sass stylelint stylelint-config-standard-scss stylelint-scss rimraf cross-env
```

---

# next.config.ts（基本）

静的運用の前提：

- `output: 'export'`
- `trailingSlash: true`（`/xxx/` + `index.html` 形式）
- `images: { unoptimized: true }`

例：

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

---

# コーディング規約

## 命名

- SCSS：ケバブケース（クラス / 変数 / ミックスイン）
- TS / TSX：キャメルケース / パスカルケース

## 基本ルール

- 余計なリファクタをしない
- 仕様変更は最小単位で行う
- 変更は「意図」と「影響範囲」が分かる形で行う
- 依頼された範囲だけを修正する
- 依頼範囲外の改善案は、実装せず提案に留める

---

# 実装前の設計ルール

- **実装を伴う作業は、必ずplanモードで設計を提示してからコードを書くこと**
- ユーザーの承認を得てから実装に移ること
- 軽微な修正（1行変更・誤字修正など）はplanモード不要

---

# 返答ルール

- 修正コードは **コピペしやすい完成形** で提示すること
- **diff形式（`+` / `-`）は使わないこと**
- 必要な箇所だけを出すこと
- 依頼がない限り、複数ファイルをまとめて大きく変更しないこと
- まず「どこを直すか」「何を直すか」が分かる説明を添えること
- 命名変更・責務分割・構造変更などを伴う場合は、勝手に実装せず先に提案すること

---

# 既存構成の尊重

- 既存のディレクトリ構成・命名・責務分割を基本的に尊重すること
- 新しい抽象化、共通化、hooks化、utils化は、明示依頼がある場合のみ行うこと
- 保守性向上を目的とした提案はしてよいが、勝手に実装しないこと
- 現在の運用との整合性を優先すること

---

# 運用設計（重要）

## 1) 静的exportの意味

`output: 'export'` は **サーバーで動くアプリではなく、静的ファイル配信** を意味する。  
そのため、URLとして存在するページは **ビルド時に生成されたHTMLのみ** である。

- ✅ 静的ページ：`out/.../index.html`
- ❌ ビルド後に増えたIDの新規ページは勝手に生えない（404になる）

---

# Next 16.x params の扱い（注意）

Next.js 16 では `params` が Promise 扱いになり、同期アクセスでエラーになる場合がある。

エラー例：

- `params` is a Promise and must be unwrapped with `await` or `React.use()`

対応方針：

- 必要な箇所のみ `await params` を使う
- 不要に複雑化させない

例：

```ts
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>{id}</div>;
}
```

---

# generateMetadata / generateStaticParams

## 原則

- `generateMetadata` / `generateStaticParams` は不要に複雑化させないこと
- export運用では、ビルド時依存の実装を増やしすぎないこと
- ID増減に強い運用を優先し、`generateStaticParams` への過度な依存を避けること

---

# サーバー側（.htaccessなど）注意

- 内部Rewriteで配下ディレクトリに寄せる場合、URL末尾 `/` の挙動が揺れることがある
- export + trailingSlash 運用では **`/xxx/` を正規URL** に寄せるのが基本

---

# 禁止事項（このプロジェクトの地雷）

- 命名変更、責務分割、構造変更などの大きなリファクタを勝手に行わないこと  
  理由：現在は保守性よりも既存運用との整合性を優先しているため

- 変更は依頼された範囲のみに限定すること  
  依頼範囲外の改善提案は、実装せず提案止まりにすること

---

# Git運用ルール

- 新しいブランチを勝手に作成しないこと
- `git checkout` `git switch` `git branch` `git worktree` を勝手に実行しないこと
- commit / push は明示依頼があるときだけ行うこと
- Git操作を伴う提案をする場合は、先に内容を説明すること

---

# チェックリスト

- [ ] `output: 'export'`
- [ ] `trailingSlash: true`
- [ ] `images: { unoptimized: true }`
- [ ] Mixed Content（http → https）対策を入れる
- [ ] URLは `https` 前提で扱う

---

# デザイン参照（実装時）

- TOPページ実装・調整時は、`docs/screenshots/TOP.jpg` を参照して差分確認すること
- 追加スクリーンショットが増えた場合は、`docs/screenshots/` 配下を優先参照すること

---

# 参照順（同期用）

`CLAUDE.md` と同じ順番で以下を参照すること。

1. `docs/ROOTS_SPEC.md`
2. `docs/PAGE_STRUCTURE.md`
3. `docs/rules/tsx-comment-rules.md`（`tsx` 編集時）
4. `docs/rules/project-setup.md`
5. `docs/rules/coding-style.md`
6. `docs/rules/nextjs-export.md`
7. `docs/rules/fetch-pattern.md`
8. `docs/rules/ui-interactions.md`
9. `docs/rules/checklist.md`
