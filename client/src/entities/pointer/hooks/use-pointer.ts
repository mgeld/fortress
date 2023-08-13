import { useEffect, useState } from "react"
import { createPointer } from "../lib/create-pointer"

export type TUserPointIcon = {
    icon: string
    load: true
} | {
    icon: null
    load: false
}

export const usePointer = () => {

    const [point, setPoint] = useState<TUserPointIcon>({
        icon: null,
        load: false
    })

    useEffect(() => {
        async function fetchData() {
            let IconUserPoint = await createPointer('Musa G', '')
            setPoint({
                icon: IconUserPoint,
                load: true
            })
        }
        setTimeout(() => fetchData(), 50)
    }, [])

    return { point }

}