import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../app/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  createUsers(): Array<Promise<User>> {
    const users = [
      User.create({
        id: 'ac128ccc-3966-4d5b-a17b-831a1d84e952',
        name: 'Test User',
        email: 'test@subflow.com',
        password: bcrypt.hashSync('password', 10),
      }),
    ];

    return users.map(async (user: User) => {
      return await this.userRepository.save(user);
    });
  }
}
