import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Core } from 'src/common/entities/core.entity';
import { EmployType } from '../entities/announcement.entity';

interface IAnnouncement {
  id: number;
  createdAt: Date;
  companyName: string;
  dueDate: Date;
  career?: number;
  employType: EmployType;
  location: string;
  latitude: number;
  longitude: number;
  jobs: string[];
  localGrade: number;
}

export class GetAnnouncementsQuery {
  locationInfo: string;
  job: string;
  career: string;
  local: string;
}

export class GetAnnouncementsOutput extends PickType(Core, ['error', 'ok']) {
  @ApiPropertyOptional()
  announcements?: IAnnouncement[];
}
