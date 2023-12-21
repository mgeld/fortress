import { injectable } from "inversify"

class Takes {
  private data: Record<string, string> = {}

  add<T extends string>(value: T): T {
    this.data[value] = value

    console.log('Logs takes add', value)
    return value
  }

  clear() {
    this.data = {}
  }

  get(): string[] {
    return Object.values(this.data) as string[]
  }
}


@injectable()
export class Logs {
  public takes = new Takes()
}