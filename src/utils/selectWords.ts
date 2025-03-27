// 単語とローマ字の読みの型定義
export interface TypeWord {
    word: string;
    romaji: string;
}

// 任意の数の単語とそのローマ字読みをランダムに選ぶ関数
export function selectWords(TypeWords: TypeWord[], count: number): TypeWord[] {
    // 引数で指定した数が配列の長さより大きい場合、配列の長さに制限
    const numToSelect = Math.min(count, TypeWords.length);

    const selectedWords: TypeWord[] = [];
    const usedIndices: Set<number> = new Set();

    while (selectedWords.length < numToSelect) {
        const randomIndex = Math.floor(Math.random() * TypeWords.length);

        // 同じインデックスが選ばれないように確認
        if (!usedIndices.has(randomIndex)) {
            selectedWords.push(TypeWords[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }

    return selectedWords;
}
