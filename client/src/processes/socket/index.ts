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
import { Socket } from "shared/api/socket"
import { events as socket } from "shared/api/socket/model"
import { API_BASE_URL } from "shared/config"

export const WS = new Socket(API_BASE_URL, socket.setSocketStatus)

const callbacks = {
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
    [YTakeSectorHandler.EVENT]: new YTakeSectorHandler(),
    [YrTakeSectorHandler.EVENT]: new YrTakeSectorHandler(),
    [TakeSectorHandler.EVENT]: new TakeSectorHandler(),
    [SetUserHandler.EVENT]: new SetUserHandler(),
    [SetCitadelHandler.EVENT]: new SetCitadelHandler(),
    [UseExtractionHandler.EVENT]: new UseExtractionHandler(),
    [AttractionHandler.EVENT]: new AttractionHandler(),
    [FindContHandler.EVENT]: new FindContHandler(),
    [BuyUnitHandler.EVENT]: new BuyUnitHandler(),
} as THandlers

const handlers = new Handlers(callbacks)

WS.setHandlers(handlers.handle())

// Ты думал, как назвать входящие и исходящие запросы в сокетах..............