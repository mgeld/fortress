import { injectable } from "inversify"

class Takes {
  private sectors: Record<string, string> = {}

  add<T extends string>(value: T): T {
    this.sectors[value] = value
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