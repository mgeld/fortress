"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Units = void 0;
class Units {
    static getTypeModuleNumber(number) {
        const types = {
            10: 'rank_exp',
            20: 'storm_power',
            30: 'ship_health',
            40: 'gun_power',
            50: 'gun_distance',
            100: 'stormtroopers',
            110: 'rubies',
            120: 'coins',
        };
        const id = Math.floor(number / 10) * 10;
        return types[id];
    }
    static getUnitQuantity(id) {
        const gives = Units.getTypeModuleNumber(id);
        const quantity = Units.__list[gives][id];
        return {
            gives,
            quantity
        };
    }
    static getUnitPrice(id) {
        return Units.sale_units[id];
    }
}
Units.sale_units = {
    10: {
        currency: 'coins',
        price: 50
    },
    11: {
        currency: 'coins',
        price: 50
    },
    12: {
        currency: 'coins',
        price: 100
    },
    20: {
        currency: 'coins',
        price: 100
    },
    21: {
        currency: 'coins',
        price: 100
    },
    22: {
        currency: 'coins',
        price: 150
    },
    30: {
        currency: 'rubies',
        price: 50
    },
    31: {
        currency: 'rubies',
        price: 50
    },
    32: {
        currency: 'rubies',
        price: 80
    },
    40: {
        currency: 'coins',
        price: 50
    },
    41: {
        currency: 'coins',
        price: 50
    },
    42: {
        currency: 'rubies',
        price: 70
    },
    50: {
        currency: 'coins',
        price: 50
    },
    51: {
        currency: 'coins',
        price: 50
    },
    52: {
        currency: 'coins',
        price: 100
    },
    100: {
        currency: 'coins',
        price: 50
    },
    101: {
        currency: 'coins',
        price: 100
    },
};
Units.__list = {
    rank_exp: {
        10: 100,
        11: 100,
        12: 100,
    },
    storm_power: {
        20: 100,
        21: 100,
        22: 100,
    },
    ship_health: {
        30: 100,
        31: 100,
        32: 100,
    },
    gun_power: {
        40: 100,
        41: 100,
        42: 100,
    },
    gun_distance: {
        50: 100,
        51: 100,
        52: 100,
    },
    stormtroopers: {
        100: 100,
        101: 100,
    },
    rubies: {
        110: 100,
        111: 100,
    },
    coins: {
        120: 100,
        121: 100,
    },
};
exports.Units = Units;
