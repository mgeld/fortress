
export type TShipLevel = 1 | 2 | 3 | 4 | 5 | 6

export class ShipLevel {
    
    public static isUpLevel(level: number) {
        return level < 6
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
        2: 20,
        3: 40,
        4: 70,
        5: 110,
        6: 160
    }

    public static getMaxHealth(level: TShipLevel) {
        return ShipLevel._shipHealth[level]
    }

    public static getLevelUpPrice(level: TShipLevel) {
        return ShipLevel._priceLevelUp[level]
    }
}