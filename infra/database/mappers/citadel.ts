import { Citadel, UnmarshalledCitadel } from "../../../entities/citadel/citadel";

export class CitadelMapper {
    public static toDomain(citadel: UnmarshalledCitadel): Citadel {
        return Citadel.create(citadel)
    }
}