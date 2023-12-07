"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
const inversify_1 = require("inversify");
class CollectionRooms {
    constructor() {
        this.data = {};
    }
    getRoom(roomId) {
        try {
            this.data[roomId];
            return roomId;
        }
        catch (e) {
            this.createRoom(roomId);
            return roomId;
        }
    }
    createRoom(roomId) {
        this.data[roomId] = {};
        return this.data[roomId];
    }
    deleteRoom(roomId) {
        delete this.data[roomId];
    }
    addClientToRoom(clientId, roomId, uSocket) {
        try {
            console.log('addClientToRoom try');
            const room = this.data[roomId];
            room[clientId] = uSocket;
        }
        catch (e) {
            console.log('addClientToRoom catch');
            const room = this.createRoom(roomId);
            room[clientId] = uSocket;
        }
    }
    deleteClient(clientId, roomId) {
        console.log(' deleteClient clientId', clientId);
        delete this.data[roomId][clientId];
    }
    getClients(roomId) {
        try {
            const roomClients = this.data[roomId];
            return Object.keys(roomClients).map(key => Number(key));
        }
        catch (e) {
            return [];
        }
    }
    getInactiveRooms() {
        try {
            return Object.entries(this.data)
                .filter(([key, value]) => Object.keys(value).length === 0)
                .map(([key, _]) => +key);
        }
        catch (e) {
            return [];
        }
    }
    clearRooms(rooms) {
        rooms.forEach(roomId => {
            delete this.data[roomId];
        });
    }
    isCient(clientId) {
        const room = Object.entries(this.data)
            .filter(([key, room]) => Object.keys(room).findIndex(client => Number(client) === clientId) !== -1)
            .map(room => room[0]);
        if (room.length > 0)
            return room[0];
        return null;
    }
    getClientsSocket(roomId) {
        try {
            const roomClients = this.data[roomId];
            return Object.values(roomClients);
        }
        catch (e) {
            return [];
        }
    }
    clientSocket(clientId, roomId, message) {
        const client = this.data[roomId][clientId];
        if (client) {
            client.send(JSON.stringify((message)));
        }
    }
    broadcast(roomId, message, exceptionClient) {
        const clients = this.getClientsSocket(roomId);
        clients.forEach(uSocket => {
            if (exceptionClient && this.data[roomId][exceptionClient] === uSocket)
                return;
            uSocket.send(JSON.stringify((message)));
        });
    }
}
let Rooms = class Rooms {
    constructor() {
        this.arenas = new CollectionRooms();
        this.areals = new CollectionRooms();
    }
};
Rooms = __decorate([
    (0, inversify_1.injectable)()
], Rooms);
exports.Rooms = Rooms;
