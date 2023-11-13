import { cellToLatLng, latLngToCell } from "h3-js";
import { FC } from "react";
import { Circle, FeatureGroup } from "react-leaflet";
import { TLatLng } from "shared/types";

import './styles.css'
import { fortModel } from "entities/fort";

type FortProps = {
    pos: TLatLng
}

export const Fort: FC<FortProps> = ({ pos }) => {
    
    // if(!data) return <></>

    return (
        <FeatureGroup eventHandlers={{
            click: () => {
                fortModel.events.setFort(pos)

                setTimeout(() => {
                    fortModel.events.setFort(null)
                }, 3000)
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
                    stroke: false,
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
        </FeatureGroup>
    )
}