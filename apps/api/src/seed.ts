import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './database/seeders/seeder.module';
import { SeederService } from './database/seeders/seeder.service';

async function bootstrap() {
  try {
    console.log('Seeding...');

    const appContext = await NestFactory.createApplicationContext(SeederModule);

    const logger = appContext.get(Logger);
    const seeder = appContext.get(SeederService);

    try {
      await seeder.seed();
      logger.debug('Seeding complete!');
    } catch (error) {
      logger.error('Seeding failed!', error.message);
    } finally {
      await appContext.close();
    }
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
