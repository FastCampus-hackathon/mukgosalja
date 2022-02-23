import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getManager, Repository } from 'typeorm';
import AnnouncementJob from './entities/announcement-job.entity';
import Announcement from './entities/announcement.entity';
import Job from './entities/job.entity';
import {
  CreateAnnouncementInput,
  CreateAnnouncementOutput,
} from './dtos/create-announcement.dto';
import {
  GetAnnouncementsOutput,
  GetAnnouncementsQuery,
} from './dtos/get-announcements.dto';
import { LocalGradeService } from 'src/local-grade/local-grade.service';

@Injectable()
export class AnnouncementService {
  constructor(
    private connection: Connection,

    @InjectRepository(Announcement)
    private readonly announcementRepo: Repository<Announcement>,

    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,

    @InjectRepository(AnnouncementJob)
    private readonly announcementJobRepo: Repository<AnnouncementJob>,

    private readonly localGradeService: LocalGradeService,
  ) {}

  async createAnnouncement({
    createdAt,
    companyName,
    dueDate,
    career,
    employType,
    location,
    latitude,
    longitude,
    jobs,
  }: CreateAnnouncementInput): Promise<CreateAnnouncementOutput> {
    let isOk = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newAnnouncement = this.announcementRepo.create({
        createdAt,
        companyName,
        dueDate,
        career,
        employType,
        location,
        latitude,
        longitude,
      });
      const announcement = await queryRunner.manager.save(newAnnouncement);

      let newJobs = [];
      for (let i = 0; i < jobs.length; i++) {
        const jobName = jobs[i];
        const foundJob = await queryRunner.manager.findOne(Job, {
          name: jobName,
        });
        if (foundJob) {
          newJobs.push(foundJob);
          continue;
        } else {
          const newJob = this.jobRepo.create({ name: jobName });
          const job = await queryRunner.manager.save(newJob);
          newJobs.push(job);
        }
      }

      for (let i = 0; i < newJobs.length; i++) {
        const job = newJobs[i];
        const newAnnouncementJob = this.announcementJobRepo.create({
          announcement,
          job,
        });
        await queryRunner.manager.save(newAnnouncementJob);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      isOk = false;
    } finally {
      await queryRunner.release();
      if (isOk) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'something is wrong',
        };
      }
    }
  }

  async getAnnouncements({
    locationInfo,
    job: jobName,
    career,
    local,
  }: GetAnnouncementsQuery): Promise<GetAnnouncementsOutput> {
    try {
      const [ltX, ltY, rtX, rtY, rdX, rdY, ldX, ldY] = locationInfo
        .split(' ')
        .map((v) => Number(v));

      const entityManager = getManager();
      const results: Announcement[] = await entityManager.query(
        `
        select * from (select DISTINCT ON ("companyName") * from announcement where (latitude BETWEEN $1 AND $2) AND (longitude BETWEEN $3 AND $4)) as T where (career <= $5) AND ("dueDate" >= now()) order by "dueDate" LIMIT 50
      `,
        [ldX, ltX, ltY, rtY, Number(career)],
      );

      let announcements = [];
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const localName = result.location
          .split(' ')
          .filter((v) => v.includes('구'))[0];

        const { grade: localGrade } =
          await this.localGradeService.getLocalGrade(
            localName ? localName : local,
          );
        if (!localGrade) {
          throw Error('The local grade NotFound');
        }

        const announcement = {
          ...results[i],
          job: [jobName],
          localGrade,
        };
        announcements.push(announcement);
      }

      return {
        ok: true,
        announcements,
      };
    } catch (error) {
      return;
    }
  }
}
