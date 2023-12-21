import { injectable } from 'inversify';
import crypto from 'crypto'

// import { v4 as uuidv4,  } from 'uuid';

class Base64UID {
    public static generate(): string {
        // return Buffer.from(uuidv4()).toString('base64')
        // const arr: Record<string, number> = {}
        // let i = 0
        // while(i < 100000) {
        //     const j = crypto.randomBytes(8).toString('base64').replace('=', '').length
        //     arr[j] = 1
        //     i++
        // }
        return crypto.randomBytes(8).toString('base64').replace('=', '')
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