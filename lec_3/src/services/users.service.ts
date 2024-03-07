import { Injectable } from '@nestjs/common';
import { UserDto } from '../models';
import { Model } from 'mongoose';
import { UserDoc, Users } from '../schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserAlreadyExists, UserDoesNotExists } from '../shared/errors';
import { LoginDto } from '../models/login.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UserDoc>,
  ) {}

  async createUser(body: UserDto) {
    const isExist = await this.userModel.findOne({
      login: body.login,
    });

    if (isExist) {
      throw new UserAlreadyExists(body.login);
    }

    /**
     * Validation
     */
    const doc = new this.userModel(body);

    /**
     * Save into DB
     */
    const user = await doc.save();

    return user;
  }

  async login(body: LoginDto) {
    const user = await this.userModel.findOne({
      login: body.login,
      password: body.password,
    });

    if (!user) {
      throw new UserDoesNotExists(body.login);
    }

    user.token = randomUUID();

    await user.save();

    return user.token;
  }

  async getAllUsers() {
    const users = await this.userModel.find(
      {},
      { password: false, __v: false, token: false },
    );

    return users;
  }
}
