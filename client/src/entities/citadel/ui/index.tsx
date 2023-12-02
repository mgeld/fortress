import { FC } from "react";
import { Circle, FeatureGroup } from "react-leaflet";
import { citadelModel } from "entities/citadel";
import { droneMapModel } from "entities/pointer";

import { popoutModel } from "shared/ui/popout-root";
import { alertModel } from "shared/ui/alert";

import './styles.css'

export const Citadel: FC = () => {
    const pos = citadelModel.selectors.useCitadel()?.latlng || [0, 0]

    const size = droneMapModel.selectors.useDroneSize().px * 1.6

    const p = size * 3.14 / 4
    const a = p * 0.3
    const b = p * 0.7

    const dashArrayDroneCircle = `${a} ${b}`
    const weightDroneCircle = Math.ceil(p / 4)

    return (
        <FeatureGroup eventHandlers={{
            click: () => {
                popoutModel.events.setPopout('alert')
                alertModel.events.setAlert({
                    alert: 'Цитадель',
                    message: 'Цитадель - это центр вашей зоны и первый захваченный форт. Куда бы вы не полетели, вы всегда сможете телепортироваться обратно к Цитадели.',
                    action: {
                        close: false,
                        text: 'Принято',
                        _click: () => popoutModel.events.setPopout(null)
                    }
                })
            }
        }}>
            <Circle
                key={1}
                className={`fort black-fort`}
                center={[
                    pos[0] - 0.00010,
                    pos[1] - 0.00002
                ]}
                pathOptions={{
                    fillColor: '#9F9BA8',
                    fillOpacity: 1,
                    stroke: false,
                }}
                radius={30}
            />
            <Circle
                key={2}
                className={`fort fort-stroke`}
                center={pos}
                pathOptions={{
                    fillColor: '#ffffff',
                    fillOpacity: 1,
                    dashArray: dashArrayDroneCircle,
                    weight: weightDroneCircle,

                    opacity: 1,
                    // lineCap: 'round',
                    // lineJoin: "miter",
                    color: '#ffffff'
                }}
                radius={30}
            />
            <Circle
                key={3}
                className={`fort fort-fill`}
                center={pos}
                pathOptions={{
                    fillColor: '#D9D9D9',
                    fillOpacity: 1,
                    stroke: false,
                }}
                radius={26}
            />
            <Circle
                key={4}
                className={`fort fort-flag`}
                center={pos}
                pathOptions={{
                    fillColor: '#8d6a6a',
                    fillOpacity: 1,
                    stroke: true,
                    color: 'white'
                }}
                radius={10}
            />
        </FeatureGroup>
    )

    // return (
    //     <ImageOverlay
    //         url={IconCitadel}
    //         bounds={imageBounds}
    //     />
    // )
}