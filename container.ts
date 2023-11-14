import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'
import { PointerService } from './services/pointer.service'
import { MemoryData } from './infra/database/memory/memory-data'
import { ArenaMemoryRepository } from './infra/database/memory/repositories/arena'
import { PointerMemoryRepository } from './infra/database/memory/repositories/pointer'

import {
    IArealMemoryRepository,
    IArenaRepository,
    IArenaTeamMemberRepository,
    ICitadelMemoryRepository,
    ICitadelRepository,
    IPointerMemoryRepository,
    IPointerRepository,
    ISectorMemoryRepository,
    ISectorRepository,
    IWeaponRepository,
    IZoneMemoryRepository,
    IZoneRepository
} from './entities/repository'

import { ArenaService } from './services/arena.service'
import { Base64EntityIdGenerator } from './domain/entityId'
import { WeaponService } from './services/weapon.service'
import { IServer, Server } from './api/socket/server'
import { Handlers } from './controllers/handlers'
import { ConnectHandler } from './controllers/connect'
import { DirectHandler } from './controllers/direct'
import { FireHandler } from './controllers/fire'
import { Rooms } from './api/socket/socket/rooms'
import { WeaponMemoryRepository } from './infra/database/memory/repositories/weapon'
import { MemberService } from './services/member.service'

import { BattleJoinHandler } from './controllers/battle-join'
import { BattleFireHandler } from './controllers/battle-fire'
import { BattleDirectHandler } from './controllers/battle-direct'
import { MemberMemoryRepository } from './infra/database/memory/repositories/member'
import { TakeHandler } from './controllers/take'
import { SectorMemoryRepository } from './infra/database/memory/repositories/sector'
import { SectorService } from './services/sector.service'
import { GetSectorsHandler } from './controllers/get-sectors'
import { PointerRepository } from './infra/database/mysql2/repositories/pointer'
import { WeaponRepository } from './infra/database/mysql2/repositories/weapon'
import { SectorRepository } from './infra/database/mysql2/repositories/sector'
import { Logs } from './infra/logs/takes'
import { ArealMemoryRepository } from './infra/database/memory/repositories/areal'
import { SnapshotSectors } from './controllers/snapshot-sectors'
import { GetAboutSectorHandler } from './controllers/get-about-sector'
import { GetUserHandler } from './controllers/get-user'
import { CitadelMemoryRepository } from './infra/database/memory/repositories/citadel'
import { ZoneMemoryRepository } from './infra/database/memory/repositories/zone'
import { ZoneRepository } from './infra/database/mysql2/repositories/zone'
import { ZoneService } from './services/zone.service'
import { CitadelRepository } from './infra/database/mysql2/repositories/citadel'
import { CitadelService } from './services/citadel.service'
import { BattleLeaveHandler } from './controllers/battle-leave'
import { VkUserRepository } from './infra/database/mysql2/repositories/vk-user'
import { UseExtractionHandler } from './controllers/use-extraction'
import { BeamHandler } from './controllers/beam'
import { BuyUnitHandler } from './controllers/buy-unit'
import { LevelUpHandler } from './controllers/level-up'
import { PingPong } from './api/socket/socket/ping-pong'

import connection from './infra/database/mysql2/connection'

// import { Handlers } from './controllers/handlers'

const container = new Container()

container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()
container.bind(TYPES.PingPong).to(PingPong).inSingletonScope()
container.bind(TYPES.Rooms).to(Rooms).inSingletonScope()

// container.bind(TYPES.HTTPController).to(HTTPController).inSingletonScope()

container.bind(TYPES.Handlers).to(Handlers)

container.bind(TYPES.ConnectHandler).to(ConnectHandler)
container.bind(TYPES.DirectHandler).to(DirectHandler)
container.bind(TYPES.FireHandler).to(FireHandler)
container.bind(TYPES.BeamHandler).to(BeamHandler)

container.bind(TYPES.TakeHandler).to(TakeHandler)
container.bind(TYPES.BattleJoinHandler).to(BattleJoinHandler)
container.bind(TYPES.BattleLeaveHandler).to(BattleLeaveHandler)
container.bind(TYPES.BattleFireHandler).to(BattleFireHandler)
container.bind(TYPES.BattleDirectHandler).to(BattleDirectHandler)
container.bind(TYPES.GetSectorsHandler).to(GetSectorsHandler)
container.bind(TYPES.GetAboutSectorHandler).to(GetAboutSectorHandler)
container.bind(TYPES.GetUserHandler).to(GetUserHandler)
container.bind(TYPES.UseExtractionHandler).to(UseExtractionHandler)
container.bind(TYPES.BuyUnitHandler).to(BuyUnitHandler)
container.bind(TYPES.LevelUpHandler).to(LevelUpHandler)


container.bind(TYPES.ArenaService).to(ArenaService)
container.bind(TYPES.PointerService).to(PointerService)
container.bind(TYPES.ZoneService).to(ZoneService)
container.bind(TYPES.MemberService).to(MemberService)
container.bind(TYPES.WeaponService).to(WeaponService)
container.bind(TYPES.SectorService).to(SectorService)
container.bind(TYPES.CitadelService).to(CitadelService)

container.bind(TYPES.Base64EntityIdGenerator).to(Base64EntityIdGenerator).inSingletonScope()

container.bind(TYPES.Database).to(MemoryData).inSingletonScope()
container.bind(TYPES.Logs).to(Logs).inSingletonScope()

container.bind<IArenaRepository>(TYPES.ArenaMemoryRepository).to(ArenaMemoryRepository)
container.bind<IPointerMemoryRepository>(TYPES.PointerMemoryRepository).to(PointerMemoryRepository)
container.bind<IZoneMemoryRepository>(TYPES.ZoneMemoryRepository).to(ZoneMemoryRepository)
container.bind<IWeaponRepository>(TYPES.WeaponMemoryRepository).to(WeaponMemoryRepository)
container.bind<IArenaTeamMemberRepository>(TYPES.MemberMemoryRepository).to(MemberMemoryRepository)
container.bind<ISectorMemoryRepository>(TYPES.SectorMemoryRepository).to(SectorMemoryRepository)
container.bind<ISectorRepository>(TYPES.SectorRepository).to(SectorRepository)
container.bind<IArealMemoryRepository>(TYPES.ArealMemoryRepository).to(ArealMemoryRepository)
container.bind<ICitadelMemoryRepository>(TYPES.CitadelMemoryRepository).to(CitadelMemoryRepository)
container.bind<ICitadelRepository>(TYPES.CitadelRepository).to(CitadelRepository)

container.bind(TYPES.VkUserRepository).to(VkUserRepository)


container.bind<IPointerRepository>(TYPES.PointerRepository).to(PointerRepository)
container.bind<IZoneRepository>(TYPES.ZoneRepository).to(ZoneRepository)
container.bind<IWeaponRepository>(TYPES.WeaponRepository).to(WeaponRepository)

container.bind(TYPES.SnapshotSectors).to(SnapshotSectors)

container.bind(TYPES.connection).toConstantValue(connection)

export { container }
