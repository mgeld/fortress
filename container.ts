import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'
import { PointerService } from './services/pointer.service'
import { MemoryData } from './infra/database/memory/memory-data'
import { ArenaMemoryRepository } from './infra/database/memory/repositories/arena'
import { PointerMemoryRepository } from './infra/database/memory/repositories/pointer'

import { IArenaRepository, IArenaTeamMemberRepository, IPointerRepository, IWeaponRepository } from './entities/repository'
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

// import { Handlers } from './controllers/handlers'

const container = new Container()

container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()
container.bind(TYPES.Rooms).to(Rooms).inSingletonScope()

// container.bind(TYPES.HTTPController).to(HTTPController).inSingletonScope()

container.bind(TYPES.Handlers).to(Handlers)

container.bind(TYPES.ConnectHandler).to(ConnectHandler)
container.bind(TYPES.DirectHandler).to(DirectHandler)
container.bind(TYPES.FireHandler).to(FireHandler)
container.bind(TYPES.BattleJoinHandler).to(BattleJoinHandler)
container.bind(TYPES.BattleFireHandler).to(BattleFireHandler)
container.bind(TYPES.BattleDirectHandler).to(BattleDirectHandler)

container.bind(TYPES.ArenaService).to(ArenaService)
container.bind(TYPES.PointerService).to(PointerService)
container.bind(TYPES.MemberService).to(MemberService)
container.bind(TYPES.WeaponService).to(WeaponService)

container.bind(TYPES.Base64EntityIdGenerator).to(Base64EntityIdGenerator).inSingletonScope()

container.bind(TYPES.Database).to(MemoryData).inSingletonScope()

container.bind<IArenaRepository>(TYPES.ArenaMemoryRepository).to(ArenaMemoryRepository)
container.bind<IPointerRepository>(TYPES.PointerMemoryRepository).to(PointerMemoryRepository)
container.bind<IWeaponRepository>(TYPES.WeaponMemoryRepository).to(WeaponMemoryRepository)
container.bind<IArenaTeamMemberRepository>(TYPES.MemberMemoryRepository).to(MemberMemoryRepository)

export { container }
