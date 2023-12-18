"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashToSectorId = void 0;
const getHashToSectorId = () => {
    let href = window.location.href;
    if (~href.lastIndexOf('#s')) {
        let index_sector = href.lastIndexOf('#s');
        let sector_id = href.slice(index_sector + 2);
        return sector_id;
    }
    return null;
};
exports.getHashToSectorId = getHashToSectorId;
