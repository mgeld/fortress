import { injectable } from "inversify"

class Takes {
  private sectors: Record<string, string> = {}

  add<T extends string>(value: T): T {
    this.sectors[value] = value

    console.log('Logs takes add', value)
    console.log('Logs takes sectors', this.sectors)
    return value
  }

  clear() {
    this.sectors = {}
  }

  get(): string[] {
    return Object.values(this.sectors) as string[]
  }
}


@injectable()
export class Logs {
  public takes = new Takes()
}