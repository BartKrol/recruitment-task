import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from './message.entity';
import { UserService } from '../user/user.service';
import { MessageResponseDto } from './message.response.dto';

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
  }): Promise<MessageResponseDto> {
    const insert = new Message();
    insert.text = message.text;
    insert.fromUser = await this.userService.getUserById(message.fromUser);
    const entity = await this.messageRepository.save(insert);
    return new MessageResponseDto(entity);
  }
}
