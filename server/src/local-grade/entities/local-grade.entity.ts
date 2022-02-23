import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class LocalGrade {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column()
  public localName: string;

  @ApiProperty()
  @Column()
  public grade: number;
}

export default LocalGrade;
