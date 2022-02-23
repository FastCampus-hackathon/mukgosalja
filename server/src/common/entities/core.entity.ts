import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Core {
  @ApiPropertyOptional({ description: `에러 내용` })
  error?: string;

  @ApiProperty({ description: `요청에 대한 결과` })
  ok: boolean;
}
