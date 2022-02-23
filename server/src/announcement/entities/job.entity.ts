import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import AnnouncementJob from './announcement-job.entity';

@Entity()
class Job {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @OneToMany(
    (type) => AnnouncementJob,
    (announcementJob) => announcementJob.announcement,
  )
  announcements: AnnouncementJob[];
}

export default Job;
