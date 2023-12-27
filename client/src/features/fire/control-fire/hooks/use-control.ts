import { fireControl } from "../model"
import { useEffect, useRef } from "react"
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick"

export const useControl = () => {

    const moveId = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
        return () => {
            clearTimeout(moveId.current);
        }
    }, [])

    const moveControl = (e: IJoystickUpdateEvent) => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined
        }
        fireControl(e)
        moveId.current = setInterval(() => fireControl(e), 550)
    }

    const stopFire = () => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined
        }
    }

    return {
        stopFire,
        moveControl
    }
}