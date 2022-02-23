import { ApiProperty, PickType } from '@nestjs/swagger';
import { Core } from 'src/common/entities/core.entity';
import Announcement from '../entities/announcement.entity';

export class CreateAnnouncementInput extends PickType(Announcement, [
  'createdAt',
  'companyName',
  'dueDate',
  'career',
  'employType',
  'location',
  'latitude',
  'longitude',
]) {
  @ApiProperty({ description: '직무들' })
  jobs: string[];
}

export class CreateAnnouncementOutput extends PickType(Core, ['error', 'ok']) {}
