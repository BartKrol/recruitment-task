import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  public async getMessages(): Promise<Message[]> {
    return this.messageRepository.find({ where: {} });
  }

  public async saveMessage(message: {
    fromUser: string;
    text: string;
  }): Promise<Message> {
    const insert = new Message();
    insert.text = message.text;
    insert.fromUser = await this.userService.getUserById(message.fromUser);
    return this.messageRepository.save(insert);
  }
}
