import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalGrade from './entities/local-grade.entity';
import { LocalGradeController } from './local-grade.controller';
import { LocalGradeService } from './local-grade.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocalGrade])],
  controllers: [LocalGradeController],
  providers: [LocalGradeService],
  exports: [LocalGradeService],
})
export class LocalGradeModule {}
