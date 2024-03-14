import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDoc, UserLeanDoc, Users } from '../schema';
import { Model } from 'mongoose';
import { NextFunction } from 'express';

@Injectable()
export class UserAuthorizationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UserDoc>,
  ) {}

  async use(
    req: Request & { user: UserLeanDoc },
    res: Response,
    next: NextFunction,
  ) {
    // const { authorization, qwerty } = req.headers as any;
    const { authorization } = req.headers as unknown as {
      authorization: string;
    };

    if (!authorization) {
      throw new UnauthorizedException('User do not provide auth token');
    }

    const user = await this.userModel.findOne({ token: authorization });

    if (!user) {
      throw new BadRequestException(`User with such token was not found`);
    }

    req.user = user.toObject();

    next();
  }
}
