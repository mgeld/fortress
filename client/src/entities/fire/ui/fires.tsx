import { FC } from "react";
import { useMap } from 'react-leaflet'
import { Keyframes } from "shared/ui/Keyframes/Keyframes";
import { fireMapModel } from "..";

import styles from './styles.module.scss'

type FiresMapProps = {
}

type TStyle = {
    top: number,
    left: number,
    transform?: string,
    animation: string
}

const Fires: FC<FiresMapProps> = () => {

    const map = useMap()

    const fires = fireMapModel.selectors.useFire().fires

    let sizeFire = 0

    switch (map.getZoom()) {
        case 18:
            sizeFire = 30
            break
        case 17:
            sizeFire = 20
            break
        case 16:
            sizeFire = 15
            break
        case 15:
            sizeFire = 10
            break
        case 14:
            sizeFire = 6
            break
        case 13:
            sizeFire = 4
            break
        case 12:
            sizeFire = 2
            break
        default:
            sizeFire = 1
    }

    return (
        <>
            {fires.map(fire => {

                const coords = map.latLngToContainerPoint(fire.from_pos)

                let fireStyle: TStyle = {
                    animation: `fire_${fire.id} 0.5s alternate`,
                    top: coords.y,
                    left: coords.x
                }

                if (fire.direction === 'BACKWARD' || fire.direction === 'FORWARD') {
                    let px_to_pos = map.project(fire?.hit_pos || fire.to_pos).y - map.project(fire.from_pos).y
                    fireStyle['transform'] = `translate3d(0px, ${px_to_pos}px, 0px)`
                } else {
                    let px_to_pos = map.project(fire?.hit_pos || fire.to_pos).x - map.project(fire.from_pos).x
                    fireStyle['transform'] = `translate3d(${px_to_pos}px, 0px, 0px)`
                }

                return (
                    <>
                        <div key={fire.id}>
                            <Keyframes
                                name={`fire_${fire.id}`}
                                from={{
                                    transition: 'transform 1s',
                                    transform: 'translate3d(0px, 0px, 0px)'
                                }}
                                to={{
                                    transition: 'transform 1s',
                                    transform: fireStyle['transform']
                                }}
                            />
                            <div
                                className={`${styles.__fire} ${fire.id}`}
                                style={{
                                    ...fireStyle,
                                    width: `${sizeFire}px`,
                                    height: `${sizeFire}px`,
                                }}
                            />
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default Fires