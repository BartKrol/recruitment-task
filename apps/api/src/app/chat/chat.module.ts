import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { SocketsGuard } from './sockets.guard';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule, UserModule],
  providers: [ChatGateway, SocketsGuard],
})
export class ChatModule {}
