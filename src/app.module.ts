import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import {Profile} from "./profile/profile.model";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {ClientsModule, Transport} from "@nestjs/microservices";


@Module({
  imports: [ProfileModule,
    ClientsModule.register([
      {
        name: 'Profile_Service',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    // ConfigModule.forRoot({
    //   envFilePath: `.${process.env.NODE_ENV}.env`   /*получаем конфигурации
    //      для разработки и для продакшена, нужно npm i cross-env*/
    // }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "Profiles",
      models: [Profile],
      autoLoadModels: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
