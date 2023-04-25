import { Expose } from 'class-transformer';
import { UserResponseDto } from '../user/user.response.dto';

export class MessageResponseDto {
  constructor(partial: Partial<MessageResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  fromUser: UserResponseDto;

  @Expose()
  createdAt: Date;
}
