
export type TZoneLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export class ZoneLevel {
    private static _levelAllSectors: Record<TZoneLevel, number> = {
        1: 50,
        2: 200,
        3: 500,
        4: 1000,
        5: 1750,
        6: 2800,
        7: 4200,
        8: 6000,
        9: 8250,
        10: 11000,
        11: 14300,
        12: 18200
    }
    private static _levelSectors: Record<TZoneLevel, number> = {
        1: 50,
        2: 150,
        3: 300,
        4: 500,
        5: 750,
        6: 1050,
        7: 1400,
        8: 1800,
        9: 2250,
        10: 2750,
        11: 3300,
        12: 3900,
    }

    public static getMaxLevelAllSectors(level: TZoneLevel) {
        return ZoneLevel._levelAllSectors[level]
    }

    public static getMaxLevelSectors(level: TZoneLevel) {
        return ZoneLevel._levelSectors[level]
    }
}