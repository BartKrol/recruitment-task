import { Expose } from 'class-transformer';

export class LoginRequestDto {
  constructor(partial: Partial<LoginRequestDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  email: string;

  @Expose()
  password: string;
}
