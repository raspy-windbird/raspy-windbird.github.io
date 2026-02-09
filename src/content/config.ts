import { defineCollection, z } from 'astro:content';

const diary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(100),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const dictionary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    kana: z.string(),
    category: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(150),
    date: z.coerce.date(),
    published: z.coerce.date().optional(), // ISO8601形式（デフォルト: date と同じ）
    updated: z.coerce.date().optional(),
    author: z.string().default("raspy-windbird"), // デフォルト作成者
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    // シリーズ・分割記事管理
    groupId: z.string().optional(), // シリーズまたは分割記事を束ねるID（ディレクトリ名など）
    order: z.number().optional(), // グループ内での表示順
    groupType: z.enum(['series', 'multi-page']).optional(), // 'series'=連載、'multi-page'=分割記事
  }).refine((data) => {
    // published がない場合、date をコピー（記事作成時の手入力不要）
    if (!data.published) {
      data.published = data.date;
    }
    return true;
  }),
});

export const collections = { diary, dictionary, blog };
