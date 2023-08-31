import Health from "entities/pointer/ui/health"
import { PointIcon } from "entities/pointer/ui/point-icon"
import { userModel } from "entities/user"
import RecoverDroneButton from "features/user/recover-drone-button/ui"
import { FC } from "react"

const UserPoint: FC = () => {

    const { userId, pos, health, userIcon, userName } = userModel.selectors.useUser()

    return (
        <>
            {health > 0 ? (
                <Health
                    position={pos}
                    health={health}
                />
            ) : (
                <RecoverDroneButton position={pos} />
            )}
            <PointIcon
                position={pos}
                userIcon={userIcon || ''}
                userName={userName || ''}
            />
        </>
    )


}

export { UserPoint }