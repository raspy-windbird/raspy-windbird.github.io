---
title: "AstroでContent Collectionsを使う (3) シリーズ管理"
date: 2026-02-05
tags: ["astro", "frontend", "javascript"]
groupId: "astro-series"
groupType: "series"
order: 3
---

## シリーズ記事の管理

シリーズ記事を管理するには、`groupId`と`order`を活用します：

```yaml
---
title: "記事タイトル"
date: 2026-02-01
groupId: "astro-series"      # シリーズを識別
groupType: "series"          # 連載シリーズ
order: 1                     # グループ内での順序
---
```

### ユーティリティ関数

`series.ts`で定義した関数を使って、グループ内の記事を効率的に取得できます：

```typescript
const paginationData = await getPaginationData(groupId, currentSlug);
```

これにより、次の記事・前の記事へのリンクを自動生成できるようになります。

このシリーズの最終回では、ペジネーションコンポーネントの完全な実装を説明します。
