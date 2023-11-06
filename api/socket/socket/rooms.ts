import { injectable } from "inversify"
import { TMessage } from "../../../common-types/socket/server-to-client"
import { IWebSocket } from "../server"

type TRoomId = string | number

class CollectionRooms {
    private data: Record<string, Record<number, IWebSocket>> = {}

    getRoom(roomId: string | number) {
        try {
            this.data[roomId]
            return roomId
        } catch (e) {
            this.createRoom(roomId)
            return roomId
        }
    }

    createRoom(roomId: TRoomId) {
        this.data[roomId] = {}
        return this.data[roomId]
    }

    deleteRoom(roomId: TRoomId) {
        delete this.data[roomId]
    }

    addClientToRoom(clientId: number, roomId: TRoomId, uSocket: IWebSocket) {
        try {
            const room = this.data[roomId]
            room[clientId] = uSocket
        } catch (e) {
            const room = this.createRoom(roomId)
            room[clientId] = uSocket
        }
    }

    deleteClient(clientId: number, roomId: TRoomId) {
        delete this.data[roomId][clientId]
    }

    getClients(roomId: TRoomId): number[] {
        try {
            const roomClients = this.data[roomId]
            return Object.keys(roomClients).map(key => Number(key))
        } catch (e) {
            return []
        }
    }

    getInactiveRooms(): number[] {
        try {
            return Object.entries(this.data)
                .filter(([key, value]) => Object.keys(value).length === 0)
                .map(([key, _]) => +key)
            // .map(value => value[1])
        } catch (e) {
            return []
        }
    }

    clearRooms(rooms: Array<string | number>) {
        rooms.forEach(roomId => {
            delete this.data[roomId]
        })
    }

    getClientsSocket(roomId: TRoomId): IWebSocket[] {
        try {
            const roomClients = this.data[roomId]
            return Object.values(roomClients)
        } catch (e) {
            return []
        }
    }

    clientSocket(
        clientId: number, 
        roomId: TRoomId,
        message: TMessage
    ) {
        const client = this.data[roomId][clientId]
        if(client) {
            client.send(JSON.stringify((message)))
        }
    }

    broadcast(
        roomId: TRoomId,
        message: TMessage,
        exceptionClient?: number
    ) {
        const clients = this.getClientsSocket(roomId)

        // if (clients.length < 2) return

        clients.forEach(uSocket => {
            if (exceptionClient && this.data[roomId][exceptionClient] === uSocket) return
            uSocket.send(JSON.stringify((message)))
        })

    }

}

@injectable()
export class Rooms {
    public arenas = new CollectionRooms()
    public areals = new CollectionRooms()
}