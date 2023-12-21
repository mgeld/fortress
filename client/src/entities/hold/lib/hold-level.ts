export type THoldLevel = 1 | 2 | 3 | 4 | 5 | 6

export class HoldLevel {

    public static isUpLevel(levelHold: number, levelShip: number) {
        const shipMaxLevelHold = this.getShipMaxLevelHold(levelShip)
        return levelHold < shipMaxLevelHold
    }

    public static getShipMaxLevelHold(level: number): number {
        // Уровень Корабля: Макс уровень Трюма
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

    private static _holdItems: Record<THoldLevel, number> = {
        1: 10,
        2: 15,
        3: 25,
        4: 40,
        5: 60,
        6: 85
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