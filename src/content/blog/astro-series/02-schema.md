---
title: "AstroでContent Collectionsを使う (2) スキーマ定義"
date: 2026-02-03
tags: ["astro", "frontend", "javascript"]
groupId: "astro-series"
groupType: "series"
order: 2
---

## スキーマ定義の重要性

`config.ts`で定義するスキーマは、すべてのコンテンツの構造を規定します。

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(150),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    groupId: z.string().optional(),
    order: z.number().optional(),
    groupType: z.enum(['series', 'multi-page']).optional(),
  }),
});
```

### スキーマのメリット

- **バリデーション**: 不正なデータはビルド時に拒否
- **IDE補完**: エディタで自動補完が機能
- **ドキュメント化**: スキーマそのものがドキュメント

次のステップでは、実際にシリーズ記事のグループを管理するユーティリティを作成していきます。
