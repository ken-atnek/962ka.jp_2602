# Claude Instructions

作業開始時は必ず以下の順で確認してから作業すること。

1. `AGENTS.md`
2. `docs/ROOTS_SPEC.md`
3. `docs/PAGE_STRUCTURE.md`
4. `docs/ROOTS_IMAGE_LIST_SPEC.md`
5. `docs/rules/tsx-comment-rules.md`（`tsx` 編集時）
6. `docs/rules/scss-comment-rules.md`（`scss` 編集時）
7. `docs/rules/project-setup.md`
8. `docs/rules/coding-style.md`
9. `docs/rules/nextjs-export.md`
10. `docs/rules/fetch-pattern.md`
11. `docs/rules/ui-interactions.md`
12. `docs/rules/checklist.md`
13. `docs/seo/SEO_SETUP.md`
14. `docs/seo/SEO_AUDIT_REQUEST_TEMPLATE.md`
15. `docs/seo/SEO_FIX_TRACKER_TEMPLATE.md`
16. `docs/seo/ROOTS_QUERY_SEO_SPEC.md`

必須ルール（最優先）:

- `next.config.ts` の `output: 'export'` を維持する
- Tailwind CSS は使用しない（SCSSで実装）
- 依頼範囲外の大幅リファクタはしない
