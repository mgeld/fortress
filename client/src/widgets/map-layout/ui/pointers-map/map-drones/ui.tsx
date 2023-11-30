import { FC } from "react";
import { FeatureGroup, Pane, useMap, useMapEvents } from "react-leaflet";
import { UserDrone } from "../user-pointer/drone";
import { Drones } from "../pointers/drones";
import { droneMapModel } from "entities/pointer";
import { popoutModel } from "shared/ui/popout-root";
// import { throttle } from "shared/lib/throttle";

export const MapDrones: FC = () => {

    const map = useMap()
    // const zoom = map.getZoom()
    // const posCenterLatLng = map.getCenter()

    const size = droneMapModel.selectors.useDroneSize().px

    useMapEvents({
        zoomstart: () => {
            map.getPane('zoom-anim-map')?.setAttribute('class', 'zoom-anim-map')

        },
        zoomend: () => {
            setTimeout(() => {
                map.getPane('zoom-anim-map')?.setAttribute('class', 'zoom-anim')
            }, 300);
        },
        zoom: () => {
            droneMapModel.events.setSizeDrone()
        },
    }, )

    console.log('MapDrones')

    const onShip = () => {
        popoutModel.events.setPopout('ship')
    }

    return (
        <Pane name={`drones`} style={{ zIndex: 3001 }}>
            <FeatureGroup
                eventHandlers={{
                    click: onShip
                }}>

                <UserDrone size={size} />
            </FeatureGroup>
            <Drones size={size} />
        </Pane>
    )
}