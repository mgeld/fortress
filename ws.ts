import fs from 'fs'
import https from 'https'
import WebSocket from 'ws'

// const https = require('https');
// const WebSocket = require('ws');

export type TJoystickDirection = "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD"

type TFireResponse = {
    position: [number, number]
    direction: TJoystickDirection
    userId: number
    hitPointer?: {
        userId: number
        pos: [number, number]
    }
}

const server = https.createServer({
    cert: fs.readFileSync('./cert/certificate.crt'),
    key: fs.readFileSync('./cert/privateKey.key')
}, (req, res) => {
    console.log("Request");
    res.end("Nice");
})

const wss = new WebSocket.Server({ server })

const pointers = new Map()

wss.on('connection', function connection(ws) {

    ws.on('message', function (message: string) {
        let _message = JSON.parse(message)
        let _payload = _message.payload

        switch (_message.event) {

            case 'connect':
                let newPointers = []
                for (let pointer of pointers.values()) {
                    newPointers.push(pointer)
                }
                ws.send(JSON.stringify({
                    event: 'pointers',
                    payload: {
                        pointers: newPointers
                    }
                }))

                pointers.set(_payload.userId, {
                    userId: _payload.userId,
                    pos: _payload.position,
                    health: 100,
                })

                broadcastMessage({
                    event: 'connect-pointer',
                    payload: {
                        pos: _payload.position,
                        health: _payload.health,
                        userId: _payload.userId
                    }
                }, ws)
                break;

            case 'direct':
                pointers.set(_payload.userId, {
                    ...pointers.get(_payload.userId),
                    pos: _payload.position
                })
                const pointer = {
                    event: 'direct-pointer',
                    payload: {
                        userId: _payload.userId,
                        pos: pointers.get(_payload.userId).pos
                    }
                }
                broadcastMessage(pointer, ws)
                break;

            case 'fire':
                const fire: TFireResponse = {
                    position: _payload.position,
                    direction: _payload.direction,
                    userId: _payload.userId
                }
                if ('hitPointer' in _payload) {
                    fire['hitPointer'] = _payload.hitPointer
                }

                console.log('fire', fire)

                broadcastMessage(_message, ws)
                break;

            default:
        }
    })

    ws.on('close', function () {
        // clients.delete(ws);
    });
})

const hostname = '192.168.43.90'

server.listen(8080, hostname, () => console.log('Htpsssss'));

function broadcastMessage(message: any, ws: WebSocket.WebSocket) {
    wss.clients.forEach(client => {
        if (client !== ws) {
            client.send(JSON.stringify(message));
        }
    })
}
