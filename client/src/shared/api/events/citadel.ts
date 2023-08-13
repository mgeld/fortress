import { TCitadel } from "@ctypes/socket/server-to-client";
import { createEvent } from "effector";

const setCitadel = createEvent<TCitadel>()

export const events = {
    setCitadel
}