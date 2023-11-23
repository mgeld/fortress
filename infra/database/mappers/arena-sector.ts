import { ArenaSector, UnmarshalledArenaSector } from "../../../entities/arena/sector";

export class ArenaSectorMapper {
    public static toDomain(sector: UnmarshalledArenaSector): ArenaSector {
        return ArenaSector.create(sector)
    }
}