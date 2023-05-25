import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

class Base64UID {
    public static generate(): string {
        return Buffer.from(uuidv4()).toString('base64')
    }
}

export interface EntityIdGenerator {
    nextIdEntity(): EntityId
}

export class EntityId {
    private _id: string

    constructor(id: string) {
        this._id = id
    }
    get id() {
        return this._id
    }
}

@injectable()
export class Base64EntityIdGenerator implements EntityIdGenerator {
    nextIdEntity(): EntityId {
        return new EntityId(Base64UID.generate())
    }
}