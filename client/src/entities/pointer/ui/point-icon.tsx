import { FC, useState } from "react"
import { Marker } from "react-leaflet";
import { createPointer } from "../lib/create-pointer";
import { TLatLng } from "shared/types";
import { pointIcon } from "../lib/point-icon";

type TPointIconProps = {
    userIcon: string
    position: TLatLng
}

export const PointIcon: FC<TPointIconProps> = ({
    userIcon,
    position
}) => {

    const [icon, setIcon] = useState<string | null>(null)

    if (!icon && userIcon) {
        createPointer(userIcon)
            .then(icon => {
                setIcon(icon)
            })
            .catch(icon => {
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