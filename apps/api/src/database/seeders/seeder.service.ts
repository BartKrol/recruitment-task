import { Injectable, Logger } from '@nestjs/common';
import { UserSeederService } from './user/user-seeder.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private readonly userSeederService: UserSeederService
  ) {}

  async seed() {
    await this.users()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async users() {
    return await Promise.all(this.userSeederService.createUsers())
      .then((createdUsers) => {
        this.logger.debug(
          'No. of Users created : ' + createdUsers.filter((x) => x).length
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
