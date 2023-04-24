import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => {
  const defaultConnection: TypeOrmModuleOptions = {
    name: 'default',
    type: 'postgres',
    logging: false,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    autoLoadEntities: true,
    migrationsRun: false,
    synchronize: false,
  };

  const migrationConnection = {
    name: 'migration',
    type: 'postgres',
    logging: false,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    migrationsTransactionMode: 'all',
    entities: ['apps/api/src/**/*.entity.ts'],
    migrations: ['apps/api/src/database/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'apps/api/src/database/migrations',
    },
  };

  return {
    database: [defaultConnection, migrationConnection],
    jwt: {
      secretKey: process.env.JWT_SK,
      expiresIn: '1h',
    },
  };
};
