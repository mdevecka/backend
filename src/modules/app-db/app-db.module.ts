import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository, NftRepository } from './repositories';
import * as entities from './entities';

const allEntities = Object.values(entities).filter(e => e instanceof Function);

@Module({
  imports: [TypeOrmModule.forFeature(allEntities)],
  providers: [AdminRepository, NftRepository],
  exports: [AdminRepository, NftRepository],
})
export class AppDbModule { }
