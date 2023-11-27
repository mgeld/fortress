import { TSendEvent } from "../../common-types/socket/client-to-server";

export function IsJsonString(str: string): false | TSendEvent {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}