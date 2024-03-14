import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderDto } from '../models/order.dto';
import { OrderService } from '../services/orders.service';
import { UserLeanDoc } from '../schema';

@Controller({ path: '/orders' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  async createOrder(
    @Body() body: OrderDto,
    @Req() req: Request & { user: UserLeanDoc },
  ) {
    const { user } = req;

    const order = await this.orderService.createOrder({
      ...body,
      login: user.login,
    });

    return order;
  }
}
