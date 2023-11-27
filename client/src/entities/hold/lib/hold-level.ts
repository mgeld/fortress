
export type THoldLevel = 1 | 2 | 3 | 4 | 5 | 6

export class HoldLevel {

    public static isUpLevel(level: number) {
        return level < 6
    }

    private static _holdItems: Record<THoldLevel, number> = {
        1: 10,
        2: 15,
        3: 20,
        4: 25,
        5: 30,
        6: 35
    }
    
    private static _priceLevelUp: Record<THoldLevel, number> = {
        1: 0,
        2: 504,
        3: 2052,
        4: 4626,
        5: 8226,
        6: 12852
    }

    public static getLevelUpPrice(level: THoldLevel) {
        return HoldLevel._priceLevelUp[level]
    }

    public static getMaxItems(level: THoldLevel) {
        return HoldLevel._holdItems[level]
    }
}