import { FC } from "react"
import { Rectangle } from "react-leaflet"
import { TLatLng } from "shared/types"

type TArealBorderProps = {
    areal: [TLatLng, TLatLng]
}
const ArealBorder: FC<TArealBorderProps> = ({ areal }) => {

    return (
        <>
            <Rectangle
                bounds={[
                    [areal[0][0] - 0.01, areal[0][1]],
                    [areal[1][0] + 0.01, areal[0][1] - 0.01],
                ]}
                pathOptions={{
                    fillColor: '#473c3c',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            />
            <Rectangle
                bounds={[
                    [areal[1][0], areal[0][1]],
                    [areal[1][0] + 0.01, areal[1][1]],
                ]}
                pathOptions={{
                    fillColor: '#473c3c',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            />
            <Rectangle
                bounds={[
                    [areal[0][0] - 0.01, areal[1][1]],
                    [areal[1][0] + 0.01, areal[1][1] + 0.01],
                ]}
                pathOptions={{
                    fillColor: '#473c3c',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            />
            <Rectangle
                bounds={[
                    [areal[0][0], areal[0][1]],
                    [areal[0][0] - 0.01, areal[1][1]],
                ]}
                pathOptions={{
                    fillColor: '#473c3c',
                    fillOpacity: 0.2,
                    stroke: false
                }}
            />


            {/* <Rectangle
                bounds={[
                    [areal[0][0] - 0.002, areal[0][1] - 0.002],
                    [areal[1][0] + 0.002, areal[1][1] + 0.002],
                ]}
                pathOptions={{
                    color: 'black',
                    fillOpacity: 0,
                    opacity: 0.4,
                    weight: 50,
                }}
                weight={1}
            /> */}
        </>
    )
}

export { ArealBorder }