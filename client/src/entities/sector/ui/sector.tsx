import { FC } from "react";
import { cellsToMultiPolygon } from "h3-js";
import { Pane, Polygon, Popup } from "react-leaflet";
import { TZoneItem } from "shared/api/events/sectors";
import { AboutSector } from "./about-sector/ui";

type SectorsProps = {
    zones: TZoneItem[]
}

const colors = {
    1: '#b670d1',
    2: '#b670d1',
    3: '#b670d1',
    4: '#b670d1',
    5: '#b670d1',
    6: '#b670d1',
}

const Sectors: FC<SectorsProps> = ({ zones }) => {
    return <>
        {zones.map(zoneItem => {

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
                                // {...zoneItem.zone}
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