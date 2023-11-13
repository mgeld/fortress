
import { FC } from "react";
import { Circle } from "react-leaflet";
import { TLatLng } from "shared/types";

import { fortModel } from "entities/fort";

import './styles.css'

type FortProps = {
    pos: TLatLng
}

export const AttackFort: FC<FortProps> = ({ pos }) => {

    const data = fortModel.selectors.useTakeFort().data

    if (!data || data?.status === 'defense' || data.fort[0] !== pos[0]) return <></>

    return (
        <Circle
            key={String(Math.random())}
            className={`attack-fort`}
            center={[
                pos[0] - 0.00005,
                pos[1] - 0.00002
            ]}
            pathOptions={{
                fillColor: data?.status === 'victory' ? 'green' : 'red',
                fillOpacity: 0.4,
                stroke: false,
            }}
            radius={30}
        />
    )
}