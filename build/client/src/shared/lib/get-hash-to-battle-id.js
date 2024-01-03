"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashToBattleId = void 0;
const getHashToBattleId = () => {
    let href = window.location.href;
    if (~href.lastIndexOf('#b')) {
        let index_sector = href.lastIndexOf('#b');
        let zone_id = href.slice(index_sector + 2);
        return zone_id;
    }
    return null;
};
exports.getHashToBattleId = getHashToBattleId;
