import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class SocketsGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {
    this.userService = userService;
    this.configService = configService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const bearerToken: string = client.handshake.auth?.token?.split(' ')[1];
    try {
      // TODO: This should be async
      const decoded = jwt.verify(
        bearerToken,
        this.configService.get('jwt.secretKey')
      );

      if (typeof decoded === 'string') {
        throw new Error('Invalid token format');
      }

      const user = await this.userService.getUserById(decoded.id);
      if (!user) {
        throw new Error('No user found');
      }

      context.switchToWs().getData().user = user;

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
