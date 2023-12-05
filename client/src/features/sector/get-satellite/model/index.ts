// import { attach, createEvent, sample } from "effector"
// import { shipModel } from "entities/ship"
// import { userModel } from "entities/user"
// import { getSatelliteAPI } from "shared/api/get-satellite"
// import { getSectorsAPI } from "shared/api/get-sectors"

// const getSatelliteSectors = createEvent()

// sample({
//   clock: getSatelliteSectors,
//   target: attach({
//     source: {
//       map: $mapStore
//     },
//     effect: (user) => {
//       getSatelliteAPI(user.pos, user.userId)
//     }
//   })
// })

// export const events = {
//   getSatelliteSectors
// }

export {}