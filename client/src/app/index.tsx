import { useEffect, useRef, useState } from 'react'

import 'app/assets/styles/App.scss'
import 'app/assets/styles//leaflet.css'

import Canvas from 'shared/ui/Canvas/Canvas'
import ControlFire from 'features/control-fire/ui/control-fire'
import { ControlPointer } from 'features/control-pointer'
import MapLayout from 'widgets/map-layout/ui/map-layout'
import LoadFonts from 'shared/ui/LoadFonts'
import { Counters } from 'widgets/counters/counters'
import { fireMapModel } from 'entities/gun-fire'
import { WS } from 'processes/socket'
import { connectUser } from 'shared/api/connect'
import { userModel } from 'entities/user'

const App = () => {

  const {
    userId,
    pos,
    health
  } = userModel.useUser()

  console.log('App')

  const [socketStatus, setSocketStatus] = useState(WS.getSocketStatus())

  useEffect(() => {
    userModel.events.setUser(Date.now())
  }, [])

  useEffect(() => {
    console.log('useEffect userId', userId)
    userId > 0 && connectUser(userId, pos, health)
  }, [userId])

  return (
    <div className='app'>

      <LoadFonts fontFamily='Lolita' />

      <Canvas width={50} height={86} />

      {socketStatus && <div className='mapPage'>

        <Counters />

        <MapLayout
        />

        <ControlPointer
        />

        <ControlFire
        />

      </div>}

    </div >
  );
}

export default App;
