import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                @Inject("PROF_SERVICE") private readonly client: ClientProxy) {
    }

    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create(dto);

        return profile;
    }

    async updateProfile(dto: UpdateProfileDto) {
        const candidate = await this.getProfileById(dto.id)
        this.checkerProfile(candidate);

        await this.profileRepository.update({...dto},{
            where: {
                id: dto.id
            }
        })
        return dto;
    }

    async deleteProfile(id: number) {
        let candidate = await this.getProfileById(id);
        this.checkerProfile(candidate);
        const success = await this.profileRepository.destroy({
            where: {
                userId: id
            }
        });

        return success;
    }

    async getProfileById(id: number) {
        const ourProfile = await this.profileRepository.findOne({where: {id}});
        return ourProfile;
    }

    checkerProfile(candidate:any) {
        if (!candidate) {
            throw new HttpException('Профиль с данным id не найден', HttpStatus.NOT_FOUND)
        }
    }
}