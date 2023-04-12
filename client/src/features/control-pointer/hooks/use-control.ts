import { userModel } from "entities/user";
import { useEffect, useRef } from "react";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { direct } from "shared/api/direct";

export const useControl = () => {

    const moveId = useRef<ReturnType<typeof setTimeout>>()

    const { movePoint } = userModel.events

    const { pos, userId } = userModel.useUser()

    useEffect(() => {
        return () => {
            clearTimeout(moveId.current);
        }
    }, [])

    useEffect(() => {

        console.log('useEffect position', pos)

        direct(pos, userId)

        // const timeId = setTimeout(() => socket?.send(JSON.stringify({
        //     position,
        //     userId,
        //     event: 'direction'
        // })), 1000)

        // return () => {
        //     clearTimeout(timeId)
        // }

    }, [pos, userId])

    const moveControl = (e: IJoystickUpdateEvent) => {
        if (moveId.current) {
            clearTimeout(moveId.current);

            moveId.current = undefined
        }
        movePoint({ type: e.direction })
        moveId.current = setInterval(() => movePoint({ type: e.direction }), 200)
    }

    // const movePoint = (direction: TJoystickDirection | null) => {
    //     setPosition({ type: direction })
    // }

    const stopPoint = () => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined
        }
    }

    return {
        stopPoint,
        moveControl
    }
}