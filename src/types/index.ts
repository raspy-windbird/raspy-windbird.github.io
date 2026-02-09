/**
 * ブログ関連の型定義
 */

/**
 * 日記エントリのメタデータ
 */
export interface DiaryMeta {
    title: string;
    date: Date;
    updated?: Date;
    tags?: string[];
    category?: string;
    image?: string;
    draft?: boolean;
}

/**
 * 日記エントリ（Astro Collection Entry）
 */
export interface DiaryEntry {
    id: string;
    slug: string;
    data: DiaryMeta;
    body: string;
}

/**
 * 辞書エントリのメタデータ
 */
export interface DicMeta {
    title: string;
    kana: string;
    category?: string;
}

/**
 * コンポーネントの Props 型
 */
export interface DicItemProps {
    title: string;
    kana: string;
    category?: string;
}

export interface PostBoxProps {
    title: string;
}

export interface PostTitleProps {
    title: string;
    id?: string;
}

export interface LayoutProps {
    title: string;
}

/**
 * ページング用データ
 */
export interface PaginatedResult<T> {
    items: T[];
    page: number;
    totalPages: number;
    hasMore: boolean;
    hasPrev: boolean;
}

/**
 * メニューアイテム
 */
export interface MenuItem {
    label: string;
    href: string;
}
/**
 * ブログエントリのメタデータ
 */
export interface BlogMeta {
    title: string;
    date: Date;
    updated?: Date;
    tags?: string[];
    image?: string;
    draft?: boolean;
    groupId?: string; // シリーズまたは分割記事を束ねるID
    order?: number; // グループ内での表示順
    groupType?: "series" | "multi-page"; // 'series'=連載、'multi-page'=分割記事
}

/**
 * ブログエントリ（Astro Collection Entry）
 */
export interface BlogEntry {
    id: string;
    slug: string;
    data: BlogMeta;
    body: string;
}

/**
 * ペジネーション/シリーズナビゲーション用データ
 */
export interface PaginationData {
    current: BlogEntry;
    prev: BlogEntry | null;
    next: BlogEntry | null;
    currentIndex: number; // 1-indexed
    totalCount: number;
    all: BlogEntry[];
}

/**
 * グループ（シリーズ/分割記事）のデータ
 */
export interface GroupData {
    id: string;
    type: "series" | "multi-page";
    title: string;
    date: Date;
    posts: BlogEntry[];
}