import { citadelModel } from "entities/citadel"
import { Citadel } from "entities/citadel";
import { droneMapModel } from "entities/pointer";
import { alertModel } from "shared/ui/alert";
import { popoutModel } from "shared/ui/popout-root";

export const CitadelMap = () => {
    
    const pos = citadelModel.selectors.useCitadel()?.latlng || [0, 0]
    
    const size = droneMapModel.selectors.useDroneSize().px

    const eventCitadel = () => {
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

    return (
        <Citadel
            pos={pos}
            _click={eventCitadel}
            droneSize={size}
        />
    )
}