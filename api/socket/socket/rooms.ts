import { injectable } from "inversify"
import { IWebSocket } from "../server"
import { TMessage } from "../../../common-types/socket/server-to-client"

type TRoomId = string | number

class CollectionRooms {
    private clients: Record<number, IWebSocket> = {}

    private rooms: Record<string, Record<number, number>> = {}

    // Выбираем, иначе создаем комнату
    getRoom(roomId: string | number) {
        try {
            this.rooms[roomId]
            return roomId
        } catch (e) {
            this.createRoom(roomId)
            return roomId
        }
    }

    createRoom(roomId: TRoomId) {
        this.rooms[roomId] = {}
        return this.rooms[roomId]
    }

    deleteRoom(roomId: TRoomId) {
        delete this.rooms[roomId]
    }

    addClientToRoom(clientId: number, roomId: TRoomId, uSocket: IWebSocket) {
        try {
            console.log('addClientToRoom try')
            const room = this.rooms[roomId]
            room[clientId] = clientId
            this.clients[clientId]= uSocket
        } catch (e) {
            console.log('addClientToRoom catch')
            const room = this.createRoom(roomId)
            room[clientId] = clientId
            this.clients[clientId]= uSocket
        }
    }

    deleteClient(clientId: number, roomId: TRoomId) {
        console.log('deleteClientInRoom roomId clientId', roomId, clientId)
        if(!roomId) return

        delete this.rooms[roomId][clientId]
        delete this.clients[clientId]
    }

    getClients(roomId: TRoomId): number[] {
        try {
            const roomClients = this.rooms[roomId]
            return Object.keys(roomClients).map(key => Number(key))
        } catch (e) {
            return []
        }
    }

    getInactiveRooms(): number[] | string[] {
        try {
            return Object.entries(this.rooms)
                .filter(([key, value]) => Object.keys(value).length === 0)
                .map(([key, _]) => +key)
            // .map(value => value[1])
        } catch (e) {
            return []
        }
    }

    clearRooms(rooms: Array<string | number>) {
        rooms.forEach(roomId => {
            delete this.rooms[roomId]
        })
    }

    // Возвращает ID комнаты
    isCient(clientId: number): TRoomId | null {
        const room = Object.entries(this.rooms) // Массив комнат
            .filter(([key, room]) => Object.keys(room).findIndex(client => Number(client) === clientId) !== -1)
            .map(room => room[0])

        if (room.length > 0) return room[0]
        return null
    }

    getCientSocket(clientId: number): IWebSocket | null {
        // const roomId = Object.entries(this.data) // Массив комнат
        //     .filter(([key, room]) => Object.keys(room).findIndex(client => Number(client) === clientId) !== -1)
        //     .map(room => room[0])
        // if (roomId.length > 0) return this.data[roomId[0]][clientId]
        if(this.clients[clientId]) return this.clients[clientId]
        return null
    }

    getClientsSocket(roomId: TRoomId): IWebSocket[] {
        try {
            const roomClients = this.rooms[roomId]
            return Object.values(roomClients).map(clientId => this.clients[clientId])
        } catch (e) {
            return []
        }
    }

    clientSocket(
        clientId: number,
        roomId: TRoomId,
        message: TMessage
    ) {
        const client = this.clients[clientId]
        if (client) {
            client.send(JSON.stringify((message)))
        }
    }

    broadcast(
        roomId: TRoomId,
        message: TMessage,
        exceptionClients?: number[]
    ) {
        const clients = this.getClientsSocket(roomId)

        // if (clients.length < 2) return

        clients.forEach(uSocket => {
            if (exceptionClients && ~exceptionClients.findIndex(id => id === uSocket.user_id))  {
                return
            }
            uSocket.send(JSON.stringify((message)))
        })

    }

}

@injectable()
export class Rooms {
    public arenas = new CollectionRooms()
    public areals = new CollectionRooms()
}