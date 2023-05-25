const TYPES = {
    Server: Symbol.for('Server'),
    Rooms: Symbol.for('Rooms'),

    Database: Symbol.for('Database'),

    ArenaService: Symbol.for('ArenaService'),
    PointerService: Symbol.for('PointerService'),
    WeaponService: Symbol.for('WeaponService'),
    
    ArenaMemoryRepository: Symbol.for('ArenaMemoryRepository'),
    PointerMemoryRepository: Symbol.for('PointerMemoryRepository'),
    WeaponMemoryRepository: Symbol.for('WeaponMemoryRepository'),

    Base64EntityIdGenerator: Symbol.for('Base64EntityIdGenerator'),
    
    Handlers: Symbol.for('Handlers'),

    ConnectHandler: Symbol.for('ConnectHandler'),
    DirectHandler: Symbol.for('DirectHandler'),
    FireHandler: Symbol.for('FireHandler'),
    BattleJoinHandler: Symbol.for('BattleJoinHandler'),

}

export { TYPES }
