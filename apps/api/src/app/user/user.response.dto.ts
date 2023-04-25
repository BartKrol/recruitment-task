import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  password: string;

}
