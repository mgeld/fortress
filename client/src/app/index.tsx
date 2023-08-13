import { Profiler, useEffect } from 'react'

import 'app/assets/styles/leaflet.css'
import 'app/assets/styles/App.scss'

import Canvas from 'shared/ui/Canvas/Canvas'
import MapLayout from 'widgets/map-layout/ui/map-layout'
import LoadFonts from 'shared/ui/LoadFonts'
import { Counters } from 'widgets/counters/counters'

import { NavBattle } from 'widgets/menu/battle'
import { PopoutRoot } from 'shared/ui/PopoutRoot'
import { Popout } from 'shared/ui/Popout'
import { BattlePending } from 'entities/arena/ui/battle-pending'
import { selectors } from 'shared/ui/PopoutRoot/model'

import { Snackbar } from 'shared/ui/Snackbar/ui'
import { BattleOver } from 'entities/arena/ui/battle-over'
import { UserDead } from 'entities/user/ui/user-dead'
import { SelectPlace } from 'features/user/select-place/ui/popout'
import { useApp } from './hooks/useApp'
import { MapBottom } from 'widgets/map-bottom'

const App = () => {

  const popout = selectors.usePopout().data

  console.log('App')

  const {
    userId,
    socketStatus
  } = useApp()

  if (!userId) return <>load...</>

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

        </PopoutRoot>

        <LoadFonts fontFamily='Lolita' />

        <Canvas width={50} height={86} />

        <Snackbar />

        {socketStatus ? (
          <div className='mapPage'>

            <NavBattle />

            <Counters />

            <MapLayout />

            <MapBottom />

          </div>
        ) : null}

      </div >
  );
}

export default App;
