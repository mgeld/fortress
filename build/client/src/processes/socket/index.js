"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WS = void 0;
const handlers_1 = require("shared/api/handlers");
const attraction_1 = require("shared/api/handlers/attraction");
const battle_join_1 = require("shared/api/handlers/battle-join");
const battle_over_1 = require("shared/api/handlers/battle-over");
const battle_start_1 = require("shared/api/handlers/battle-start");
const bomb_1 = require("shared/api/handlers/bomb");
const buy_unit_1 = require("shared/api/handlers/buy-unit");
const connect_1 = require("shared/api/handlers/connect");
const connect_pointer_1 = require("shared/api/handlers/connect-pointer");
const del_pointer_1 = require("shared/api/handlers/del-pointer");
const direct_1 = require("shared/api/handlers/direct");
const find_cont_1 = require("shared/api/handlers/find-cont");
const fire_1 = require("shared/api/handlers/fire");
const level_up_1 = require("shared/api/handlers/level-up");
const limit_1 = require("shared/api/handlers/limit");
const new_rank_1 = require("shared/api/handlers/new-rank");
const new_zone_1 = require("shared/api/handlers/new-zone");
const pointers_1 = require("shared/api/handlers/pointers");
const sector_1 = require("shared/api/handlers/sector");
const sectors_1 = require("shared/api/handlers/sectors");
const set_citadel_1 = require("shared/api/handlers/set-citadel");
const set_user_1 = require("shared/api/handlers/set-user");
const take_1 = require("shared/api/handlers/take");
const take_hit_1 = require("shared/api/handlers/take-hit");
const take_sector_1 = require("shared/api/handlers/take-sector");
const use_extraction_1 = require("shared/api/handlers/use-extraction");
const y_take_sector_1 = require("shared/api/handlers/y-take-sector");
const yr_take_sector_1 = require("shared/api/handlers/yr-take-sector");
const config_1 = require("shared/config");
const model_1 = require("shared/api/socket/model");
const socket_1 = require("shared/api/socket/socket");
const tutorial_1 = require("shared/api/handlers/tutorial");
const battle_take_sector_1 = require("shared/api/handlers/battle-take-sector");
const battle_y_take_sector_1 = require("shared/api/handlers/battle-y-take-sector");
const battle_yr_take_sector_1 = require("shared/api/handlers/battle-yr-take-sector");
const session_1 = require("shared/api/handlers/session");
const set_health_1 = require("shared/api/handlers/set-health");
const set_rating_1 = require("shared/api/handlers/set-rating");
exports.WS = socket_1.Socket.create(config_1.API_BASE_URL, model_1.events.setSocketStatus);
const handlers = new handlers_1.Handlers({
    [connect_1.ConnectHandler.EVENT]: new connect_1.ConnectHandler(),
    [connect_pointer_1.ConnectPointerHandler.EVENT]: new connect_pointer_1.ConnectPointerHandler(),
    [del_pointer_1.DelPointerHandler.EVENT]: new del_pointer_1.DelPointerHandler(),
    [direct_1.DirectPointerHandler.EVENT]: new direct_1.DirectPointerHandler(),
    [pointers_1.PointersHandler.EVENT]: new pointers_1.PointersHandler(),
    [take_1.TakeHandler.EVENT]: new take_1.TakeHandler(),
    [battle_start_1.BattleStartHandler.EVENT]: new battle_start_1.BattleStartHandler(),
    [battle_over_1.BattleOverHandler.EVENT]: new battle_over_1.BattleOverHandler(),
    [fire_1.FireHandler.EVENT]: new fire_1.FireHandler(),
    [bomb_1.BombHandler.EVENT]: new bomb_1.BombHandler(),
    [battle_join_1.BattleJoinHandler.EVENT]: new battle_join_1.BattleJoinHandler(),
    [sectors_1.SectorsHandler.EVENT]: new sectors_1.SectorsHandler(),
    [sector_1.SectorHandler.EVENT]: new sector_1.SectorHandler(),
    [take_hit_1.TakeHitHandler.EVENT]: new take_hit_1.TakeHitHandler(),
    [take_sector_1.TakeSectorHandler.EVENT]: new take_sector_1.TakeSectorHandler(),
    [y_take_sector_1.YTakeSectorHandler.EVENT]: new y_take_sector_1.YTakeSectorHandler(),
    [yr_take_sector_1.YrTakeSectorHandler.EVENT]: new yr_take_sector_1.YrTakeSectorHandler(),
    [battle_take_sector_1.BattleTakeSectorHandler.EVENT]: new battle_take_sector_1.BattleTakeSectorHandler(),
    [battle_y_take_sector_1.BattleYTakeSectorHandler.EVENT]: new battle_y_take_sector_1.BattleYTakeSectorHandler(),
    [battle_yr_take_sector_1.BattleYrTakeSectorHandler.EVENT]: new battle_yr_take_sector_1.BattleYrTakeSectorHandler(),
    [set_user_1.SetUserHandler.EVENT]: new set_user_1.SetUserHandler(),
    [set_citadel_1.SetCitadelHandler.EVENT]: new set_citadel_1.SetCitadelHandler(),
    [use_extraction_1.UseExtractionHandler.EVENT]: new use_extraction_1.UseExtractionHandler(),
    [attraction_1.AttractionHandler.EVENT]: new attraction_1.AttractionHandler(),
    [find_cont_1.FindContHandler.EVENT]: new find_cont_1.FindContHandler(),
    [buy_unit_1.BuyUnitHandler.EVENT]: new buy_unit_1.BuyUnitHandler(),
    [level_up_1.LevelUpHandler.EVENT]: new level_up_1.LevelUpHandler(),
    [new_rank_1.NewRankHandler.EVENT]: new new_rank_1.NewRankHandler(),
    [new_zone_1.NewZoneHandler.EVENT]: new new_zone_1.NewZoneHandler(),
    [limit_1.LimitHandler.EVENT]: new limit_1.LimitHandler(),
    [tutorial_1.TutorialHandler.EVENT]: new tutorial_1.TutorialHandler(),
    [session_1.SessionHandler.EVENT]: new session_1.SessionHandler(),
    [set_health_1.SetHealthHandler.EVENT]: new set_health_1.SetHealthHandler(),
    [set_rating_1.SetRatingHandler.EVENT]: new set_rating_1.SetRatingHandler(),
});
exports.WS.setHandlers(handlers.handle());
