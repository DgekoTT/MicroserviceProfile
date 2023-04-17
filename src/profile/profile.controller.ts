import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from "@nestjs/common";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {ProfileService} from "./profile.service"
import {ClientProxy, EventPattern, MessagePattern} from "@nestjs/microservices";
import {Profile} from "./profile.model";


@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService,
                @Inject("PROF_SERVICE") private readonly client: ClientProxy) {}

    @MessagePattern({cmd:'updateProf'})
    updateProfile(@Body() dto: UpdateProfileDto) {
        return this.profileService.updateProfile(dto);
    }

    @MessagePattern({cmd:'getProfile'})
    async getProfileById(id: number): Promise<Profile>{
        const Prof = await this.profileService.getProfileById(+id);
        return Prof;
    }

    @EventPattern('creatProfile')
    async createProfile(data: any){
        data = JSON.parse(data);
        await this.profileService.createProfile(data)
    }

    @MessagePattern({cmd:'delProfile'})
    async deleteProfile(id: string): Promise<number>{
        const Prof = await this.profileService.deleteProfile(+id);
        return Prof;
    }

}