import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { MyRestaurantsOutput } from './dtos/my-restaurants.dto';
import { Restaurant } from './entities/restaurants.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createRestaurant(
    user: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      await this.restaurants.save(
        this.restaurants.create(createRestaurantInput),
      );

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async myRestaurants(user: User): Promise<MyRestaurantsOutput> {
    try {
      const restaurants = await this.restaurants.find({ owner: user });
      if (restaurants) {
        return {
          ok: true,
          restaurants,
        };
      }
      return {
        ok: false,
        error: 'Do not have restaurants.',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
