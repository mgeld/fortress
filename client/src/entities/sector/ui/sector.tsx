import { FC } from "react";
import { cellsToMultiPolygon } from "h3-js";
import { Pane, Polygon, Popup } from "react-leaflet";
import { TZoneItem } from "shared/api/events/sectors";
import { AboutSector } from "./about-sector";
// import { AboutSector } from "./about-sector/ui";

type SectorsProps = {
    zones: TZoneItem[]
}

const colors = {
    1: '#de89ff',
    2: '#ff8686',
    3: '#559ffa',
    4: '#63ce7a',
    5: '#fd7ec8',
    6: '#9d9cff',
    // 1: '#de89ff',
    // 2: '#de89ff',
    // 3: '#de89ff',
    // 4: '#de89ff',
    // 5: '#de89ff',
    // 6: '#de89ff',
    // 6: '#b670d1',
}

const Sectors: FC<SectorsProps> = ({ zones }) => {

    return <>
        {zones.map(zoneItem => {

            // console.log('zoneItem.zone.zone_id', zoneItem.zone.zone_id)

            // Временно
            let color = zoneItem.zone.zone_id > 2 ? 1 : zoneItem.zone.color
            
            return (
                <Polygon
                    key={zoneItem.zone.zone_id}
                    weight={0.9}
                    pathOptions={{
                        // fillOpacity: 0.3,
                        fillColor: colors[color],
                        color: colors[color],
                    }}
                    positions={cellsToMultiPolygon(zoneItem.sectors)}
                >
                    <Pane name={`popup_${zoneItem.zone.zone_id}`} style={{ zIndex: 3006 }}>
                        <Popup
                            key={`${zoneItem.zone.zone_id}`}
                            closeButton={false}
                            maxWidth={200}
                            minWidth={200}
                            keepInView={false}
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