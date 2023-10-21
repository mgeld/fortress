import { TPointer } from "@ctypes/model"
import { TJoystickDirection } from "shared/types"

let left_lat = (a: TPointer, b: TPointer) => b.pos[1] - a.pos[1]
let right_lat = (a: TPointer, b: TPointer) => a.pos[1] - b.pos[1]
let forward_long = (a: TPointer, b: TPointer) => a.pos[0] - b.pos[0]
let backword_long = (a: TPointer, b: TPointer) => b.pos[0] - a.pos[0]

export const comparePos = (direction: TJoystickDirection | null) => {
    switch (direction) {
        case 'FORWARD':
            return forward_long
        case 'BACKWARD':
            return backword_long
        case 'LEFT':
            return left_lat
        case 'RIGHT':
            return right_lat
    }
}