import { Handlers, THandlers } from "shared/api/handlers"
import { AttractionHandler } from "shared/api/handlers/attraction"
import { BattleJoinHandler } from "shared/api/handlers/battle-join"
import { BattleOverHandler } from "shared/api/handlers/battle-over"
import { BattleStartHandler } from "shared/api/handlers/battle-start"
import { BombHandler } from "shared/api/handlers/bomb"
import { BuyUnitHandler } from "shared/api/handlers/buy-unit"
import { ConnectHandler } from "shared/api/handlers/connect"
import { ConnectPointerHandler } from "shared/api/handlers/connect-pointer"
import { DelPointerHandler } from "shared/api/handlers/del-pointer"
import { DirectPointerHandler } from "shared/api/handlers/direct"
import { FindContHandler } from "shared/api/handlers/find-cont"
import { FireHandler } from "shared/api/handlers/fire"
import { LevelUpHandler } from "shared/api/handlers/level-up"
import { LimitHandler } from "shared/api/handlers/limit"
import { NewRankHandler } from "shared/api/handlers/new-rank"
import { NewZoneHandler } from "shared/api/handlers/new-zone"
import { PointersHandler } from "shared/api/handlers/pointers"
import { SectorHandler } from "shared/api/handlers/sector"
import { SectorsHandler } from "shared/api/handlers/sectors"
import { SetCitadelHandler } from "shared/api/handlers/set-citadel"
import { SetUserHandler } from "shared/api/handlers/set-user"
import { TakeHandler } from "shared/api/handlers/take"
import { TakeHitHandler } from "shared/api/handlers/take-hit"
import { TakeSectorHandler } from "shared/api/handlers/take-sector"
import { UseExtractionHandler } from "shared/api/handlers/use-extraction"
import { YTakeSectorHandler } from "shared/api/handlers/y-take-sector"
import { YrTakeSectorHandler } from "shared/api/handlers/yr-take-sector"

// import { Socket } from "shared/api/socket"

import { API_BASE_URL } from "shared/config"
import { socketModel } from "shared/api/socket"
import { Socket } from "shared/api/socket/socket"
import { TutorialHandler } from "shared/api/handlers/tutorial"
import { BattleTakeSectorHandler } from "shared/api/handlers/battle-take-sector"
import { BattleYTakeSectorHandler } from "shared/api/handlers/battle-y-take-sector"
import { BattleYrTakeSectorHandler } from "shared/api/handlers/battle-yr-take-sector"
import { SessionHandler } from "shared/api/handlers/session"
import { SetHealthHandler } from "shared/api/handlers/set-health"
import { SetRatingHandler } from "shared/api/handlers/set-rating"
import { RewardHandler } from "shared/api/handlers/reward"
import { SessionDestroyHandler } from "shared/api/handlers/session-destroy"
import { EditZoneHandler } from "shared/api/handlers/edit-zone"
import { DelExtractionHandler } from "shared/api/handlers/del-extraction"

export const WS = Socket.create(API_BASE_URL, socketModel.events.setSocketStatus)

// WS.connect()

