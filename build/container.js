"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const pointer_service_1 = require("./services/pointer.service");
const memory_data_1 = require("./infra/database/memory/memory-data");
const arena_1 = require("./infra/database/memory/repositories/arena");
const pointer_1 = require("./infra/database/memory/repositories/pointer");
const arena_service_1 = require("./services/arena.service");
const entityId_1 = require("./domain/entityId");
const weapon_service_1 = require("./services/weapon.service");
const server_1 = require("./api/socket/server");
const handlers_1 = require("./controllers/handlers");
const connect_1 = require("./controllers/connect");
const direct_1 = require("./controllers/direct");
const fire_1 = require("./controllers/fire");
const rooms_1 = require("./api/socket/socket/rooms");
const weapon_1 = require("./infra/database/memory/repositories/weapon");
const member_service_1 = require("./services/member.service");
const battle_join_1 = require("./controllers/battle-join");
const battle_fire_1 = require("./controllers/battle-fire");
const battle_direct_1 = require("./controllers/battle-direct");
const member_1 = require("./infra/database/memory/repositories/member");
const take_1 = require("./controllers/take");
const sector_1 = require("./infra/database/memory/repositories/sector");
const sector_service_1 = require("./services/sector.service");
const get_sectors_1 = require("./controllers/get-sectors");
const connection_1 = __importDefault(require("./infra/database/mysql2/connection"));
const pointer_2 = require("./infra/database/mysql2/repositories/pointer");
const weapon_2 = require("./infra/database/mysql2/repositories/weapon");
const sector_2 = require("./infra/database/mysql2/repositories/sector");
const takes_1 = require("./infra/logs/takes");
const areal_1 = require("./infra/database/memory/repositories/areal");
const snapshot_sectors_1 = require("./controllers/snapshot-sectors");
const get_about_sector_1 = require("./controllers/get-about-sector");
const get_user_1 = require("./controllers/get-user");
const citadel_1 = require("./infra/database/memory/repositories/citadel");
const zone_1 = require("./infra/database/memory/repositories/zone");
const zone_2 = require("./infra/database/mysql2/repositories/zone");
const zone_service_1 = require("./services/zone.service");
const citadel_2 = require("./infra/database/mysql2/repositories/citadel");
const citadel_service_1 = require("./services/citadel.service");
const battle_leave_1 = require("./controllers/battle-leave");
const vk_user_1 = require("./infra/database/mysql2/repositories/vk-user");
const use_extraction_1 = require("./controllers/use-extraction");
const beam_1 = require("./controllers/beam");
const buy_unit_1 = require("./controllers/buy-unit");
const level_up_1 = require("./controllers/level-up");
const ping_pong_1 = require("./api/socket/socket/ping-pong");
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.Server).to(server_1.Server).inSingletonScope();
container.bind(types_1.TYPES.PingPong).to(ping_pong_1.PingPong).inSingletonScope();
container.bind(types_1.TYPES.Rooms).to(rooms_1.Rooms).inSingletonScope();
container.bind(types_1.TYPES.Handlers).to(handlers_1.Handlers);
container.bind(types_1.TYPES.ConnectHandler).to(connect_1.ConnectHandler);
container.bind(types_1.TYPES.DirectHandler).to(direct_1.DirectHandler);
container.bind(types_1.TYPES.FireHandler).to(fire_1.FireHandler);
container.bind(types_1.TYPES.BeamHandler).to(beam_1.BeamHandler);
container.bind(types_1.TYPES.TakeHandler).to(take_1.TakeHandler);
container.bind(types_1.TYPES.BattleJoinHandler).to(battle_join_1.BattleJoinHandler);
container.bind(types_1.TYPES.BattleLeaveHandler).to(battle_leave_1.BattleLeaveHandler);
container.bind(types_1.TYPES.BattleFireHandler).to(battle_fire_1.BattleFireHandler);
container.bind(types_1.TYPES.BattleDirectHandler).to(battle_direct_1.BattleDirectHandler);
container.bind(types_1.TYPES.GetSectorsHandler).to(get_sectors_1.GetSectorsHandler);
container.bind(types_1.TYPES.GetAboutSectorHandler).to(get_about_sector_1.GetAboutSectorHandler);
container.bind(types_1.TYPES.GetUserHandler).to(get_user_1.GetUserHandler);
container.bind(types_1.TYPES.UseExtractionHandler).to(use_extraction_1.UseExtractionHandler);
container.bind(types_1.TYPES.BuyUnitHandler).to(buy_unit_1.BuyUnitHandler);
container.bind(types_1.TYPES.LevelUpHandler).to(level_up_1.LevelUpHandler);
container.bind(types_1.TYPES.ArenaService).to(arena_service_1.ArenaService);
container.bind(types_1.TYPES.PointerService).to(pointer_service_1.PointerService);
container.bind(types_1.TYPES.ZoneService).to(zone_service_1.ZoneService);
container.bind(types_1.TYPES.MemberService).to(member_service_1.MemberService);
container.bind(types_1.TYPES.WeaponService).to(weapon_service_1.WeaponService);
container.bind(types_1.TYPES.SectorService).to(sector_service_1.SectorService);
container.bind(types_1.TYPES.CitadelService).to(citadel_service_1.CitadelService);
container.bind(types_1.TYPES.Base64EntityIdGenerator).to(entityId_1.Base64EntityIdGenerator).inSingletonScope();
container.bind(types_1.TYPES.Database).to(memory_data_1.MemoryData).inSingletonScope();
container.bind(types_1.TYPES.Logs).to(takes_1.Logs).inSingletonScope();
container.bind(types_1.TYPES.ArenaMemoryRepository).to(arena_1.ArenaMemoryRepository);
container.bind(types_1.TYPES.PointerMemoryRepository).to(pointer_1.PointerMemoryRepository);
container.bind(types_1.TYPES.ZoneMemoryRepository).to(zone_1.ZoneMemoryRepository);
container.bind(types_1.TYPES.WeaponMemoryRepository).to(weapon_1.WeaponMemoryRepository);
container.bind(types_1.TYPES.MemberMemoryRepository).to(member_1.MemberMemoryRepository);
container.bind(types_1.TYPES.SectorMemoryRepository).to(sector_1.SectorMemoryRepository);
container.bind(types_1.TYPES.SectorRepository).to(sector_2.SectorRepository);
container.bind(types_1.TYPES.ArealMemoryRepository).to(areal_1.ArealMemoryRepository);
container.bind(types_1.TYPES.CitadelMemoryRepository).to(citadel_1.CitadelMemoryRepository);
container.bind(types_1.TYPES.CitadelRepository).to(citadel_2.CitadelRepository);
container.bind(types_1.TYPES.VkUserRepository).to(vk_user_1.VkUserRepository);
container.bind(types_1.TYPES.PointerRepository).to(pointer_2.PointerRepository);
container.bind(types_1.TYPES.ZoneRepository).to(zone_2.ZoneRepository);
container.bind(types_1.TYPES.WeaponRepository).to(weapon_2.WeaponRepository);
container.bind(types_1.TYPES.SnapshotSectors).to(snapshot_sectors_1.SnapshotSectors);
container.bind(types_1.TYPES.connection).toConstantValue(connection_1.default);
