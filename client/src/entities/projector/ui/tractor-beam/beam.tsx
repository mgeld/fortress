import { FC, useEffect, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import { Keyframes } from "shared/ui/Keyframes/Keyframes";

import { droneMapModel } from "entities/pointer";

import { TBeam } from "entities/projector/model/tractor-beam";

import './styles.css'
import { shipModel } from "entities/ship";

type TStyle = {
    transition?: string,
    animation: string
}


type TBeamProps = {
    beam: TBeam
}

export const Beam: FC<TBeamProps> = ({ beam }) => {

    let sizeDrone = droneMapModel.selectors.useDroneSize()

    const myPos = shipModel.selectors.useShipPos()

    const map = useMap()

    const [invader, setInvader] = useState({
        from: map.latLngToLayerPoint(myPos),
        to: map.latLngToLayerPoint(beam.to_pos)
    })

    useEffect(() => {
        console.log('useEffectuseEffectuseEffectuseEffectuseEffect')
        setInvader({
            from: map.latLngToLayerPoint(myPos),
            to: map.latLngToLayerPoint(beam.to_pos)
        })
    }, [myPos, beam.to_pos, map])

    const __ = useMapEvents({
        zoomend: () => setInvader({
            from: map.latLngToLayerPoint(myPos),
            to: map.latLngToLayerPoint(beam.to_pos)
        }),
    })


    let takeStyle: TStyle = {
        animation: `beam 0.5s linear`,
    }

    const a1 = Math.pow(Math.abs(invader.from.x - invader.to.x), 2);
    const a2 = Math.pow(Math.abs(invader.from.y - invader.to.y), 2);

    const dist = Math.sqrt(a1 + a2);

    let angle = Math.atan2(invader.to.y - invader.from.y, invader.to.x - invader.from.x) * (180 / Math.PI)

    return (
        <>
            <Keyframes
                name={`beam`}
                _0={{
                    borderRight: '0px'
                }}
                _100={{
                    borderRight: `${dist}px solid #fafd079e`
                }}
            />
            <div
                className="beam-block"
                style={{
                    top: `${invader.from.y}px`,
                    left: `${invader.from.x}px`,
                    width: `${sizeDrone}px`,
                    height: `${sizeDrone}px`,
                    marginTop: `-${(sizeDrone / 2)}px`,
                    marginLeft: `-${(sizeDrone / 2)}px`,
                    transform: `rotate(${angle}deg)`
                }}>
                <div className="beam-box">
                    <div
                        className='beam'
                        style={{
                            ...takeStyle,
                            // width: '20px',
                            // height: '20px',
                            border: `${sizeDrone}px solid transparent`,
                            borderRight: `${dist}px solid #f9fd0777`,
                            marginTop: `-${(sizeDrone / 2)}px`,
                            marginLeft: `-0px`,
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export { }