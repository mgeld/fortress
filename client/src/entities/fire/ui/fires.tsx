import { FC } from "react";
import { fireMapModel } from "..";

import { Fire } from "./fire";

import './l-styles.css'

type FiresMapProps = {
}

// type TStyle = {
//     top: number,
//     left: number,
//     transform?: string,
//     animation: string
// }

const Fires: FC<FiresMapProps> = () => {

    // const map = useMap()

    const fires = fireMapModel.selectors.useFire().fires

    // let sizeFire = 0

    // switch (map.getZoom()) {
    //     case 18:
    //         sizeFire = 30
    //         break
    //     case 17:
    //         sizeFire = 20
    //         break
    //     case 16:
    //         sizeFire = 15
    //         break
    //     case 15:
    //         sizeFire = 10
    //         break
    //     case 14:
    //         sizeFire = 6
    //         break
    //     case 13:
    //         sizeFire = 4
    //         break
    //     case 12:
    //         sizeFire = 2
    //         break
    //     default:
    //         sizeFire = 1
    // }

    return (
        <>
            {fires.map(fire => {
                console.log(`'q' + fire.id`, 'q' + fire.id)
                return (
                    <Fire
                        key={'q' + fire.id}
                        fire={fire}
                    />
                )
            })}
        </>
    )
}

export default Fires






 

















