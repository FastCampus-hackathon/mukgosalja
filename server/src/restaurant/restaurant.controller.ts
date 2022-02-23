import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import {
  GetRestaurantsOutput,
  GetRestaurantsQuery,
} from './dtos/get-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('식당 정보 API')
@Controller('v1/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ApiOperation({
    summary: '식당 정보 생성 API',
    description: '식당 정보를 생성한다 (경우에 따라 job도 생성)',
  })
  @ApiCreatedResponse({
    description: '식당 정보 생성 API 결과값',
    type: CreateRestaurantOutput,
  })
  @Post()
  async createRestaurant(
    @Body() createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(createRestaurantInput);
  }

  @ApiOperation({
    summary: '식당 정보 읽기 API',
    description: '식당 정보를 읽는다',
  })
  @ApiCreatedResponse({
    description: '식당 정보 읽기 API 결과값',
    type: GetRestaurantsOutput,
  })
  @ApiQuery({
    name: 'locationInfo',
    description: '"LTX LTY RTX RTY RDX RDY LDX LDY"로 이뤄진 단일 string값',
  })
  @Get()
  getRestaurants(
    @Query() querys: GetRestaurantsQuery,
  ): Promise<GetRestaurantsOutput> {
    return this.restaurantService.getRestaurants(querys);
  }
}
