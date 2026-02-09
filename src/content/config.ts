import { defineCollection, z } from 'astro:content';

const diary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

const dic = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    kana: z.string(),
    category: z.string().optional(),
  }),
});

export const collections = { diary, dic };
