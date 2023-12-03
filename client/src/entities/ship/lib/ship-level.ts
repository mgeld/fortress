
export type TShipLevel = 1 | 2 | 3 | 4 | 5 | 6

export class ShipLevel {
    
    // public static isUpLevel(level: number) {
    //     return level < 6
    // }

    public static isUpLevel(levelShip: number, levelRank: number) {
        const rankMaxLevelShip = this.getRankMaxLevelShip(levelRank)
        return levelShip < rankMaxLevelShip
    }

    public static getRankMaxLevelShip(level: number): number {
        // Уровень Ранга: Макс уровень Корабля
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
        return levels[level]
    }

    private static _shipHealth: Record<TShipLevel, number> = {
        1: 150,
        2: 250,
        3: 360,
        4: 480,
        5: 610,
        6: 750
    }

    private static _priceLevelUp: Record<TShipLevel, number> = {
        1: 0,
        2: 71,
        3: 290,
        4: 655,
        5: 1165,
        6: 1820
    }

    public static getMaxHealth(level: TShipLevel) {
        return ShipLevel._shipHealth[level]
    }

    public static getLevelUpPrice(level: TShipLevel) {
        return ShipLevel._priceLevelUp[level]
    }
}