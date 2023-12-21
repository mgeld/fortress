const TYPES = {
    Server: Symbol.for('Server'),
    PingPong: Symbol.for('PingPong'),
    Rooms: Symbol.for('Rooms'),

    Database: Symbol.for('Database'),
    Logs: Symbol.for('Logs'),

    ArenaService: Symbol.for('ArenaService'),
    ArenaTeamService: Symbol.for('ArenaTeamService'),
    MemberService: Symbol.for('MemberService'),
    ArenaSectorService: Symbol.for('ArenaSectorService'),

    PointerService: Symbol.for('PointerService'),
    ZoneService: Symbol.for('ZoneService'),
    WeaponService: Symbol.for('WeaponService'),
    SectorService: Symbol.for('SectorService'),
    CitadelService: Symbol.for('CitadelService'),
    VkUserService: Symbol.for('VkUserService'),

    ArenaRepository: Symbol.for('ArenaRepository'),

    ArenaMemoryRepository: Symbol.for('ArenaMemoryRepository'),
    ArenaTeamMemoryRepository: Symbol.for('ArenaTeamMemoryRepository'),
    MemberMemoryRepository: Symbol.for('MemberMemoryRepository'),
    ArenaSectorMemoryRepository: Symbol.for('ArenaSectorMemoryRepository'),

    PointerMemoryRepository: Symbol.for('PointerMemoryRepository'),
    ZoneMemoryRepository: Symbol.for('ZoneMemoryRepository'),
    WeaponMemoryRepository: Symbol.for('WeaponMemoryRepository'),
    SectorMemoryRepository: Symbol.for('SectorMemoryRepository'),
    
    ArealMemoryRepository: Symbol.for('ArealMemoryRepository'),
    CitadelMemoryRepository: Symbol.for('CitadelMemoryRepository'),
    CitadelRepository: Symbol.for('CitadelRepository'),
    VkUserRepository: Symbol.for('VkUserRepository'), 
    VkUserMemoryRepository: Symbol.for('VkUserMemoryRepository'), 
    
    Base64EntityIdGenerator: Symbol.for('Base64EntityIdGenerator'),
    
    Handlers: Symbol.for('Handlers'),

    ConnectHandler: Symbol.for('ConnectHandler'),
    EditZoneHandler: Symbol.for('EditZoneHandler'),
    
    DirectHandler: Symbol.for('DirectHandler'),
    TakeHandler: Symbol.for('TakeHandler'),
    BattleTakeHandler: Symbol.for('BattleTakeHandler'),
    BeamHandler: Symbol.for('BeamHandler'),
    FireHandler: Symbol.for('FireHandler'),
    BattleJoinHandler: Symbol.for('BattleJoinHandler'),
    BattleLeaveHandler: Symbol.for('BattleLeaveHandler'),
    BattleFireHandler: Symbol.for('BattleFireHandler'),
    BattleDirectHandler: Symbol.for('BattleDirectHandler'),
    GetSectorsHandler: Symbol.for('GetSectorsHandler'),
    GetAboutSectorHandler: Symbol.for('GetAboutSectorHandler'),
    BattleGetAboutSectorHandler: Symbol.for('BattleGetAboutSectorHandler'),
    
    GetUserHandler: Symbol.for('GetUserHandler'),
    UseExtractionHandler: Symbol.for('UseExtractionHandler'),
    BuyUnitHandler: Symbol.for('BuyUnitHandler'),
    LevelUpHandler: Symbol.for('LevelUpHandler'),
    
    GetRatingHandler: Symbol.for('GetRatingHandler'),
    GetSatelliteHandler: Symbol.for('GetSatelliteHandler'),
    GetSatelliteFortHandler: Symbol.for('GetSatelliteFortHandler'),
    DelExtractionHandler: Symbol.for('DelExtractionHandler'),
    
    PointerRepository: Symbol.for('PointerRepository'),
    ZoneRepository: Symbol.for('ZoneRepository'),
    WeaponRepository: Symbol.for('WeaponRepository'),
    SectorRepository: Symbol.for('SectorRepository'),

    connection: Symbol.for('connection'),
    
    SnapshotAreals: Symbol.for('SnapshotAreals'),
    SnapshotArenas: Symbol.for('SnapshotArenas'),
    VkCallback: Symbol.for('VkCallback'), 

    BattleService: Symbol.for('BattleService'),

}

export { TYPES }
