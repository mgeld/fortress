import { useEffect, useRef, useState } from "react"

export const useHitFirePointer = (health: number) => {
    const [fireHitTarget, setFireHitTarget] = useState(false)

    const initFireHitTarget = useRef(0)

    useEffect(() => {
        if (initFireHitTarget.current) {
            setFireHitTarget(true)
            setTimeout(() => setFireHitTarget(false), 250)
        } else {
            initFireHitTarget.current = 1
        }
    }, [health])

    return {
        fireHitTarget
    }
}