import { FC } from "react";
import { cellsToMultiPolygon } from "h3-js";
import { AboutSector } from "./about-sector";
import { Pane, Polygon, Popup } from "react-leaflet";
import { sectorColorList } from "../lib/sector-color-list";
import { TZoneItem } from "@ctypes/model";

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

    const sectors = Object.values(zoneItem.sectors)

    let combinedAreas = sectors.reduce((acc, curr) => {
        return acc.concat(curr);
    }, []);

    return (
        <Polygon
            key={zoneItem.zone.zone_id}
            weight={0.9}
            pathOptions={{
                fillOpacity,
                fillColor: sectorColorList[color],
                color: sectorColorList[color],
            }}
            positions={cellsToMultiPolygon(combinedAreas)}
        >
            <Pane
                name={`popup_${zoneItem.zone.zone_id}`}
                style={{ zIndex: 3006 }}>
                <Popup
                    key={`${zoneItem.zone.zone_id}`}
                    closeButton={true}
                    maxWidth={200}
                    minWidth={200}
                    keepInView={false}
                >
                    <AboutSector />
                </Popup>
            </Pane>
        </Polygon>
    )
}

export {
    Sectors
}