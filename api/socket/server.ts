import fs from 'fs'
import https from 'https'
import WebSocket from 'ws'

import 'reflect-metadata'

import { TYPES } from '../../types'
import { PingPong } from './socket/ping-pong'
import { inject, injectable } from 'inversify'
import { Handlers } from '../../controllers/handlers'
import { SnapshotAreals } from '../../controllers/snapshot-areals'
import { SnapshotArenas } from '../../controllers/snapshot-arenas'

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
    user_id?: number
}

export interface IServer {
    start(): void
}

@injectable()
export class Server {

    @inject(TYPES.Handlers) private _handlers!: Handlers
    @inject(TYPES.PingPong) private _pingPong!: PingPong
    @inject(TYPES.SnapshotAreals) private _snapshotAreals!: SnapshotAreals
    @inject(TYPES.SnapshotArenas) private _snapshotArenas!: SnapshotArenas

    serverContext = this

    public start() {
        console.log('Server.start')

        const serverContext = this.serverContext

        const server = https.createServer({
            cert: fs.readFileSync('./api/cert/certificate.crt'),
            key: fs.readFileSync('./api/cert/privateKey.key')
        }, (req, res) => {

            console.log('req.url', req.url)

            if (req.url === '/snapshot-areals') {

                console.log('snapshot-areals')
                this._snapshotAreals.saveSectorsToBase()
                this._snapshotAreals.clearInactiveAreals()

            } else if (req.url === '/snapshot-arenas') {

                console.log('snapshot-arenas')
                this._snapshotArenas.clearInactiveArenas()

            }

            console.log("Request");
            res.end("Nice");
        })

        const wss = new WebSocket.Server({ server })

        // const connected_clients = new Map()

        wss.on('error', (err) => {
            console.log('err', err)
        })
        
        wss.on('close', () => {
            console.log('close')
        })

        const Connection = this._pingPong
        Connection.start(wss)

        wss.on('connection', function connection(ws: IWebSocket) {

            console.log('connection')

            // wss.clients.forEach(item => console.log('wss.client', item))

            ws.is_alive = true;

            ws.on('pong', () => {
                console.log('poooooooooooong')
                ws.is_alive = true
            })

            ws.on('close', function () {

                console.log('------ ws close')
                ws.is_alive = false
                Connection.deleteUser(ws?.user_id || 0)
                // connected_clients.delete(ws);
            });

            // ws.ping()

            let router = serverContext._handlers.handle(ws)

            ws.on('message', router)

        })
        

        // connection.start()
        // const interval = setInterval(() => connection.pingPong(), 5000);

        const hostname = '89.108.71.67'
        // const hostname = '192.168.43.90'

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