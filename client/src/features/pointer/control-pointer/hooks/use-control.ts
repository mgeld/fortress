import { useEffect, useRef } from "react";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { direction } from "../model";

export const useControl = () => {

    const moveId = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
        return () => {
            // clearTimeout(moveId.current);
            stopPoint()
        }
    }, [])

    const moveControl = (e: IJoystickUpdateEvent) => {

        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined
        }
        direction(e.direction)

        moveId.current = setInterval(() => direction(e.direction), 200)
    }

    const stopPoint = () => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined
        }
    }

    // useEffect(() => {
    //     if(health < 1) {
    //         stopPoint()
    //     }
    // }, [health])

    return {
        stopPoint,
        moveControl
    }
}