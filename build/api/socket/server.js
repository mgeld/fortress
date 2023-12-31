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
const querystring_1 = __importDefault(require("querystring"));
require("reflect-metadata");
const types_1 = require("../../types");
const ping_pong_1 = require("./socket/ping-pong");
const inversify_1 = require("inversify");
const handlers_1 = require("../../controllers/handlers");
const snapshot_areals_1 = require("../../controllers/snapshot-areals");
const snapshot_arenas_1 = require("../../controllers/snapshot-arenas");
const vk_callback_1 = require("../../controllers/vk-callback");
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
            switch (req.url) {
                case '/fortress/snapshot-areals':
                    this.backupAndClearAreals();
                    res.end("Hello");
                    break;
                case '/fortress/snapshot-arenas':
                    this._snapshotArenas.clearInactiveArenas();
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
                        var _a;
                        let post = JSON.parse(Object.keys(querystring_1.default.parse(body))[0]);
                        if ((post === null || post === void 0 ? void 0 : post.type) === 'confirmation') {
                            res.end("d08bb2b8");
                        }
                        else {
                            let user_id = (_a = post === null || post === void 0 ? void 0 : post.object) === null || _a === void 0 ? void 0 : _a.user_id;
                            switch (post === null || post === void 0 ? void 0 : post.type) {
                                case 'message_allow':
                                    if (user_id) {
                                        serverContext._vkCallback.messageAllow(user_id);
                                    }
                                    break;
                                case 'message_deny':
                                    if (user_id) {
                                        serverContext._vkCallback.messageDeny(user_id);
                                    }
                                    break;
                                case 'group_join':
                                    if (user_id) {
                                        serverContext._vkCallback.groupJoin(user_id);
                                    }
                                    break;
                                case 'group_leave':
                                    if (user_id) {
                                        serverContext._vkCallback.groupLeave(user_id);
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
                ws.is_alive = true;
            });
            ws.on('close', function (e, d) {
                console.log('close ws user_id', ws.user_id);
                if (d.toString() === 'session-destroy') {
                    ws.terminate();
                    console.log('session-destroy ws.user_id', ws === null || ws === void 0 ? void 0 : ws.user_id);
                }
                else {
                    console.log('close Else >>>>>>>>>>>>>>');
                    (ws === null || ws === void 0 ? void 0 : ws.user_id) && Connection.deleteUser(ws.user_id);
                }
            });
            let router = serverContext._handlers.handle(ws);
            ws.on('message', router);
        });
        const hostname = '89.108.71.67';
        server.listen(8080, hostname, () => console.log('Начинаем прослушку порта...'));
        setInterval(() => this.backupAndClearAreals(), 120000);
    }
    backupAndClearAreals() {
        this._snapshotAreals.saveSectorsToBase();
        this._snapshotAreals.clearInactiveAreals();
    }
};
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.Handlers),
    __metadata("design:type", handlers_1.Handlers)
], Server.prototype, "_handlers", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.PingPong),
    __metadata("design:type", ping_pong_1.PingPong)
], Server.prototype, "_pingPong", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SnapshotAreals),
    __metadata("design:type", snapshot_areals_1.SnapshotAreals)
], Server.prototype, "_snapshotAreals", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.SnapshotArenas),
    __metadata("design:type", snapshot_arenas_1.SnapshotArenas)
], Server.prototype, "_snapshotArenas", void 0);
__decorate([
    (0, inversify_1.inject)(types_1.TYPES.VkCallback),
    __metadata("design:type", vk_callback_1.VkCallback)
], Server.prototype, "_vkCallback", void 0);
Server = __decorate([
    (0, inversify_1.injectable)()
], Server);
exports.Server = Server;
