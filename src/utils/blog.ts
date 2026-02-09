/**
 * ブログ関連のユーティリティ関数
 */

import { getCollection } from "astro:content";
import { BLOG_CONFIG, KANA_LIST } from "../constants";

/**
 * すべてのブログポストを取得（下書き除外）
 */
export async function getBlogPosts() {
    const posts = (await getCollection("diary"))
        .filter((post) => !post.data.draft)
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    return posts;
}

/**
 * 日本語テキストの読了時間を計算（分単位）
 * @param contentStr - マークダウンコンテンツ文字列
 * @returns 読了時間（分）
 */
export function getReadingTime(contentStr: string): number {
    // 日本語文字（ひらがな、カタカナ、漢字）をカウント
    const japaneseChars = contentStr.match(
        /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g
    );
    const charCount = japaneseChars?.length || 0;
    return Math.ceil(charCount / BLOG_CONFIG.readingTimeWordsPerMinute);
}

/**
 * 日付をフォーマット
 * @param date - 日付オブジェクト
 * @param format - フォーマット形式（"YYYY-MM-DD" または "日本語"）
 * @returns フォーマット済み日付文字列
 */
export function formatDate(
    date: Date,
    format: "YYYY-MM-DD" | "ja" = "YYYY-MM-DD"
): string {
    if (format === "ja") {
        return date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }
    // "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/**
 * 濁音・半濁音を清音に変換
 * 五十音索引用に、「が」を「か」として扱うなど
 */
export function toCleanKana(str: string): string {
    return str.normalize("NFD").replace(/[\u3099\u309a]/g, "");
}

/**
 * タグシステム用：記事をタグでグループ化
 */
export async function groupByTag(): Promise<Map<string, string[]>> {
    const posts = await getBlogPosts();
    const tagMap = new Map<string, string[]>();

    posts.forEach((post) => {
        const tags = post.data.tags || [];
        tags.forEach((tag) => {
            if (!tagMap.has(tag)) {
                tagMap.set(tag, []);
            }
            tagMap.get(tag)!.push(post.slug);
        });
    });

    return tagMap;
}

/**
 * タグに基づいて関連記事を取得
 */
export async function getRelatedPosts(
    currentSlug: string,
    tags: string[],
    limit = 3
) {
    const posts = await getBlogPosts();
    return posts
        .filter((post) => post.slug !== currentSlug)
        .filter(
            (post) =>
                post.data.tags && post.data.tags.some((tag) => tags.includes(tag))
        )
        .slice(0, limit);
}

/**
 * ページング用：指定ページの記事を取得
 */
export async function getBlogPostsByPage(page: number = 1, perPage = 10) {
    const posts = await getBlogPosts();
    const total = posts.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;

    return {
        posts: posts.slice(start, start + perPage),
        page,
        totalPages,
        hasMore: page < totalPages,
        hasPrev: page > 1,
    };
}

/**
 * 五十音索引の初期化（辞書用）
 */
export function initKanaIndex(entries: any[]) {
    const existingChars = [
        ...new Set(entries.map((entry) => toCleanKana(entry.data.kana[0]))),
    ];

    return {
        all: KANA_LIST,
        existing: existingChars,
    };
}

