import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../models';
import { UserAlreadyExists, UserDoesNotExists } from '../shared/errors';
import { LoginDto } from '../models/login.dto';

@Controller({ path: '/users' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/')
  async createUser(@Body() body: UserDto) {
    try {
      const user = await this.userService.createUser(body);
      return user;
    } catch (err) {
      if (err instanceof UserAlreadyExists) {
        throw new BadRequestException(err.message);
      }

      throw err;
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    try {
      const token = await this.userService.login(body);
      return { token };
    } catch (err) {
      if (err instanceof UserDoesNotExists) {
        throw new BadRequestException(err.message);
      }

      throw err;
    }
  }

  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
