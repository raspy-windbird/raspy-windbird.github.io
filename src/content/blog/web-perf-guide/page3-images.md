---
title: "ウェブパフォーマンス最適化ガイド - ページ3: 画像最適化"
date: 2026-01-28
tags: ["performance", "optimization", "web"]
groupId: "web-perf-guide"
groupType: "multi-page"
order: 3
---

## 画像最適化テクニック

### ファイル形式の選択

- **JPEG**: 写真や複雑な画像向け
- **PNG**: 透明度やテキストが必要な場合
- **WebP**: 最新ブラウザでのファイルサイズ削減

### レスポンシブ画像

`srcset`属性を使って、デバイスに応じた最適な画像を配信します：

```html
<img
  src="image.jpg"
  srcset="image-small.jpg 480w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 480px, 1200px"
/>
```

### 遅延読み込み

`loading="lazy"`属性で、ビューポート内に入ったときだけ画像を読み込みます。

次のページでは、CSSとJavaScriptの最適化について説明します。
