import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalGradeService } from 'src/local-grade/local-grade.service';
import { getManager, Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import {
  GetRestaurantsOutput,
  GetRestaurantsQuery,
} from './dtos/get-restaurant.dto';
import Restaurant from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async createRestaurant({
    name,
    address,
    kindOf,
    latitude,
    longitude,
    local,
  }: CreateRestaurantInput): Promise<CreateRestaurantOutput> {
    try {
      await this.restaurantRepo.save(
        this.restaurantRepo.create({
          name,
          address,
          kindOf,
          latitude,
          longitude,
          local,
        }),
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

  async getRestaurants({
    locationInfo,
  }: GetRestaurantsQuery): Promise<GetRestaurantsOutput> {
    try {
      const [ltX, ltY, rtX, rtY, rdX, rdY, ldX, ldY] = locationInfo
        .split(' ')
        .map((v) => Number(v));

      const entityManager = getManager();
      const restaurants: Restaurant[] = await entityManager.query(
        `
        select * from restaurant where (latitude BETWEEN $1 AND $2) AND (longitude BETWEEN $3 AND $4) LIMIT 50
      `,
        [ldX, ltX, ltY, rtY],
      );
      return {
        ok: true,
        restaurants,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
