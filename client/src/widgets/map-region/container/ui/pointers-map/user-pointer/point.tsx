import Health from "entities/pointer/ui/health"
import Name from "entities/pointer/ui/name"
import { PointIcon } from "entities/pointer/ui/point-icon"
import { shipModel } from "entities/ship"
import { userModel } from "entities/user"
import RecoverDroneButton from "features/ship/recover-drone-button/ui"
import { FC } from "react"

const UserPoint: FC = () => {

    const { userIcon, userName } = userModel.selectors.useUser()

    const pos = shipModel.selectors.useShipPos()
    const health = shipModel.selectors.useShipHealth()
    const lvl = shipModel.selectors.useShipLevel()

    return (
        <>
            {health > 0 ? (
                <Health
                    lvl={lvl}
                    position={pos}
                    health={health}
                />
            ) : (
                <RecoverDroneButton position={pos} />
            )}
            <Name
                position={pos}
                name={userName || 'Вы'}
            />
            <PointIcon
                position={pos}
                userIcon={userIcon || ''}
            />
        </>
    )


}

export { UserPoint }