import { FC, useState } from "react"
import { pointIcon } from "widgets/map-layout/lib/point-icon"
import { Marker } from "react-leaflet";
import { createPointer } from "../lib/create-pointer";
import { TLatLng } from "shared/types";

type TPointIconProps = {
    userName: string
    userIcon: string
    position: TLatLng
}

export const PointIcon: FC<TPointIconProps> = ({
    userName,
    userIcon,
    position
}) => {

    const [icon, setIcon] = useState<string | null>(null)

    if (!icon && userIcon) {
        console.log('Чё как? icon userIcon', icon, userIcon)
        createPointer(userName, userIcon)
            .then(icon => {
                setIcon(icon)
            })
    }

    if (!icon) return <></>

    let iconPoint = pointIcon(icon)

    return (
        <Marker
            position={position}
            icon={iconPoint}
        />
    )
}