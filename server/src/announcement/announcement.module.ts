import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalGradeModule } from 'src/local-grade/local-grade.module';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import AnnouncementJob from './entities/announcement-job.entity';
import Announcement from './entities/announcement.entity';
import Job from './entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement, Job, AnnouncementJob]),
    LocalGradeModule,
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule {}
