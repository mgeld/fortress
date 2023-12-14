import fs from 'fs'
import https from 'https'
import WebSocket from 'ws'
import qs from 'querystring'

import 'reflect-metadata'

import { TYPES } from '../../types'
import { PingPong } from './socket/ping-pong'
import { inject, injectable } from 'inversify'
import { Handlers } from '../../controllers/handlers'
import { SnapshotAreals } from '../../controllers/snapshot-areals'
import { SnapshotArenas } from '../../controllers/snapshot-arenas'
import { VkCallback } from '../../controllers/vk-callback'

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
    @inject(TYPES.VkCallback) private _vkCallback!: VkCallback

    serverContext = this

    public start() {
        console.log('Server.start')

        const serverContext = this.serverContext

        const server = https.createServer({
            cert: fs.readFileSync('./api/cert/certificate.crt'),
            key: fs.readFileSync('./api/cert/privateKey.key')
        }, (req, res) => {

            /* PRODE_SERVER */

            switch (req.url) {
                case '/fortress/snapshot-areals':
                    this.backupAndClearAreals()
                    res.end("Hello");
                    break;

                case '/fortress/snapshot-arenas':
                    this._snapshotArenas.clearInactiveArenas()
                    res.end("Hello");
                    break;

                case '/fortress/callback':
                    var body = '';
                    req.on('data', function (data) {
                        body += data;
                        if (body.length > 1e6)
                            req.socket.destroy();
                    });

                    req.on('end', function () {
                        let post = JSON.parse(Object.keys(qs.parse(body))[0])

                        if (post?.type === 'confirmation') {
                            res.end("d08bb2b8");
                        } else {

                            let user_id = post?.object?.user_id

                            switch (post?.type) {
                                case 'message_allow':
                                    if (user_id) {
                                        serverContext._vkCallback.messageAllow(user_id)
                                    }
                                    break;
                                case 'message_deny':
                                    if (user_id) {
                                        serverContext._vkCallback.messageDeny(user_id)
                                    }
                                    break;
                                case 'group_join':
                                    if (user_id) {
                                        serverContext._vkCallback.groupJoin(user_id)
                                    }
                                    break;
                                case 'group_leave':
                                    if (user_id) {
                                        serverContext._vkCallback.groupLeave(user_id)
                                    }
                                    break;
                                default:
                                    res.end("Hello");
                            }

                            res.end("ok");

                        }
                    });
                    break;
                default:
                    res.end("Hello");
            }

        })

        const wss = new WebSocket.Server({ server })

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
                ws.is_alive = true
            })

            ws.on('close', function (e, d) {
                console.log('ws close user_id', ws.user_id)
                if (d.toString() === 'session-destroy') {
                    console.log('Сюда попадает')
                    // ws.is_alive = false
                    // ws?.user_id && Connection.deleteClientAreal(ws.user_id)
                    ws.terminate()
                } else {
                    ws?.user_id && Connection.deleteUser(ws.user_id)
                }
            });

            // Сокет контроллеры
            let router = serverContext._handlers.handle(ws)

            ws.on('message', router)

        })

        const hostname = '89.108.71.67'
        // const hostname = '192.168.43.90'

        server.listen(8080, hostname, () => console.log('Начинаем прослушку порта...'));

        setInterval(() => this.backupAndClearAreals(), 120000)

    }

    private backupAndClearAreals() {
        this._snapshotAreals.saveSectorsToBase()
        this._snapshotAreals.clearInactiveAreals()
    }
}