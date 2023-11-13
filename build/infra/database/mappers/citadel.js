"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitadelMapper = void 0;
const citadel_1 = require("../../../entities/citadel/citadel");
class CitadelMapper {
    static toDomain(citadel) {
        return citadel_1.Citadel.create(citadel);
    }
}
exports.CitadelMapper = CitadelMapper;
