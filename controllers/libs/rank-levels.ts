export class RankLevels {
    
    // Максимальный уровень Корабля на ранг
    public static getRankMaxLevelShip(rank: number): number {
        const levels: { [key: number]: number } = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 2,
            6: 2,
            7: 2,
            8: 2,
            9: 3,
            10: 3,
            11: 3,
            12: 3,
            13: 4,
            14: 4,
            15: 4,
            16: 4,
            17: 5,
            18: 5,
            19: 5,
            20: 5,
            21: 6,
            22: 6,
            23: 6,
            24: 6,
        }
        return levels[rank]
    }

    // Максимальный уровень Цитаделя на ранг
    public static getRankMaxLevelCitadel(rank: number): number {
        const levels: { [key: number]: number } = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 2,
            6: 2,
            7: 2,
            8: 2,
            9: 3,
            10: 3,
            11: 3,
            12: 3,
            13: 4,
            14: 4,
            15: 4,
            16: 4,
            17: 5,
            18: 5,
            19: 5,
            20: 5,
            21: 6,
            22: 6,
            23: 6,
            24: 6,
        }
        return levels[rank]
    }

}