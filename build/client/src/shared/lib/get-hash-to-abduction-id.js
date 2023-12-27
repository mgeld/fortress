"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashToAbductionId = void 0;
const getHashToAbductionId = () => {
    let href = window.location.href;
    if (~href.lastIndexOf('#a')) {
        let index_sector = href.lastIndexOf('#a');
        let zone_id = href.slice(index_sector + 2);
        return +zone_id;
    }
    return null;
};
exports.getHashToAbductionId = getHashToAbductionId;
