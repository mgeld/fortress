// import { extractionAPI, sectorsAPI } from "shared/api/events";
// import { Handler } from "..";
// import { TTakeHit } from '@ctypes/socket/server-to-client'
// import { snackbarModel } from "shared/ui/Snackbar";

// let timeId: ReturnType<typeof setTimeout>

// class UseExtractionHandler extends Handler {
//     handle(message: TTakeHit) {

//         console.log('UseExtractionHandler message', message)

//         const { extr } = message.payload

//         extractionAPI.events.delExtraction(extr.index)

//         snackbarModel.events.newToast({
//             text: 'Сектор захвачен!',
//             t: 1
//         })
//         if (timeId) {
//             clearTimeout(timeId)
//         }

//         timeId = setTimeout(() => {
//             sectorsAPI.events.setTakeFort(null)
//         }, 6000)
//     }
// }

// UseExtractionHandler.EVENT = 'use-extraction'

// export {
//     UseExtractionHandler
// }

export {}