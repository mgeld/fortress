import { TYPES } from '../../../../types'
import { MemoryData } from '../memory-data'
import { injectable, inject } from 'inversify'
import { MemberMapper } from '../../mappers/member'
import { IArenaTeamMemberRepository } from '../../../../entities/repository'
import { Member, UnmarshalledMember } from '../../../../entities/arena/arena-team-member'

@injectable()
export class MemberMemoryRepository implements IArenaTeamMemberRepository {
    @inject(TYPES.Database) private _database!: MemoryData

    async insert(member: Member): Promise<Member> {
        const dtoMember = member.unmarshal()
        const inserted = await this._database.arenaTeamMember.insert<UnmarshalledMember>(dtoMember)
        return MemberMapper.toDomain(inserted)
    }

    async getById(userId: number): Promise<Member> {
        const member = await this._database.arenaTeamMember.getById<UnmarshalledMember>(userId)
        if (!member) {
            throw new Error('----------')
        }
        return MemberMapper.toDomain(member)
    }

    async getByIds(userIds: number[]): Promise<Member[]> {
        try {
            const members = await this._database.arenaTeamMember.getByIds<UnmarshalledMember>(userIds)
            // if (!members) {
            //     throw new Error('----------')
            // }
            return members.map(member => MemberMapper.toDomain(member))
        } catch (e) {
            return []
        }
    }

    // async getDTOByIds(userIds: number[]): Promise<UnmarshalledMember[]> {
    //     try {
    //         const members = await this._database.arenaTeamMember.getByIds<UnmarshalledMember>(userIds)
    //         return members.map(member => member)
    //     } catch (e) {
    //         return []
    //     }
    // }

    async update(member: Member): Promise<Member> {
        const dtoMember = member.unmarshal()
        const updated = await this._database.arenaTeamMember.update<UnmarshalledMember>(
            dtoMember.id,
            dtoMember,
        )
        return MemberMapper.toDomain(updated)
    }

    async delete(userId: number): Promise<Boolean> {
        return await this._database.arenaTeamMember.delete(userId)
    }
}
