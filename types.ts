const TYPES = {
    Server: Symbol.for('Server'),
    Rooms: Symbol.for('Rooms'),

    Database: Symbol.for('Database'),

    ArenaService: Symbol.for('ArenaService'),
    PointerService: Symbol.for('PointerService'),
    MemberService: Symbol.for('MemberService'),
    WeaponService: Symbol.for('WeaponService'),
    
    ArenaMemoryRepository: Symbol.for('ArenaMemoryRepository'),
    PointerMemoryRepository: Symbol.for('PointerMemoryRepository'),
    WeaponMemoryRepository: Symbol.for('WeaponMemoryRepository'),
    MemberMemoryRepository: Symbol.for('MemberMemoryRepository'),

    Base64EntityIdGenerator: Symbol.for('Base64EntityIdGenerator'),
    
    Handlers: Symbol.for('Handlers'),

    ConnectHandler: Symbol.for('ConnectHandler'),
    DirectHandler: Symbol.for('DirectHandler'),
    FireHandler: Symbol.for('FireHandler'),
    BattleJoinHandler: Symbol.for('BattleJoinHandler'),
    BattleFireHandler: Symbol.for('BattleFireHandler'),
    BattleDirectHandler: Symbol.for('BattleDirectHandler'),

}

export { TYPES }
