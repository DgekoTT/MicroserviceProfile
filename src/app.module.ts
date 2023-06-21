import { Module } from '@nestjs/common';
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
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`   /*получаем конфигурации
         для разработки и для продакшена, нужно npm i cross-env*/
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Profile],
      autoLoadModels: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
