import { Handlers, THandlers } from "shared/api/handlers"
import { ConnectPointerHandler } from "shared/api/handlers/connect-pointer"
import { DirectPointerHandler } from "shared/api/handlers/direct-pointer"
import { FireHandler } from "shared/api/handlers/fire"
import { PointersHandler } from "shared/api/handlers/pointers"
import { Socket } from "shared/api/socket"

export const WS = new Socket()

const events = {
    [ConnectPointerHandler.EVENT]: new ConnectPointerHandler(),
    [DirectPointerHandler.EVENT]: new DirectPointerHandler(),
    [PointersHandler.EVENT]: new PointersHandler(),
    [FireHandler.EVENT]: new FireHandler()
} as THandlers

const handlers = new Handlers(events)

WS.getDataHandlers(handlers.handle())

// Ты думал, как назвать входящие и исходящие запросы в сокетах..............