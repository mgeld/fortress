export function mapToArray<T>(map: Map<any, any>): T[] {
    return Array.from(map, (entry: any) => entry[1])
} 