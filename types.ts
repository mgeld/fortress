const TYPES = {
    Server: Symbol.for('Server'),
    Rooms: Symbol.for('Rooms'),

    Database: Symbol.for('Database'),
    Logs: Symbol.for('Logs'),

    ArenaService: Symbol.for('ArenaService'),
    PointerService: Symbol.for('PointerService'),
    ZoneService: Symbol.for('ZoneService'),
    MemberService: Symbol.for('MemberService'),
    WeaponService: Symbol.for('WeaponService'),
    SectorService: Symbol.for('SectorService'),
    CitadelService: Symbol.for('CitadelService'),
    
    ArenaMemoryRepository: Symbol.for('ArenaMemoryRepository'),
    PointerMemoryRepository: Symbol.for('PointerMemoryRepository'),
    ZoneMemoryRepository: Symbol.for('ZoneMemoryRepository'),
    WeaponMemoryRepository: Symbol.for('WeaponMemoryRepository'),
    MemberMemoryRepository: Symbol.for('MemberMemoryRepository'),
    SectorMemoryRepository: Symbol.for('SectorMemoryRepository'),
    ArealMemoryRepository: Symbol.for('ArealMemoryRepository'),
    CitadelMemoryRepository: Symbol.for('CitadelMemoryRepository'),
    CitadelRepository: Symbol.for('CitadelRepository'),
    
    
    Base64EntityIdGenerator: Symbol.for('Base64EntityIdGenerator'),
    
    Handlers: Symbol.for('Handlers'),

    ConnectHandler: Symbol.for('ConnectHandler'),
    DirectHandler: Symbol.for('DirectHandler'),
    TakeHandler: Symbol.for('TakeHandler'),
    FireHandler: Symbol.for('FireHandler'),
    BattleJoinHandler: Symbol.for('BattleJoinHandler'),
    BattleFireHandler: Symbol.for('BattleFireHandler'),
    BattleDirectHandler: Symbol.for('BattleDirectHandler'),
    GetSectorsHandler: Symbol.for('GetSectorsHandler'),
    GetAboutSectorHandler: Symbol.for('GetAboutSectorHandler'),
    GetUserHandler: Symbol.for('GetUserHandler'),
    
    PointerRepository: Symbol.for('PointerRepository'),
    ZoneRepository: Symbol.for('ZoneRepository'),
    WeaponRepository: Symbol.for('WeaponRepository'),
    SectorRepository: Symbol.for('SectorRepository'),

    connection: Symbol.for('connection'),
    SnapshotSectors: Symbol.for('SnapshotSectors'),
    
}

export { TYPES }
