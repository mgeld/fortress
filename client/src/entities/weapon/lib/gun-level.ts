
export type TGunLevel = 1 | 2 | 3 | 4 | 5 | 6

export class GunLevel {
        
    public static isUpLevel(level: number) {
        return level < 6
    }

    private static _gunShells: Record<TGunLevel, number> = {
        1: 200,
        2: 300,
        3: 410,
        4: 530,
        5: 660,
        6: 800
    }
    
    private static _gunPower: Record<TGunLevel, number> = {
        1: 30,
        2: 50,
        3: 72,
        4: 96,
        5: 122,
        6: 150
    }

    private static _gunDistance: Record<TGunLevel, number> = {
        1: 250,
        2: 300,
        3: 380,
        4: 490,
        5: 630,
        6: 800
    }

    private static _priceLevelUp: Record<TGunLevel, number> = {
        1: 0,
        2: 100,
        3: 300,
        4: 600,
        5: 1000,
        6: 1500
    }

    public static getLevelUpPrice(level: TGunLevel) {
        return GunLevel._priceLevelUp[level]
    }

    public static getMaxShells(level: TGunLevel) {
        return GunLevel._gunShells[level]
    }

    public static getMaxPower(level: TGunLevel) {
        return GunLevel._gunPower[level]
    }

    public static getMaxDistance(level: TGunLevel) {
        return GunLevel._gunDistance[level]
    }
    
}