import 'app/assets/styles/leaflet.css'
import 'app/assets/styles/App.scss'

import {  PopoutRoot, popoutModel } from 'shared/ui/popout-root'
import { Popout } from 'shared/ui/popout'
import { BattlePending } from 'entities/arena/ui/battle-pending'

import { UserDead } from 'entities/user/ui/user-dead'
import { SelectPlace } from 'features/user/select-place/ui/popout'

import { BattleOver } from 'entities/arena'
import { ShipPopout } from 'entities/ship/ui'
import { StormCorpsPopout } from 'entities/storm-corps/ui'
import { GunPopout } from 'entities/weapon/ui'
import { GunImproveDistance } from 'features/weapon/gun-improve-distance/ui'
import { GunImprovePower } from 'features/weapon/gun-improve-power/ui'
import { Panel } from 'widgets/panel/ui'
import { ExtractionPopout } from 'features/unit/use-extraction/ui'
import { BuyUnit } from 'features/unit/buy-unit/ui'
import { StormAddInvaders } from 'features/storm-corps/storm-add-invaders/ui'
import { StormImprovePower } from 'features/storm-corps/storm-improve-power/ui'
import { ShipImproveHealth } from 'features/ship/ship-improve-health/ui'
import { HoldPopout } from 'entities/hold/ui/hold'
import { ShipLevelUp } from 'features/ship/ship-level-up/ui'
import { GunLevelUp } from 'features/weapon/gun-level-up/ui'
import { StormLevelUp } from 'features/storm-corps/storm-level-up/ui'
import { HoldLevelUp } from 'features/hold/hold-level-up/ui'
import { Alert } from 'shared/ui/alert'
import { LockScreen } from 'shared/ui/lock-screen'
import { VkJoinGroup } from 'features/user/vk-join-group'

import ZoneEdit from 'features/user/edit/ui'
import { Abduction } from 'entities/user/ui/abduction'
import { AbductionPrimes } from 'widgets/primes/abduction'
import { AbductionLink } from 'features/user/abduction-link/ui'
import { BattleConnect } from 'features/battle/battle-connect/ui'
import { BattleLink } from 'features/battle/battle-link'
import { FC } from 'react'

export const Popouts: FC = () => {
    
  const popout = popoutModel.selectors.usePopout().data

    return (
        <PopoutRoot activePopout={popout}>

            <Popout
                key='abduction'
                id='abduction'
                fill='white'
                screen='full'
                close={false}
                edge={0}
            >
                <Abduction />
            </Popout>

            <Popout
                key='abduction-link'
                id='abduction-link'
                fill='white'
                screen='full'
                close={false}
                edge={0}
            >
                <AbductionLink />
            </Popout>

            <Popout
                key='battle-pending'
                id='battle-pending'
                fill='white'
                screen='full'
                close={false}
                edge={0}
            >
                <BattlePending />
            </Popout>

            <Popout
                key='battle-over'
                id='battle-over'
                fill='#5a166480'
                screen='full'
                close={false}
                edge={0}
            >
                <BattleOver />
            </Popout>

            <Popout
                key='battle-connect'
                id='battle-connect'
                fill='#5a166480'
                edge={12}
            >
                <BattleConnect />
            </Popout>

            <Popout
                key='battle-link'
                id='battle-link'
                fill='white'
                screen='full'
                close={false}
                edge={0}
            >
                <BattleLink />
            </Popout>

            <Popout
                key='vk-join-group'
                id='vk-join-group'
                fill='white'
                screen='full'
                close={true}
                edge={0}
            >
                <VkJoinGroup />
            </Popout>

            <Popout
                key='user-dead'
                id='user-dead'
                fill='#5a166480'
                edge={12}
            >
                <UserDead />
            </Popout>

            <Popout
                key='zone-edit'
                id='zone-edit'
                fill='#5a166480'
                edge={12}
            >
                <ZoneEdit />
            </Popout>

            <Popout
                key='select-place'
                id='select-place'
                fill='#5a166480'
                close={false}
                edge={24}
            >
                <SelectPlace />
            </Popout>

            <Popout
                key='select-extraction'
                id='select-extraction'
                fill='#5a166480'
                edge={28}
            >
                <ExtractionPopout />
            </Popout>

            <Popout
                key='ship'
                id='ship'
                fill='#5a166480'
                edge={14}
            >
                <ShipPopout />
            </Popout>

            <Popout
                key='storm-corps'
                id='storm-corps'
                fill='#5a166480'
                edge={14}
            >
                <StormCorpsPopout />
            </Popout>

            <Popout
                key='gun'
                id='gun'
                fill='#5a166480'
                edge={14}
            >
                <GunPopout />
            </Popout>

            <Popout
                key='hold'
                id='hold'
                fill='#5a166480'
                edge={14}
            >
                <HoldPopout />
            </Popout>

            {/* START */}
            <Popout
                key='gun-improve-distance'
                id='gun-improve-distance'
                fill='#5a166480'
                edge={14}
            >
                <GunImproveDistance />
            </Popout>

            <Popout
                key='gun-improve-power'
                id='gun-improve-power'
                fill='#5a166480'
                edge={14}
            >
                <GunImprovePower />
            </Popout>

            <Popout
                key='storm-add-invaders'
                id='storm-add-invaders'
                fill='#5a166480'
                edge={14}
            >
                <StormAddInvaders />
            </Popout>

            <Popout
                key='storm-improve-power'
                id='storm-improve-power'
                fill='#5a166480'
                edge={14}
            >
                <StormImprovePower />
            </Popout>

            <Popout
                key='ship-improve-health'
                id='ship-improve-health'
                fill='#5a166480'
                edge={14}
            >
                <ShipImproveHealth />
            </Popout>

            {/* END */}

            <Popout
                key='ship-level-up'
                id='ship-level-up'
                fill='#5a166480'
                edge={14}
            >
                <ShipLevelUp />
            </Popout>

            <Popout
                key='gun-level-up'
                id='gun-level-up'
                fill='#5a166480'
                edge={14}
            >
                <GunLevelUp />
            </Popout>

            <Popout
                key='storm-level-up'
                id='storm-level-up'
                fill='#5a166480'
                edge={14}
            >
                <StormLevelUp />
            </Popout>

            <Popout
                key='hold-level-up'
                id='hold-level-up'
                fill='#5a166480'
                edge={14}
            >
                <HoldLevelUp />
            </Popout>

            <Popout
                key='panel'
                id='panel'
                fill='#5a166480'
                edge={14}
            >
                <Panel />
            </Popout>

            <Popout
                key='select-unit'
                id='select-unit'
                fill='#5a166480'
                edge={28}
            >
                <BuyUnit />
            </Popout>

            <Popout
                key='alert'
                id='alert'
                fill='#5a166480'
                edge={28}
            >
                <Alert />
            </Popout>

            <Popout
                key='lock-screen'
                id='lock-screen'
                fill='#5a166480'
                edge={14}
                close={false}
            >
                <LockScreen />
            </Popout>

            <Popout
                key='abduction-primes'
                id='abduction-primes'
                fill='#5a166480'
                edge={12}
                close={false}
            >
                <AbductionPrimes />
            </Popout>

        </PopoutRoot>
    )
}