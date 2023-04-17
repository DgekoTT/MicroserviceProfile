import { Module } from '@nestjs/common';
import {ProfileController} from "./profile.controller";
import {ProfileService} from "./profile.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {ClientsModule, Transport} from "@nestjs/microservices";


@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [ClientsModule.register([
        {
            name: 'PROF_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'prof_queue',
                queueOptions: {
                    durable: false
                },
            },
        },
    ]),
        SequelizeModule.forFeature([Profile])]
})
export class ProfileModule {}
