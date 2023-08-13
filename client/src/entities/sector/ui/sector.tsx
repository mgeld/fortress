import { FC } from "react";
import { cellsToMultiPolygon } from "h3-js";
import { Pane, Polygon, Popup } from "react-leaflet";
import { TZoneItem } from "shared/api/events/sectors";
import { AboutSector } from "./about-sector";

type SectorsProps = {
    zones: TZoneItem[]
}

const colors = {
    1: '#6f302d',
    2: '#132841',
    3: '#746085',
    4: '#37e04d',
    5: '#375ee0',
    6: '#e0379a',
}
const Sectors: FC<SectorsProps> = ({ zones }) => {
    return <>
        {zones.map(zoneItem => {

            console.log('zoneItem.zone.color', zoneItem.zone.color)
            return (
                <Polygon
                    key={zoneItem.zone.zone_id}
                    weight={0.9}
                    pathOptions={{
                        fillColor: colors[zoneItem.zone.color],
                        color: colors[zoneItem.zone.color],
                    }}
                    positions={cellsToMultiPolygon(zoneItem.sectors)}
                >
                    <Pane name={`popup_${zoneItem.zone.zone_id}`} style={{ zIndex: 3006 }}>
                        <Popup
                            key={`${zoneItem.zone.zone_id}`}
                            closeButton={false}
                            maxWidth={200}
                            minWidth={200}
                            keepInView={true}
                        >
                            <AboutSector
                                {...zoneItem.zone}
                            />
                        </Popup>
                    </Pane>
                </Polygon>
            )
        })}
    </>
}

export {
    Sectors
}