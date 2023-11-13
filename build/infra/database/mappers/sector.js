"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorMapper = void 0;
const sector_1 = require("../../../entities/sector/sector");
class SectorMapper {
    static toDomain(sector) {
        return sector_1.Sector.create(sector);
    }
}
exports.SectorMapper = SectorMapper;
