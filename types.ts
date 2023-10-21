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
    VkUserRepository: Symbol.for('VkUserRepository'),
    
    
    Base64EntityIdGenerator: Symbol.for('Base64EntityIdGenerator'),
    
    Handlers: Symbol.for('Handlers'),

    ConnectHandler: Symbol.for('ConnectHandler'),
    DirectHandler: Symbol.for('DirectHandler'),
    TakeHandler: Symbol.for('TakeHandler'),
    BeamHandler: Symbol.for('BeamHandler'),
    FireHandler: Symbol.for('FireHandler'),
    BattleJoinHandler: Symbol.for('BattleJoinHandler'),
    BattleLeaveHandler: Symbol.for('BattleLeaveHandler'),
    
    BattleFireHandler: Symbol.for('BattleFireHandler'),
    BattleDirectHandler: Symbol.for('BattleDirectHandler'),
    GetSectorsHandler: Symbol.for('GetSectorsHandler'),
    GetAboutSectorHandler: Symbol.for('GetAboutSectorHandler'),
    GetUserHandler: Symbol.for('GetUserHandler'),
    UseExtractionHandler: Symbol.for('UseExtractionHandler'),
    
    PointerRepository: Symbol.for('PointerRepository'),
    ZoneRepository: Symbol.for('ZoneRepository'),
    WeaponRepository: Symbol.for('WeaponRepository'),
    SectorRepository: Symbol.for('SectorRepository'),

    connection: Symbol.for('connection'),
    SnapshotSectors: Symbol.for('SnapshotSectors'),
    
}

export { TYPES }
