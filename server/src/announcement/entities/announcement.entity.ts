import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import AnnouncementJob from './announcement-job.entity';

export enum EmployType {
  NON_REGULAR = 'NON_REGULAR',
  REGULAR = 'REGULAR',
}

@Entity()
class Announcement {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ description: '생성 시간' })
  @Column({ type: Date })
  public createdAt: Date;

  @ApiProperty({ description: '회사명' })
  @Column()
  public companyName: string;

  @ApiProperty({ description: '공고 마감일' })
  @Column({ type: Date })
  public dueDate: Date;

  @ApiProperty({ description: '경력', type: Number, minimum: 0 })
  @Column()
  public career?: number;

  @ApiProperty({ description: `"NON_REGULAR" or "REGULAR"` })
  @Column({ type: 'enum', enum: EmployType })
  public employType: EmployType;

  @ApiProperty({ description: `주소` })
  @Column()
  public location: string;

  @ApiProperty({ description: `위도` })
  @Column({ type: 'numeric' })
  public latitude: number;

  @ApiProperty({ description: `경도` })
  @Column({ type: 'numeric' })
  public longitude: number;

  @OneToMany(
    (type) => AnnouncementJob,
    (announcementJob) => announcementJob.announcement,
  )
  jobs: AnnouncementJob[];
}

export default Announcement;
