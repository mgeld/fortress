import { FC } from "react";
import { useMap } from 'react-leaflet'
import { Keyframes } from "shared/ui/Keyframes/Keyframes";
import { fireMapModel } from "..";

import styles from './styles.module.scss'

type GunMapProps = {
}

type TStyle = {
    top: number,
    left: number,
    transform?: string,
    animation: string
}


const GunFires: FC<GunMapProps> = () => {

    const map = useMap()

    const gunFires = fireMapModel.selectors.useGunFire().fires

    return (
        <>
            {gunFires.map(fire => {

                const coords = map.latLngToContainerPoint(fire.from_pos)

                let fireStyle: TStyle = {
                    animation: `gun_${fire.id} 0.5s alternate`,
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
                                name={`gun_${fire.id}`}
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
                                style={fireStyle}
                            />
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default GunFires