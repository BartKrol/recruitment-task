import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: userId });
  }

  public async getUserByEmail(email: string): Promise<User> {
    const normalizedEmail = email.toLowerCase();
    return this.userRepository.findOne({
      where: { email: normalizedEmail },
    });
  }
}
