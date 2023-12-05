import { FC } from "react";
import { cellsToMultiPolygon } from "h3-js";
import { Pane, Polygon, Popup } from "react-leaflet";
import { TZoneItem } from "shared/api/events/sectors";
import { AboutSector } from "./about-sector";
import { sectorColorList } from "../lib/sector-color-list";

type SectorsProps = {
    zoneItem: TZoneItem
    color: number
    fillOpacity: number
}

const Sectors: FC<SectorsProps> = ({
    zoneItem,
    fillOpacity,
    color
}) => {

    return (
        <Polygon
            key={zoneItem.zone.zone_id}
            weight={0.9}
            pathOptions={{
                fillOpacity,
                fillColor: sectorColorList[color],
                color: sectorColorList[color],
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
}

export {
    Sectors
}