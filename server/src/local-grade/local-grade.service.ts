import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateLocalGradeInput,
  CreateLocalGradeOutput,
} from './dtos/create-local-grade.dto';
import LocalGrade from './entities/local-grade.entity';

@Injectable()
export class LocalGradeService {
  constructor(
    @InjectRepository(LocalGrade)
    private readonly localGradeRepo: Repository<LocalGrade>,
  ) {}

  async createLocalGrade(
    createLocalGradeInput: CreateLocalGradeInput,
  ): Promise<CreateLocalGradeOutput> {
    try {
      const localGrade = await this.localGradeRepo.findOne({
        localName: createLocalGradeInput.localName,
      });
      if (localGrade) {
        throw new Error('The local is already regedit');
      }
      await this.localGradeRepo.save(
        this.localGradeRepo.create({ ...createLocalGradeInput }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getLocalGrade(localName: string) {
    try {
      return await this.localGradeRepo.findOne({ localName });
    } catch (error) {
      throw new Error('The local grade NotFound');
    }
  }
}
