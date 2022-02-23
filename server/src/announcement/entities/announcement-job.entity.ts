import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Announcement from './announcement.entity';
import Job from './job.entity';

@Entity()
class AnnouncementJob {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne((type) => Announcement, (announcement) => announcement.jobs)
  public announcement: Announcement;

  @ManyToOne((type) => Job, (job) => job.announcements)
  public job: Job;
}

export default AnnouncementJob;
