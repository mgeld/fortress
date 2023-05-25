import fs from 'fs'
import https from 'https'
import WebSocket from 'ws'

import 'reflect-metadata'

import { ConnectHandler } from '../../controllers/connect'
import { DirectHandler } from '../../controllers/direct'
import { FireHandler } from '../../controllers/fire'
import { BattleJoinHandler } from '../../controllers/battle-join'
import { Broadcast } from '../../controllers/libs/broadcast'
import { Handlers, TRoutes } from '../../controllers/handlers'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'


// const https = require('https');
// const WebSocket = require('ws');

// type WSS = WebSocket.Server<WebSocket.WebSocket> & {
//     broadcast: (
//         message: TMessage,
//         ws?: IWebSocket
//     ) => void
// }

export interface IWebSocket extends WebSocket {
    is_alive?: boolean
}

export interface IServer {
    start(): void
}

@injectable()
export class Server {

    constructor(
        @inject(TYPES.Handlers) private _handlers: Handlers
    ) { }

    serverContext = this

    public start() {
        console.log('Server.start')

        const serverContext = this.serverContext

        const server = https.createServer({
            cert: fs.readFileSync('./api/cert/certificate.crt'),
            key: fs.readFileSync('./api/cert/privateKey.key')
        }, (req, res) => {
            console.log("Request");
            res.end("Nice");
        })

        console.log('0000000')

        const wss = new WebSocket.Server({ server })

        // wss.broadcast = (
        //     message: TMessage,
        //     ws?: IWebSocket
        // ) => {
        //     wss.clients.forEach(client => {
        //         if (client === ws) return
        //         client.send(JSON.stringify(message));
        //     })
        // }
        // const pointers = new Map<number, TPointer>()

        const connected_clients = new Map()

        // const broadcast = new Broadcast(wss)

        wss.on('error', (err) => {
            console.log('err', err)
        })
        wss.on('close', () => {
            console.log('close')
        })


        wss.on('connection', function connection(ws: IWebSocket) {

            console.log('connection')

            // wss.clients.forEach(item => console.log('wss.client', item))

            ws.is_alive = true;

            ws.on('pong', () => {
                ws.is_alive = true
            })

            ws.on('close', function () {
                ws.is_alive = false
                connected_clients.delete(ws);
            });

            ws.ping()

            // const routes: TRoutes = {
            //     [ConnectHandler.EVENT]: new ConnectHandler(),
            //     [DirectHandler.EVENT]: new DirectHandler(),
            //     [FireHandler.EVENT]: new FireHandler(),
            //     [BattleJoinHandler.EVENT]: new BattleJoinHandler()
            // } as TRoutes

            // let router = new Handlers(routes).handle(ws, broadcast)


            let router = serverContext._handlers.handle(ws)

            ws.on('message', router)

        })

        const hostname = '192.168.43.90'

        server.listen(8080, hostname, () => console.log('Htpsssss'));



    }
}

// Server.start()


// function aaa(message: string) {
//     let msg: TSendEvent = JSON.parse(message)
//     let _payload = msg.payload

//     switch (msg.event) {

//         case 'connect':

//             ws.send(JSON.stringify({
//                 event: 'pointers',
//                 payload: {
//                     pointers: mapToArray(pointers)
//                 }
//             }))

//             pointers.set(msg.payload.userId, {
//                 userId: msg.payload.userId,
//                 pos: msg.payload.position,
//                 health: 100,
//             })

//             broadcast.message({
//                 event: 'connect',
//                 payload: {
//                     pos: msg.payload.position,
//                     health: msg.payload.health,
//                     userId: msg.payload.userId
//                 }
//             }, ws)

//             break;

//         case 'direct':

//             pointers.set(msg.payload.userId, {
//                 ...pointers.get(msg.payload.userId)!,
//                 pos: msg.payload.position
//             })
//             const pointer: TDirectPointer = {
//                 event: 'direct',
//                 payload: {
//                     userId: msg.payload.userId,
//                     pos: pointers.get(msg.payload.userId)!.pos
//                 }
//             }
//             broadcast.message(pointer, ws)

//             break;

//         case 'fire':
//             const fire: TFirePayload = {
//                 position: msg.payload.position,
//                 direction: msg.payload.direction,
//                 userId: msg.payload.userId
//             }
//             if ('hitPointer' in _payload) {
//                 fire['hitPointer'] = _payload.hitPointer
//             }

//             broadcast.message(msg, ws)

//             break;

//         default:
//     }
// }



// setInterval(function ping() {
//     Array.from(pointers.values()).forEach(function each(client_stream) {
//         if (!client_stream.is_alive) { client_stream.terminate(); return; }
//         client_stream.is_alive = false;
//         client_stream.ping();
//     });
// }, 1000);


// setInterval(() => ping(), 5000)