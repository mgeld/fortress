import { injectable } from 'inversify'

class Collection {
  private data: Record<string | number, unknown> = {}

  async findAll<T>(): Promise<T[]> {
    console.log('findAll', Object.values(this.data))
    return Object.values(this.data) as T[]
  }

  async getById<T>(id: string | number): Promise<T> {
    return this.data[id] as T
  }

  async getByIds<T>(ids: string[] | number[]): Promise<T[]> {
    return ids.map(id => this.data[id] as T)
  }

  async insert<T extends { id: string | number }>(value: T): Promise<T> {
    this.data[value.id] = value
    return value
  }

  async count() {
    return Object.values(this.data).length
  }

  async update<T>(id: string | number, value: T): Promise<T> {
    this.data[id] = value
    return this.data[id] as T
  }

  async delete(id: string | number): Promise<Boolean> {
    return delete this.data[id]
  }
  
}

@injectable()
export class MemoryData {
  public pointer = new Collection()
  public zone = new Collection()
  public citadel = new Collection()
  public areal = new Collection()
  public arena = new Collection()
  // public arenaTeam = new Collection()
  public arenaTeamMember = new Collection()
  public arenaSector = new Collection()
  public weapon = new Collection()
  public bomb = new Collection()
  public sector = new Collection()
}
