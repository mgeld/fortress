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
    100: {
        currency: 'coins',
        price: 340
    },
    101: {
        currency: 'coins',
        price: 408
    },
    10: {
        currency: 'coins',
        price: 100
    },
    11: {
        currency: 'coins',
        price: 130
    },
    12: {
        currency: 'coins',
        price: 195
    },
    20: {
        currency: 'rubies',
        price: 15
    },
    21: {
        currency: 'rubies',
        price: 30
    },
    22: {
        currency: 'rubies',
        price: 45
    },
    30: {
        currency: 'coins',
        price: 150
    },
    31: {
        currency: 'coins',
        price: 200
    },
    32: {
        currency: 'coins',
        price: 250
    },
    40: {
        currency: 'rubies',
        price: 12
    },
    41: {
        currency: 'rubies',
        price: 24
    },
    42: {
        currency: 'rubies',
        price: 36
    },
    50: {
        currency: 'rubies',
        price: 10
    },
    51: {
        currency: 'rubies',
        price: 20
    },
    52: {
        currency: 'rubies',
        price: 30
    },
};
Units.__list = {
    rank_exp: {
        10: 80,
        11: 100,
        12: 150,
    },
    storm_power: {
        20: 3,
        21: 6,
        22: 10,
    },
    ship_health: {
        30: 50,
        31: 100,
        32: 150,
    },
    gun_power: {
        40: 3,
        41: 6,
        42: 9,
    },
    gun_distance: {
        50: 15,
        51: 20,
        52: 25,
    },
    stormtroopers: {
        100: 100,
        101: 150,
    },
    rubies: {
        110: 10,
        111: 20,
    },
    coins: {
        120: 260,
        121: 340,
    },
};
exports.Units = Units;
