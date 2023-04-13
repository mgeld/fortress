import { useEffect, useState } from 'react'

import 'app/assets/styles/App.scss'
import 'app/assets/styles//leaflet.css'

import Canvas from 'shared/ui/Canvas/Canvas'
import ControlFire from 'features/control-fire/ui/control-fire'
import { ControlPointer } from 'features/control-pointer'
import MapLayout from 'widgets/map-layout/ui/map-layout'
import LoadFonts from 'shared/ui/LoadFonts'
import { Counters } from 'widgets/counters/counters'
import { WS } from 'processes/socket'
import { connectUserAPI } from 'shared/api/connect'
import { userModel } from 'entities/user'
import { attach, createEvent, sample } from 'effector'

const connectUser = createEvent()

sample({
  clock: connectUser,
  target: attach({
    source: {
      userId: userModel.$userIdStore,
      pos: userModel.$userPositionStore,
      health: userModel.$userHealthStore,
    },
    effect: (user) => {
      connectUserAPI(user.userId, user.pos, user.health)
    }
  })
})

const App = () => {

  const userId = userModel.useUserId()

  console.log('App')

  const [socketStatus, setSocketStatus] = useState(WS.getSocketStatus())

  useEffect(() => {
    userModel.events.setUser(Date.now())
  }, [])

  useEffect(() => {
    console.log('useEffect userId', userId)
    userId > 0 && connectUser()
  }, [userId])

  return (
    <div className='app'>

      <LoadFonts fontFamily='Lolita' />

      <Canvas width={50} height={86} />

      {socketStatus && <div className='mapPage'>

        <Counters />

        <MapLayout />

        <ControlPointer />

        <ControlFire />

      </div>}

    </div >
  );
}

export default App;
