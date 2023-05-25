import { injectable } from "inversify"
import { TMessage } from "../../../common-types/socket/server-to-client"
import { IWebSocket } from "../server"

class CollectionRooms {
    private data: Record<string, Record<number, IWebSocket>> = {}

    getRoom(roomId: string) {
        try {
            this.data[roomId]
            return roomId
        } catch (e) {
            this.createRoom(roomId)
            return roomId
        }
    }

    createRoom(roomId: string) {
        this.data[roomId] = {}
        return this.data[roomId]
    }

    deleteRoom(roomId: string) {
        delete this.data[roomId]
    }

    addClientToRoom(clientId: number, roomId: string, uSocket: IWebSocket) {
        try {
            const room = this.data[roomId]
            room[clientId] = uSocket
        } catch (e) {
            const room = this.createRoom(roomId)
            room[clientId] = uSocket
        }
    }

    deleteClient(clientId: number, roomId: string) {
        console.log('deleteClient this.data[roomId]', this.data[roomId])
        delete this.data[roomId][clientId]
    }

    getClients(roomId: string): number[] {
        try {
            const roomClients = this.data[roomId]
            return Object.keys(roomClients).map(key => Number(key))
        } catch (e) {
            return []
        }
    }

    getClientsSocket(roomId: string): IWebSocket[] {
        try {
            const roomClients = this.data[roomId]
            return Object.values(roomClients)
        } catch (e) {
            return []
        }
    }

    broadcast(
        roomId: string,
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
    public sectors = new CollectionRooms()
}