import { MapRang } from "entities/user/ui/map-rang";
import { FC } from "react";
import { Counters } from "widgets/counters/counters";
import { MapBottom } from "widgets/map-bottom";
import { NavBattle, NavBooty, NavShop } from "widgets/map-buttons";
import { NavMenu } from "widgets/map-buttons/menu";
import MapLayout from "widgets/map-layout/ui/map-layout";

export const MapPage: FC = () => {
    return (
        <div className='mapPage'>
            <NavBooty />

            <NavShop />

            <NavBattle />

            <NavMenu />

            <MapRang />

            <Counters />

            <MapLayout />

            <MapBottom />
        </div>
    )
}