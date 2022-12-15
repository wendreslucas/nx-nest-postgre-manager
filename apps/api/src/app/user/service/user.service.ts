import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { Role, UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [
    {
      username: this.configService.get<string>('valid_username'),
      password: this.configService.get<string>('valid_password'),
      role: Role.Dashboard
    },
    {
      username: this.configService.get<string>('widget_username'),
      password: this.configService.get<string>('widget_password'),
      role: Role.Widget
    }
  ];

  constructor(private configService: ConfigService) { }

  async findUser(username: string): Promise<UserDto> {
    return this.users.find(user => user.username === username);
  }

  async findAndUpdateUser(username: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const index = this.users.findIndex((user: UserDto) => user.username === username); 
    return this.users[index] = Object.assign(this.users[index], updateUserDto);
  }
    
}
