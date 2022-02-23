import { ApiProperty, PickType } from '@nestjs/swagger';
import { Core } from 'src/common/entities/core.entity';
import Restaurant from '../entities/restaurant.entity';

export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'address',
  'kindOf',
  'latitude',
  'longitude',
]) {
  @ApiProperty({ description: '소속구' })
  local: string;
}

export class CreateRestaurantOutput extends PickType(Core, ['error', 'ok']) {}
