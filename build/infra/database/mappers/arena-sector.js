"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaSectorMapper = void 0;
const sector_1 = require("../../../entities/arena/sector");
class ArenaSectorMapper {
    static toDomain(sector) {
        return sector_1.ArenaSector.create(sector);
    }
}
exports.ArenaSectorMapper = ArenaSectorMapper;
