import { Sector, UnmarshalledSector } from "../../../entities/sector/sector";

export class SectorMapper {
    public static toDomain(sector: UnmarshalledSector): Sector {
        return Sector.create(sector)
    }
}