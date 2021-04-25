import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/core/core.decorator';
import { isLoggedGuard, Role } from 'src/core/core.guard';
import { User, UserRole } from 'src/users/entities/users.entity';
import {
  EditStatusOrderInput,
  EditStatusOrderOutput,
} from './dtos/edit-status-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { OrderInput, OrderOutput } from './dtos/order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

const pubSub = new PubSub();

@Resolver((of) => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation((returns) => OrderOutput)
  @Role(UserRole.Client)
  order(@CurrentUser() user: User, @Args('input') orderInput: OrderInput) {
    return this.ordersService.order(user, orderInput);
  }

  @Query((returns) => GetOrderOutput)
  @UseGuards(isLoggedGuard)
  getOrder(
    @CurrentUser() user: User,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.ordersService.getOrder(getOrderInput);
  }

  @Mutation((returns) => EditStatusOrderOutput)
  @UseGuards(isLoggedGuard)
  editOrder(
    @CurrentUser() user: User,
    @Args('input') editStatusOrderInput: EditStatusOrderInput,
  ): Promise<EditStatusOrderOutput> {
    return this.ordersService.editOrder(user, editStatusOrderInput);
  }

  @Mutation((returns) => Boolean)
  @UseGuards(isLoggedGuard)
  @Role(UserRole.Client)
  hiMutation(@CurrentUser() user: User) {
    console.log(user);
    pubSub.publish('hi', { hiSubscription: 'true' });
    return true;
  }

  @Subscription((returns) => String)
  @Role(UserRole.Client)
  hiSubscription() {
    return pubSub.asyncIterator('hi');
  }
}
