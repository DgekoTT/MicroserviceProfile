import {Body, Controller, Inject} from "@nestjs/common";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {ProfileService} from "./profile.service"
import {ClientProxy, EventPattern, MessagePattern} from "@nestjs/microservices";
import {Profile} from "./profile.model";


@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService,
                @Inject("PROF_SERVICE") private readonly client: ClientProxy) {}

    @MessagePattern({cmd:'updateProf'})
    updateProfile(@Body() dto: UpdateProfileDto) : Promise<UpdateProfileDto> {
        return this.profileService.updateProfile(dto);
    }

    @MessagePattern({cmd:'getProfile'})
    async getProfileById(id: number) : Promise<Profile> {
        return  await this.profileService.getProfileById(+id);
    }

    @EventPattern('creatProfile')
    async createProfile(data: any) : Promise<Profile>{
        data = JSON.parse(data);
        return await this.profileService.createProfile(data)
    }

    @MessagePattern({cmd:'delProfile'})
    async deleteProfile(id: string) : Promise<number>{
        return  await this.profileService.deleteProfile(+id);
    }

}