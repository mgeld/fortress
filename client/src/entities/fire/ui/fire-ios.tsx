import { FC } from "react";
import { useMap } from "react-leaflet";
import { TFire } from "../model/fire";

import { Keyframes } from "shared/ui/Keyframes/Keyframes";
import { droneMapModel } from "entities/pointer";

import styles from './styles.module.scss'

type TFireProps = {
    fire: TFire
}
type TStyle = {
    top: number,
    left: number,
    transform?: string,
    animation?: string
}

export const FireIOS: FC<TFireProps> = ({
    fire
}) => {

    let sizeFire = droneMapModel.selectors.useDroneSize() * 0.6

    const map = useMap()

    const coords = map.latLngToContainerPoint(fire.from_pos)

    let fireStyle: TStyle = {
        top: coords.y - sizeFire / 2,
        left: coords.x - sizeFire / 2
    }

    let time_fire = 0

    let posImpact = fire?.hit_pos || fire.to_pos

    if (fire.direction === 'BACKWARD' || fire.direction === 'FORWARD') {
        time_fire = Math.floor((posImpact[0] - fire.from_pos[0]) * 1000)
        let px_to_pos = map.project(posImpact).y - map.project(fire.from_pos).y
        fireStyle['transform'] = `translate3d(0px, ${px_to_pos}px, 0px)`
    } else {
        time_fire = Math.floor((posImpact[1] - fire.from_pos[1]) * 1000)
        let px_to_pos = map.project(posImpact).x - map.project(fire.from_pos).x
        fireStyle['transform'] = `translate3d(${px_to_pos}px, 0px, 0px)`
    }

    fireStyle.animation = `fire_${fire.id} ${Math.abs(time_fire) / 10}s alternate`

    return (
        <>
            <div key={fire.id}>
                <Keyframes
                    name={`fire_${fire.id}`}
                    from={{
                        transform: 'translate3d(0px, 0px, 0px)',
                    }}
                    to={{
                        transform: fireStyle['transform'],
                    }}
                />
                <div
                    className={`${styles.__fire}`}
                    style={{
                        ...fireStyle,
                        width: `${sizeFire}px`,
                        height: `${sizeFire}px`
                    }}
                />
            </div>
        </>
    )
}