import 'app/assets/styles/leaflet.css'
import 'app/assets/styles/App.scss'

import Canvas from 'shared/ui/Canvas/Canvas'
import LoadFonts from 'shared/ui/LoadFonts'

import { PopoutRoot, popoutModel } from 'shared/ui/PopoutRoot'
import { Popout } from 'shared/ui/Popout'
import { BattlePending } from 'entities/arena/ui/battle-pending'

import { Snackbar } from 'shared/ui/Snackbar/ui'
import { UserDead } from 'entities/user/ui/user-dead'
import { SelectPlace } from 'features/user/select-place/ui/popout'
import { useApp } from './hooks/useApp'

import { Page, PageRoot, pageModel } from 'shared/ui/PageRoot'
import { MapPage } from 'pages/map'
import { ExtractionPage } from 'pages/extraction'

// import { Counters } from 'widgets/counters/counters'
// import MapLayout from 'widgets/map-layout/ui/map-layout'
// import { MapBottom } from 'widgets/map-bottom'
// import { MapRang } from 'entities/user/ui/map-rang'
// import { NavBattle, NavBooty, NavShop } from 'widgets/map-buttons'
// import { NavMenu } from 'widgets/map-buttons/menu'
// import { Extraction } from 'widgets/extraction/ui'
import { BattleOver } from 'entities/arena'
import { Notice } from 'shared/ui/Notice/ui'
import { ShipPopout } from 'entities/ship/ui'
import { UseItemPopout } from 'widgets/use-item/ui'
import { StormCorpsPopout } from 'entities/storm-corps/ui'
import { GunPopout } from 'entities/weapon/ui'
import { HoldPopout } from 'entities/hold/ui'
import { GunImproveDistance } from 'features/storm-corps/gun-improve-distance/ui'
import { GunImprovePower } from 'features/storm-corps/gun-improve-power/ui'
import { Panel } from 'widgets/panel/ui'
import { ExtractionPopout } from 'features/unit/use-extraction/ui'
import { GunShopPage } from 'pages/gun-shop/ui'
import { UnitPopout } from 'features/unit/buy-unit/ui'

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
        >
          <BattlePending />
        </Popout>

        <Popout
          id='battle-over'
          fill='#5a166480'
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
          <UnitPopout />
        </Popout>

      </PopoutRoot>

      <LoadFonts fontFamily='Lolita' />

      <Canvas width={54} height={70} />

      <Snackbar />
      <Notice />

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
