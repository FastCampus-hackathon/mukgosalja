import { ApiProperty } from '@nestjs/swagger';
import LocalGrade from 'src/local-grade/entities/local-grade.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Restaurant {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ description: '식당명' })
  @Column()
  public name: string;

  @ApiProperty({ description: '구분' })
  @Column()
  public kindOf: string;

  @ApiProperty({ description: '주소' })
  @Column()
  public address: string;

  @ApiProperty({ description: '위도' })
  @Column({ type: 'numeric' })
  public latitude: number;

  @ApiProperty({ description: '경도' })
  @Column({ type: 'numeric' })
  public longitude: number;

  @ApiProperty({ description: '소속구' })
  @Column()
  local: string;
}

export default Restaurant;
