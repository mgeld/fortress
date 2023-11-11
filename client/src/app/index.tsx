import 'app/assets/styles/leaflet.css'
import 'app/assets/styles/App.scss'

import Canvas from 'shared/ui/canvas'
import LoadFonts from 'shared/ui/load-fonts'

import { PopoutRoot, popoutModel } from 'shared/ui/popout-root'
import { Popout } from 'shared/ui/popout'
import { BattlePending } from 'entities/arena/ui/battle-pending'

import { Snackbar } from 'shared/ui/snackbar/ui'
import { UserDead } from 'entities/user/ui/user-dead'
import { SelectPlace } from 'features/user/select-place/ui/popout'
import { useApp } from './hooks/useApp'

import { MapPage } from 'pages/map'
import { ExtractionPage } from 'pages/extraction'

import { BattleOver } from 'entities/arena'
import { Notice } from 'shared/ui/notice/ui'
import { ShipPopout } from 'entities/ship/ui'
import { StormCorpsPopout } from 'entities/storm-corps/ui'
import { GunPopout } from 'entities/weapon/ui'
import { GunImproveDistance } from 'features/weapon/gun-improve-distance/ui'
import { GunImprovePower } from 'features/weapon/gun-improve-power/ui'
import { Panel } from 'widgets/panel/ui'
import { ExtractionPopout } from 'features/unit/use-extraction/ui'
import { GunShopPage } from 'pages/gun-shop/ui'
import { BuyUnit } from 'features/unit/buy-unit/ui'
import { StormAddInvaders } from 'features/storm-corps/storm-add-invaders/ui'
import { StormImprovePower } from 'features/storm-corps/storm-improve-power/ui'
import { ShipImproveHealth } from 'features/ship/ship-improve-health/ui'
import { HoldPopout } from 'entities/hold/ui/hold'
import { mapStartPosition } from 'widgets/map-layout/model'
import { Page, PageRoot, pageModel } from 'shared/ui/page-root'
import { ShipLevelUp } from 'features/ship/ship-level-up/ui'
import { GunLevelUp } from 'features/weapon/gun-level-up/ui'
import { StormLevelUp } from 'features/storm-corps/storm-level-up/ui'
import { HoldLevelUp } from 'features/hold/hold-level-up/ui'
import { UnitOutHold } from 'entities/unit/ui/unit-out-hold'
import { goBack } from 'processes/go-back'

mapStartPosition()

window.addEventListener('popstate', () => goBack());

const App = () => {

  const popout = popoutModel.selectors.usePopout().data
  const page = pageModel.selectors.usePage().data

  console.log('App')

  const {
    vkUserId,
    socketStatus
  } = useApp()

  if (!vkUserId) return <>load...</>

  return (
    <div className='app'>

      <PopoutRoot activePopout={popout}>

        <Popout
          id='battle-pending'
          fill='#5a166480'
          close={false}
        >
          <BattlePending />
        </Popout>

        <Popout
          id='battle-over'
          fill='#5a166480'
          close={false}
        >
          <BattleOver />
        </Popout>

        <Popout
          id='user-dead'
          fill='#5a166480'
        >
          <UserDead />
        </Popout>

        <Popout
          id='select-place'
          fill='#5a166480'
          close={false}
        >
          <SelectPlace />
        </Popout>

        <Popout
          id='select-extraction'
          fill='#5a166480'
          edge={28}
        >
          <ExtractionPopout />
        </Popout>

        <Popout
          id='ship'
          fill='#5a166480'
          edge={14}
        >
          <ShipPopout />
        </Popout>

        <Popout
          id='storm-corps'
          fill='#5a166480'
          edge={14}
        >
          <StormCorpsPopout />
        </Popout>

        <Popout
          id='gun'
          fill='#5a166480'
          edge={14}
        >
          <GunPopout />
        </Popout>

        <Popout
          id='hold'
          fill='#5a166480'
          edge={14}
        >
          <HoldPopout />
        </Popout>

        <Popout
          id='gun-improve-distance'
          fill='#5a166480'
          edge={14}
        >
          <GunImproveDistance />
        </Popout>

        <Popout
          id='gun-improve-power'
          fill='#5a166480'
          edge={14}
        >
          <GunImprovePower />
        </Popout>

        <Popout
          id='storm-add-invaders'
          fill='#5a166480'
          edge={14}
        >
          <StormAddInvaders />
        </Popout>

        <Popout
          id='storm-improve-power'
          fill='#5a166480'
          edge={14}
        >
          <StormImprovePower />
        </Popout>

        <Popout
          id='ship-improve-health'
          fill='#5a166480'
          edge={14}
        >
          <ShipImproveHealth />
        </Popout>

        <Popout
          id='ship-level-up'
          fill='#5a166480'
          edge={14}
        >
          <ShipLevelUp />
        </Popout>

        <Popout
          id='gun-level-up'
          fill='#5a166480'
          edge={14}
        >
          <GunLevelUp />
        </Popout>

        <Popout
          id='storm-level-up'
          fill='#5a166480'
          edge={14}
        >
          <StormLevelUp />
        </Popout>


        <Popout
          id='hold-level-up'
          fill='#5a166480'
          edge={14}
        >
          <HoldLevelUp />
        </Popout>



        <Popout
          id='panel'
          fill='#5a166480'
          edge={14}
        >
          <Panel />
        </Popout>

        <Popout
          id='select-unit'
          fill='#5a166480'
          edge={28}
        >
          <BuyUnit />
        </Popout>

        <Popout
          id='unit-out-hold'
          fill='#5a166480'
          edge={28}
        >
          <UnitOutHold />
        </Popout>

      </PopoutRoot>

      <LoadFonts fontFamily='Lolita' />

      <Canvas width={54} height={70} />

      <Snackbar />
      <Notice />
      {/* <Tooltip /> */}

      {socketStatus ? (
        <PageRoot activePage={page}>
          <Page id='map'>
            <MapPage />
          </Page>

          <Page id='extraction'>
            <ExtractionPage />
          </Page>

          <Page id='gun-shop'>
            <GunShopPage />
          </Page>


        </PageRoot>

      ) : null}

    </div >
  );
}

export default App;
