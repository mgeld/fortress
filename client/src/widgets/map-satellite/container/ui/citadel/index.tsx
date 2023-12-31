import { alertModel } from "shared/ui/alert";
import { Citadel } from "entities/citadel";
import { droneMapModel } from "entities/pointer";
import { useMap, useMapEvents } from "react-leaflet";
import { popoutModel } from "shared/ui/popout-root";
import { ratingModel } from "widgets/layout-rating";

export const CitadelMap = () => {
    
    const zone = ratingModel.selectors.useSelectZone()

    const size = droneMapModel.selectors.useDroneSize().px

    const eventCitadel = () => {
        popoutModel.events.setPopout('alert')
        alertModel.events.setAlert({
            alert: 'Цитадель',
            message: `Цитадель зоны ${zone?.name}.`,
            action: {
                close: false,
                text: 'Принято',
                _click: () => popoutModel.events.setPopout(null)
            }
        })
    }

    const map = useMap()

    useMapEvents({
        zoomstart: () => {
            map.getPane('zoom-anim-map')?.setAttribute('class', 'zoom-anim-map')

        },
        zoomend: () => {
            setTimeout(() => {
                map.getPane('zoom-anim-map')?.setAttribute('class', 'zoom-anim')
            }, 300);
            
            droneMapModel.events.setSizeDrone()
        },
    }, )

    if(!zone?.latlng) return <></>

    return (
        <Citadel
            pos={zone?.latlng}
            _click={eventCitadel}
            droneSize={size}
        />
    )
}