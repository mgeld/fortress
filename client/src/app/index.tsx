import { useEffect } from 'react'

import 'app/assets/styles/App.scss'
import 'app/assets/styles//leaflet.css'

import Canvas from 'shared/ui/Canvas/Canvas'
import MapLayout from 'widgets/map-layout/ui/map-layout'
import LoadFonts from 'shared/ui/LoadFonts'
import { Counters } from 'widgets/counters/counters'
import { userModel } from 'entities/user'
import ControlFire from 'features/fire/control-fire/ui'
import ControlPointer from 'features/pointer/control-pointer/ui'
import { userEvents } from 'features/user/connect-user'
import { useSocket } from 'shared/api/socket/model'
import { battleEvents } from 'features/battle/battle-connect'

const App = () => {

  const userId = userModel.selectors.useUserId()

  console.log('App')

  const socketStatus = useSocket()

  useEffect(() => {
    userModel.events.setUser(Date.now())
  }, [])

  useEffect(() => {
    console.log('useEffect userId', userId)
    console.log('useEffect socketStatus', socketStatus)
    userId > 0 && socketStatus === 'open' && userEvents.events.connectUser()
  }, [userId, socketStatus])

  return (
    <div className='app'>

      <LoadFonts fontFamily='Lolita' />

      <Canvas width={50} height={86} />

      {socketStatus && <div className='mapPage'>

        <Counters />

        <MapLayout />

        <ControlPointer />

        <ControlFire />
        
        <div
          className='aaaa'
          onClick={() => battleEvents.events.battleConnect()}
        >
        </div>

      </div>}

    </div >
  );
}

export default App;
