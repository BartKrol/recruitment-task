import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../../config/configuration';

import { UserSeederModule } from './user/user-seeder.module';

import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const defaultConnection = configService
          .get('database')
          .find((x) => x.name === 'default');

        return {
          ...defaultConnection,
        };
      },
    }),
    UserSeederModule,
  ],
  providers: [Logger, SeederService],
})
export class SeederModule {}
