import { Member, UnmarshalledMember } from "../../../entities/arena/arena-team-member";

export class MemberMapper {
    public static toDomain(member: UnmarshalledMember): Member {
        return Member.create(member)
    }
}