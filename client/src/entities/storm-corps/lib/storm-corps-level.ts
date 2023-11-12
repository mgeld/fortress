
export type TStormCorpsLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export class StormCorpsLevel {
        
    public static isUpLevel(level: number) {
        return level < 12
    }

    private static _stormMaxInvaders: Record<TStormCorpsLevel, number> = {
        1: 50,
        2: 100,
        3: 155,
        4: 215,
        5: 280,
        6: 350,
        7: 425,
        8: 505,
        9: 590,
        10: 680,
        11: 775,
        12: 875
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