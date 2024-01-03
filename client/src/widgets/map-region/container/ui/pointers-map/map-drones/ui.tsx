import { FC, useEffect } from "react";
import { Drones } from "../pointers/drones";
import { droneMapModel } from "entities/pointer";
import { UserDrone } from "../user-pointer/drone";
import { popoutModel } from "shared/ui/popout-root";
import { FeatureGroup, Pane, useMap, useMapEvents } from "react-leaflet";

// import { getPlatformNative } from "shared/lib/get-platform-native";
// import { metersToPx } from "shared/lib/metersToPx";

// import { throttle } from "shared/lib/throttle";

export const MapDrones: FC = () => {

    const map = useMap()
    // const zoom = map.getZoom()
    // const posCenterLatLng = map.getCenter()

    const size = droneMapModel.selectors.useDroneSize().px

    useEffect(() => {
        // После возвращения с другой страницы, обновляем
        droneMapModel.events.setSizeDrone()
    }, [])

    // const centerLat = map.getCenter().lat
    
    // const [size, setZise] = useState(metersToPx(centerLat, 30, map.getZoom()))

    useMapEvents({
        zoomstart: () => {
            map.getPane('zoom-anim-map')?.setAttribute('class', 'zoom-anim-map')
        },
        zoomend: () => {
            setTimeout(() => {
                map.getPane('zoom-anim-map')?.setAttribute('class', 'zoom-anim')
            }, 10);

            droneMapModel.events.setSizeDrone()
        }
    }, )

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