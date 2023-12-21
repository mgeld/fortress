import { TYPES } from "../types"
import { inject, injectable } from "inversify"
import { Member, UnmarshalledMember } from "../entities/arena/arena-team-member"
import { IArenaTeamMemberRepository } from "../entities/repository"

@injectable()
export class MemberService {
    @inject(TYPES.MemberMemoryRepository) private _repository!: IArenaTeamMemberRepository

    insert(member: Member): Promise<Member> {
        return this._repository.insert(member)
    }

    getById(userId: number): Promise<Member> {
        return this._repository.getById(userId)
    }

    getByIds(userIds: number[]): Promise<Member[]> {
        console.log('getByIds userIds', userIds)
        return this._repository.getByIds(userIds)
    }

    // getDTOByIds(userIds: number[]): Promise<UnmarshalledMember[]> {
    //     return this._repository.getDTOByIds(userIds)
    // }
    
    async update(member: Member) {
        await this._repository.update(member)
    }

    remove(userId: number) {
        this._repository.delete(userId)
    }
}