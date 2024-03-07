import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from '../models/order.dto';
import { OrderService } from '../services/orders.service';

@Controller({ path: '/orders' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  async createOrder(@Body() body: OrderDto) {
    const order = await this.orderService.createOrder(body);

    return order;
  }
}
