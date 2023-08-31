import { FC } from "react";
import { bombMapModel } from "..";

import { Bomb } from "./bomb";

type FiresMapProps = {
}

// type TStyle = {
//     top: number,
//     left: number,
//     transform?: string,
//     animation: string
// }

const Bombs: FC<FiresMapProps> = () => {

    // const map = useMap()

    const bombs = bombMapModel.selectors.useBomb().bombs

    return (
        <>
            {bombs.map(bomb => {
                return (
                    <Bomb
                        key={'q' + bomb.id}
                        bomb={bomb}
                    />
                )
            })}
        </>
    )
}

export default Bombs






 

















