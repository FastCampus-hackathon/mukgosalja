import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateLocalGradeInput,
  CreateLocalGradeOutput,
} from './dtos/create-local-grade.dto';
import { LocalGradeService } from './local-grade.service';

@ApiTags('지역별 등급 API')
@Controller('v1/local-grade')
export class LocalGradeController {
  constructor(private readonly localGradeService: LocalGradeService) {}

  @ApiOperation({
    summary: '지역별 등급 생성 API',
    description: '지역별 등급을 생성한다',
  })
  @ApiCreatedResponse({
    description: '지역별 등급 생성 API 결과값',
    type: CreateLocalGradeOutput,
  })
  @Post()
  createLocalGrade(
    @Body() createLocalGradeInput: CreateLocalGradeInput,
  ): Promise<CreateLocalGradeOutput> {
    return this.localGradeService.createLocalGrade(createLocalGradeInput);
  }
}
