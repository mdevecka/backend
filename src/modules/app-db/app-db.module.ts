import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository, NftRepository, PublicRepository, AiRepository } from './repositories';
import { filterEntities } from '@common/helpers';
import * as entities from './entities';

const allEntities = filterEntities(Object.values(entities));

@Module({
  imports: [TypeOrmModule.forFeature(allEntities)],
  providers: [AdminRepository, NftRepository, PublicRepository, AiRepository],
  exports: [AdminRepository, NftRepository, PublicRepository, AiRepository],
})
export class AppDbModule { }
