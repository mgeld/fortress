export class ShipLevels {
    public static getShipMaxLevelGun(level: number): number {
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
    public static getShipMaxLevelStorm(level: number): number {
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
    public static getShipMaxLevelHold(level: number): number {
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

}