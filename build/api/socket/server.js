"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const ws_1 = __importDefault(require("ws"));
require("reflect-metadata");
const handlers_1 = require("../../controllers/handlers");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const snapshot_sectors_1 = require("../../controllers/snapshot-sectors");
const ping_pong_1 = require("./socket/ping-pong");
let Server = class Server {
    constructor() {
        this.serverContext = this;
    }
    start() {
        console.log('Server.start');
        const serverContext = this.serverContext;
        const server = https_1.default.createServer({
            cert: fs_1.default.readFileSync('./api/cert/certificate.crt'),
            key: fs_1.default.readFileSync('./api/cert/privateKey.key')
        }, (req, res) => {
            console.log('req.url', req.url);
            if (req.url === '/snapchot-sectors') {
                console.log('snapchot-sectors');
                this._snapshot.saveSectorsToBase();
                this._snapshot.clearInactiveAreals();
            }
            console.log("Request");
            res.end("Nice");
        });
        const wss = new ws_1.default.Server({ server });
        wss.on('error', (err) => {
            console.log('err', err);
        });
        wss.on('close', () => {
            console.log('close');
        });
        const Connection = this._pingPong;
        Connection.start(wss);
        wss.on('connection', function connection(ws) {
            console.log('connection');
            ws.is_alive = true;
            ws.on('pong', () => {
                console.log('POOOOOOOOOOOOOONG!');
                ws.is_alive = true;
            });
            ws.on('close', function () {
                console.log('------ ws close');
                ws.is_alive = false;
                Connection.deleteUser((ws === null || ws === void 0 ? void 0 : ws.user_id) || 0);
            });
            let router = serverContext._handlers.handle(ws);
            ws.on('message', router);
        });
        const hostname = '192.168.43.90';
        server.listen(8080, hostname, () => console.log('Htpsssss'));
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Handlers),
    __metadata("design:type", handlers_1.Handlers)
], Server.prototype, "_handlers", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SnapshotSectors),
    __metadata("design:type", snapshot_sectors_1.SnapshotSectors)
], Server.prototype, "_snapshot", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PingPong),
    __metadata("design:type", ping_pong_1.PingPong)
], Server.prototype, "_pingPong", void 0);
Server = __decorate([
    (0, inversify_1.injectable)()
], Server);
exports.Server = Server;