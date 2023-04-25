import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from '../message//message.service';
import { UseGuards } from '@nestjs/common';
import { SocketsGuard } from './sockets.guard';
import { User } from '../user/entities/user.entity';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  private messageService: MessageService;

  @WebSocketServer() server: Server;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  @UseGuards(SocketsGuard)
  @SubscribeMessage('chat')
  async handleEvent(@MessageBody() data: { message: string; user: User }) {
    const response = await this.messageService.saveMessage({
      fromUser: data.user.id,
      text: data.message,
    });

    this.server.emit('chat', response);
  }
}