// const callbacks = {
//     [ConnectHandler.EVENT]: new ConnectHandler(),
//     [ConnectPointerHandler.EVENT]: new ConnectPointerHandler(),
//     [DelPointerHandler.EVENT]: new DelPointerHandler(),
//     [DirectPointerHandler.EVENT]: new DirectPointerHandler(),
//     [PointersHandler.EVENT]: new PointersHandler(),
//     [TakeHandler.EVENT]: new TakeHandler(),
//     [BattleStartHandler.EVENT]: new BattleStartHandler(),
//     [BattleOverHandler.EVENT]: new BattleOverHandler(),
//     [FireHandler.EVENT]: new FireHandler(),
//     [BombHandler.EVENT]: new BombHandler(),
//     [BattleJoinHandler.EVENT]: new BattleJoinHandler(),
//     [SectorsHandler.EVENT]: new SectorsHandler(),
//     [SectorHandler.EVENT]: new SectorHandler(),
//     [TakeHitHandler.EVENT]: new TakeHitHandler(),
//     [YTakeSectorHandler.EVENT]: new YTakeSectorHandler(),
//     [YrTakeSectorHandler.EVENT]: new YrTakeSectorHandler(),
//     [TakeSectorHandler.EVENT]: new TakeSectorHandler(),
//     [SetUserHandler.EVENT]: new SetUserHandler(),
//     [SetCitadelHandler.EVENT]: new SetCitadelHandler(),
//     [UseExtractionHandler.EVENT]: new UseExtractionHandler(),
//     [AttractionHandler.EVENT]: new AttractionHandler(),
//     [FindContHandler.EVENT]: new FindContHandler(),
//     [BuyUnitHandler.EVENT]: new BuyUnitHandler(),
//     [LevelUpHandler.EVENT]: new LevelUpHandler(),
//     [NewRankHandler.EVENT]: new NewRankHandler(),
//     [NewZoneHandler.EVENT]: new NewZoneHandler(),
// } as THandlers

const handlers = new Handlers({
    [ConnectHandler.EVENT]: new ConnectHandler(),
    [ConnectPointerHandler.EVENT]: new ConnectPointerHandler(),
    [DelPointerHandler.EVENT]: new DelPointerHandler(),
    [DirectPointerHandler.EVENT]: new DirectPointerHandler(),
    [PointersHandler.EVENT]: new PointersHandler(),
    [TakeHandler.EVENT]: new TakeHandler(),
    [BattleStartHandler.EVENT]: new BattleStartHandler(),
    [BattleOverHandler.EVENT]: new BattleOverHandler(),
    [FireHandler.EVENT]: new FireHandler(),
    [BombHandler.EVENT]: new BombHandler(),
    [BattleJoinHandler.EVENT]: new BattleJoinHandler(),
    [SectorsHandler.EVENT]: new SectorsHandler(),
    [SectorHandler.EVENT]: new SectorHandler(),
    [TakeHitHandler.EVENT]: new TakeHitHandler(),

    [TakeSectorHandler.EVENT]: new TakeSectorHandler(),
    [YTakeSectorHandler.EVENT]: new YTakeSectorHandler(),
    [YrTakeSectorHandler.EVENT]: new YrTakeSectorHandler(),

    [BattleTakeSectorHandler.EVENT]: new BattleTakeSectorHandler(),
    [BattleYTakeSectorHandler.EVENT]: new BattleYTakeSectorHandler(),
    [BattleYrTakeSectorHandler.EVENT]: new BattleYrTakeSectorHandler(),

    [SetUserHandler.EVENT]: new SetUserHandler(),
    [SetCitadelHandler.EVENT]: new SetCitadelHandler(),
    [UseExtractionHandler.EVENT]: new UseExtractionHandler(),
    [AttractionHandler.EVENT]: new AttractionHandler(),
    [FindContHandler.EVENT]: new FindContHandler(),
    [BuyUnitHandler.EVENT]: new BuyUnitHandler(),
    [LevelUpHandler.EVENT]: new LevelUpHandler(),
    [NewRankHandler.EVENT]: new NewRankHandler(),
    [NewZoneHandler.EVENT]: new NewZoneHandler(),
    [LimitHandler.EVENT]: new LimitHandler(),
    [TutorialHandler.EVENT]: new TutorialHandler(),
    [SessionHandler.EVENT]: new SessionHandler(),
    [SessionDestroyHandler.EVENT]: new SessionDestroyHandler(),
    [SetHealthHandler.EVENT]: new SetHealthHandler(),
    [SetRatingHandler.EVENT]: new SetRatingHandler(),
    [RewardHandler.EVENT]: new RewardHandler(),
    [EditZoneHandler.EVENT]: new EditZoneHandler(),
    [DelExtractionHandler.EVENT]: new DelExtractionHandler(),
} as THandlers)

WS.setHandlers(handlers.handle())

// Ты думал, как назвать входящие и исходящие запросы в сокетах..............