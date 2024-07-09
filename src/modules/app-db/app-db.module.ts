import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaGalleryRepository } from './repositories';
import * as entities from './entities';

const allEntities = Object.values(entities).filter(e => e instanceof Function);

@Module({
  imports: [TypeOrmModule.forFeature(allEntities)],
  providers: [EvaGalleryRepository],
  exports: [EvaGalleryRepository],
})
export class AppDbModule { }
