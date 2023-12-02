
export type TGunLevel = 1 | 2 | 3 | 4 | 5 | 6

export class GunLevel {

    public static isUpLevel(levelGun: number, levelShip: number) {
        const shipMaxLevelGun = this.getShipMaxLevelGun(levelShip)
        return levelGun < shipMaxLevelGun
    }

    public static getShipMaxLevelGun(level: number): number {
        // Уровень Корабля: Макс уровень Пушки
        const levels: { [key: number]: number } = {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
        }
        return levels[level]
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
        1: 330,
        2: 380,
        3: 460,
        4: 570,
        5: 710,
        6: 880 
    }

    private static _priceLevelUp: Record<TGunLevel, number> = {
        1: 0,
        2: 840,
        3: 3420,
        4: 7710,
        5: 13710,
        6: 21420
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