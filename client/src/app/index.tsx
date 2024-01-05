import 'app/assets/styles/leaflet.css'
import 'app/assets/styles/App.scss'

import Canvas from 'shared/ui/canvas'
import LoadFonts from 'shared/ui/load-fonts'

import { Snackbar } from 'shared/ui/snackbar/ui'
import { useApp } from './hooks/useApp'

import { MapPage } from 'pages/map'
import { ExtractionPage } from 'pages/extraction'

import { Notice } from 'shared/ui/notice/ui'
import { GunShopPage } from 'pages/gun-shop/ui'
import { Page, PageRoot, pageModel } from 'shared/ui/page-root'
import { goBack } from 'processes/go-back'
import { getPlatformNative } from 'shared/lib/get-platform-native'
import { Tutorial } from 'shared/ui/tutorial/ui'
import { LoadApp } from 'shared/ui/load-app/ui'
import { RatingPage } from 'pages/rating'
import { MapSatellitPage } from 'pages/map-satellite'
import { mapStartPosition } from 'widgets/map-region/container/model'
import { initVkJoinGroup } from 'features/user/vk-join-group/model'
import { ZonePage } from 'pages/zone'
import { setMyZoneColorStartSample } from 'features/sector/set-zone-color/model'
import { initSelectZoneSample } from 'features/user/select-zone'

import { AbductionPage } from 'pages/abduction'
import { Popouts } from 'widgets/app/popouts'

mapStartPosition()
setMyZoneColorStartSample()
initSelectZoneSample()
initVkJoinGroup()

window.addEventListener('popstate', () => goBack());

// let platform = getPlatform()
const _platform = getPlatformNative()

const App = () => {

  console.log('App')
  console.log('Version 1.2.3')

  const page = pageModel.selectors.usePage().data

  const {
    zoneId,
    socketStatus
  } = useApp()

  return (
    <div className={`app ${_platform}`}>

      <LoadFonts fontFamily='Lolita' />

      <Popouts />

      <Canvas width={54} height={70} />

      <Snackbar />

      <Notice />

      <Tutorial />

      {!zoneId && <LoadApp />}

      {socketStatus ? (
        <PageRoot activePage={page}>

          <Page key="map" id='map'>
            <MapPage />
          </Page>

          <Page key="map-satellite" id='map-satellite'>
            <MapSatellitPage />
          </Page>

          <Page key="extraction" id='extraction'>
            <ExtractionPage />
          </Page>

          <Page key="shop" id='gun-shop'>
            <GunShopPage />
          </Page>

          <Page key="rating" id='rating'>
            <RatingPage />
          </Page>

          <Page key="zone" id='zone'>
            <ZonePage />
          </Page>

          <Page key="abduction" id='abduction'>
            <AbductionPage />
          </Page>


        </PageRoot>

      ) : null}

    </div >
  );
}

export default App;
