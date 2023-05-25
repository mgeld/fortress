import { Handlers, THandlers } from "shared/api/handlers"
import { BattleStartHandler } from "shared/api/handlers/battle-start"
import { ConnectHandler } from "shared/api/handlers/connect"
import { ConnectPointerHandler } from "shared/api/handlers/connect-pointer"
import { DelPointerHandler } from "shared/api/handlers/del-pointer"
import { DirectPointerHandler } from "shared/api/handlers/direct"
import { FireHandler } from "shared/api/handlers/fire"
import { PointersHandler } from "shared/api/handlers/pointers"
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
    [FireHandler.EVENT]: new FireHandler(),
    [BattleStartHandler.EVENT]: new BattleStartHandler(),
} as THandlers

const handlers = new Handlers(callbacks)

WS.setHandlers(handlers.handle())

// Ты думал, как назвать входящие и исходящие запросы в сокетах..............