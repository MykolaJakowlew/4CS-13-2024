import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Orders, OrdersDoc } from '../schema/orders.schema';
import { OrderDto } from '../models/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Orders.name)
    private readonly orderModel: Model<OrdersDoc>,
  ) {}

  async createOrder(order: OrderDto & { login: string }) {
    const price = 50;

    const doc = new this.orderModel({
      ...order,
      price,
    });

    const orderDoc = await doc.save();

    return orderDoc;
  }
}
