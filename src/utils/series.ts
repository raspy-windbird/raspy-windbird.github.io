/**
 * ブログのシリーズ・分割記事管理用ユーティリティ
 */

import { getCollection } from "astro:content";

/**
 * 指定されたgroupIdに属する記事を取得し、orderでソート
 */
export async function getGroupedPosts(groupId: string) {
    const posts = (await getCollection("blog"))
        .filter((post) => !post.data.draft && post.data.groupId === groupId)
        .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
    return posts;
}

/**
 * 現在の記事のペジネーション情報を取得
 * prev, next, currentIndex, totalCount を返す
 */
export async function getPaginationData(groupId: string, currentSlug: string) {
    const posts = await getGroupedPosts(groupId);
    const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

    if (currentIndex === -1) {
        return null; // グループが見つからない
    }

    return {
        current: posts[currentIndex],
        prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
        next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
        currentIndex: currentIndex + 1, // 1-indexed
        totalCount: posts.length,
        all: posts,
    };
}

/**
 * すべてのグループID（シリーズ）を取得
 */
export async function getAllGroups() {
    const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
    const groupsMap = new Map<
        string,
        {
            id: string;
            type: string;
            title: string;
            date: Date;
            posts: typeof posts;
        }
    >();

    posts.forEach((post) => {
        if (post.data.groupId) {
            if (!groupsMap.has(post.data.groupId)) {
                groupsMap.set(post.data.groupId, {
                    id: post.data.groupId,
                    type: post.data.groupType || "series",
                    title: post.data.title, // 最初の記事のタイトルを使用
                    date: post.data.date,
                    posts: [],
                });
            }
            groupsMap.get(post.data.groupId)!.posts.push(post);
        }
    });

    return Array.from(groupsMap.values())
        .map((group) => ({
            ...group,
            posts: group.posts.sort((a, b) => (a.data.order || 0) - (b.data.order || 0)),
        }))
        .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

/**
 * series タイプのグループ一覧を取得
 */
export async function getSeriesList() {
    const groups = await getAllGroups();
    return groups.filter((group) => group.type === "series");
}

/**
 * multi-page タイプのグループ一覧を取得
 */
export async function getMultiPageList() {
    const groups = await getAllGroups();
    return groups.filter((group) => group.type === "multi-page");
}

/**
 * 指定されたタグに属するすべての投稿を取得
 */
export async function getPostsByTag(tag: string) {
    const posts = (await getCollection("blog"))
        .filter((post) => !post.data.draft && post.data.tags.includes(tag))
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    return posts;
}

/**
 * すべてのユニークなタグを取得
 */
export async function getAllTags() {
    const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
    const tagsSet = new Set<string>();

    posts.forEach((post) => {
        post.data.tags.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
}

/**
 * すべてのブログ記事を取得（draft除外で、date順）
 */
export async function getAllBlogPosts() {
    const posts = (await getCollection("blog"))
        .filter((post) => !post.data.draft)
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    return posts;
}

/**
 * ブログ記事を月別でグループ化
 * 返り値: { month: "2026年2月", count: 3, posts: [...] } の配列
 */
export async function getPostsByMonth() {
    const posts = await getAllBlogPosts();
    const monthMap = new Map<string, typeof posts>();

    posts.forEach((post) => {
        const date = post.data.date;
        const yearMonth = `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, "0")}月`;

        if (!monthMap.has(yearMonth)) {
            monthMap.set(yearMonth, []);
        }
        monthMap.get(yearMonth)!.push(post);
    });

    return Array.from(monthMap.entries()).map(([month, posts]) => ({
        month,
        count: posts.length,
        posts,
    }));
}
