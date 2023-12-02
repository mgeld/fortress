"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BombHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
const determinant_bomb_1 = require("entities/bomb/lib/determinant-bomb");
class BombHandler extends __1.Handler {
    handle(message) {
        const BOMB_ID = Date.now();
        const pos = message.payload.position;
        const userId = message.payload.userId;
        const health = message.payload.health;
        const bombSymbolLevel = message.payload.bomb;
        const bomb = (0, determinant_bomb_1.determinantBomb)(bombSymbolLevel.symbol, bombSymbolLevel.level);
        events_1.bombsAPI.events.addBomb({
            id: BOMB_ID,
            pos,
            radius: bomb.radius
        });
        setTimeout(() => {
            events_1.bombsAPI.events.delBombById({ bomb_id: BOMB_ID });
            events_1.bombsAPI.events.hitBombInTarget({
                hitUserId: userId,
                health
            });
        }, 500);
    }
}
exports.BombHandler = BombHandler;
BombHandler.EVENT = 'bomb';
