
export type TStormCorpsLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export class StormCorpsLevel {
        
    public static isUpLevel(level: number) {
        return level < 12
    }

    private static _stormMaxInvaders: Record<TStormCorpsLevel, number> = {
        1: 100,
        2: 150,
        3: 205,
        4: 265,
        5: 330,
        6: 400,
        7: 475,
        8: 555,
        9: 640,
        10: 730,
        11: 825,
        12: 925
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
        2: 100,
        3: 300,
        4: 600,
        5: 1000,
        6: 1500,
        7: 2100,
        8: 2800,
        9: 3600,
        10: 4500,
        11: 5500,
        12: 6600
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