import { mapModel } from "entities/map";
import { Grid } from "entities/map/ui/grid";
import { FC } from "react";
import { useMapEvent } from "react-leaflet";
import { TLatLng } from "shared/types";

type GridProps = {
    pos: TLatLng
}

export const GridMap: FC<GridProps> = ({ pos }) => {
    
    // const pos = shipModel.selectors.useShipPos()

    const isGrid = mapModel.selectors.useMapGrid()

    useMapEvent('dblclick', (e) => {
        console.log('dblclick')
        mapModel.events.setMapGrid()
    })

    // console.log('isGrid', isGrid)

    if(!isGrid) return <></>

    return (
        <Grid pos={pos} />
    )
}