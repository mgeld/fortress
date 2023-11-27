
export type TStormCorpsLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export class StormCorpsLevel {
        
    public static isUpLevel(level: number) {
        return level < 12
    }

    private static _stormMaxInvaders: Record<TStormCorpsLevel, number> = {
        1: 150,
        2: 200,
        3: 255,
        4: 315,
        5: 380,
        6: 450,
        7: 525,
        8: 605,
        9: 690,
        10: 780,
        11: 875,
        12: 975
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