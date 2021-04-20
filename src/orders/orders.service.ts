import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { OrderInput, OrderOutput } from './dtos/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orders: Repository<Order>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Dish) private readonly dishes: Repository<Dish>,
  ) {}

  checkDishExisted = async (dishList: number[]): Promise<[boolean, Dish[]]> => {
    let result = true;
    let getDishes: Dish[] = [];
    //foreach는 async/await 사용 못함.
    for (const dish of dishList) {
      const isExist = await this.dishes.findOne({ id: dish });
      if (!isExist) {
        result = false;
      } else {
        getDishes.push(isExist);
      }
    }
    return [result, getDishes];
  };

  async order(user: User, orderInput: OrderInput): Promise<OrderOutput> {
    try {
      const { dishesId, dishOption } = orderInput;
      const [check, getDishes] = await this.checkDishExisted(dishesId);
      if (!check) {
        return {
          ok: false,
          error: 'One or more of the selected foods is invalid.',
        };
      }
      if (dishOption) {
        await this.orders.save(
          this.orders.create({ client: user, dishes: getDishes, dishOption }),
        );
        return {
          ok: true,
        };
      } else {
        await this.orders.save(
          this.orders.create({ client: user, dishes: getDishes }),
        );
        return {
          ok: true,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getOrder(getOrderInput: GetOrderInput): Promise<GetOrderOutput> {
    try {
      const { id } = getOrderInput;
      const order = await this.orders.findOne({ id });
      if (!order) {
        return {
          ok: false,
          error: 'Order not found.',
        };
      }
      return {
        ok: true,
        order,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}