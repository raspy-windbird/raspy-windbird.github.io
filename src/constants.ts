/**
 * サイト全体の定数管理
 * kent.web 風レトロデザインを保ちながら統一化
 */

// サイト情報
export const SITE_CONFIG = {
    name: "かめそら",
    fullTitle: "かめそらの庭",
    description: "ラズパイとか好きなやつのブログ",
    author: "Kamesora",
    copyright: "Copyright (C) 2025 Kamesora. All Rights Reserved.",
    year: 2025,
};

// レトロダーク配色（kent.web風）
export const COLORS = {
    // 基本色
    primary: "#000080",      // 紺色（メインカラー）
    primaryLight: "#000040", // より濃い紺色
    secondary: "#0000ff",    // 青（リンク）
    secondaryVisited: "#800080", // 紫（訪問済みリンク）
    background: "#dddddd",   // 背景：明るい灰色
    surface: "#f4f4f4",      // サーフェス：薄い灰色
    border: "#cccccc",       // ボーダー
    text: "#000000",         // テキスト黒
    textSecondary: "#666666", // グレーテキスト
    accent: "#ffffee",       // ホバー背景（薄黄）
};

// スペーシング（マジックナンバー排除）
export const SPACING = {
    xs: "5px",
    sm: "10px",
    md: "15px",
    lg: "25px",
    xl: "35px",
};

// フォント設定
export const TYPOGRAPHY = {
    fontFamily: '"MS Pゴシック", "MS PGothic", "Meiryo", sans-serif',
    fontSize: {
        xs: "10px",
        sm: "11px",
        base: "12px",
        md: "13px",
        lg: "14px",
        xl: "16px",
        title: "18px",
    },
    lineHeight: {
        tight: 1.6,
        normal: 1.7,
        relaxed: 1.8,
        loose: 2.0,
    },
};

// レイアウト寸法
export const LAYOUT = {
    sidebarWidth: "180px",
    maxWidth: "1000px",
    mainContentPadding: "25px",
    sidebarPadding: "20px 15px",
};

// ボーダー
export const BORDERS = {
    thin: "1px solid",
    inset: "1px inset",
};

// メニュー構造
export const MENU_ITEMS = [
    { label: "TOPページ", href: "/" },
    { label: "雑記", href: "/diary" },
    { label: "辞書", href: "/dic" },
    { label: "リンク集", href: "/links" },
    { label: "このサイトについて", href: "/about" },
];

// ブログ設定
export const BLOG_CONFIG = {
    postsPerPage: 10,
    teaserLength: 300,
    readingTimeWordsPerMinute: 200, // 日本語は200字/分が目安
};

// 五十音リスト（辞書用）
export const KANA_LIST =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ".split("");
