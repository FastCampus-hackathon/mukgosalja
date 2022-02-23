import { ApiProperty, PickType } from '@nestjs/swagger';
import { Core } from 'src/common/entities/core.entity';
import LocalGrade from '../entities/local-grade.entity';

export class CreateLocalGradeInput extends PickType(LocalGrade, [
  'localName',
  'grade',
]) {}

export class CreateLocalGradeOutput extends PickType(Core, ['error', 'ok']) {}
