
export type TStormCorpsLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export class StormCorpsLevel {
        
    public static isUpLevel(levelStorm: number, levelShip: number) {
        const shipMaxLevelStorm = this.getShipMaxLevelStorm(levelShip)
        return levelStorm < shipMaxLevelStorm
    }

    public static getShipMaxLevelStorm(level: number): number {
        // Уровень Корабля: Макс уровень Штурмового Корпуса
        const levels: { [key: number]: number } = {
            1: 2,
            2: 4,
            3: 6,
            4: 8,
            5: 10,
            6: 12,
        }
        return levels[level]
    }

    private static _stormMaxInvaders: Record<TStormCorpsLevel, number> = {
        1: 150,
        2: 210,
        3: 285,
        4: 375,
        5: 480,
        6: 600,
        7: 735,
        8: 885,
        9: 1050,
        10: 1230,
        11: 1425,
        12: 1625
    }
    
    private static _stormMaxPower: Record<TStormCorpsLevel, number> = {
        1: 15,
        2: 25,
        3: 40,
        4: 60,
        5: 85,
        6: 115,
        7: 150,
        8: 190,
        9: 235,
        10: 285,
        11: 340,
        12: 400
    }

    private static _priceLevelUp: Record<TStormCorpsLevel, number> = {
        1: 0,
        2: 400,
        3: 806,
        4: 1209,
        5: 3283,
        6: 4924,
        7: 7401,
        8: 11102,
        9: 13161,
        10: 19742,
        11: 20563,
        12: 30844
    }

    public static getLevelUpPrice(level: TStormCorpsLevel) {
        return StormCorpsLevel._priceLevelUp[level]
    }

    public static getMaxInvaders(level: TStormCorpsLevel) {
        return StormCorpsLevel._stormMaxInvaders[level]
    }

    public static getMaxpower(level: TStormCorpsLevel) {
        return StormCorpsLevel._stormMaxPower[level]
    }
    
}