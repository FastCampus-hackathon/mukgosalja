import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Core } from 'src/common/entities/core.entity';
import Restaurant from '../entities/restaurant.entity';

export class GetRestaurantsQuery {
  locationInfo: string;
}

export class GetRestaurantsOutput extends PickType(Core, ['error', 'ok']) {
  @ApiPropertyOptional({ type: [Restaurant] })
  restaurants?: Restaurant[];
}
