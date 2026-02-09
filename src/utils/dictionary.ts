// 辞書（dictionary）用ユーティリティ

export const toCleanKana = (str: string) => {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u3099\u309A]/g, "");
};

export const kanaList =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ".split("");

export function groupByCleanKana<T extends { data: { kana?: string } }>(entries: T[]) {
    const map = new Map<string, T[]>();
    for (const entry of entries) {
        const kana = entry.data?.kana ?? "";
        const first = toCleanKana(kana[0] ?? "");
        const key = first || "";
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(entry);
    }
    return map;
}
