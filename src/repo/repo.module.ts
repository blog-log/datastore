import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoController } from './repo.controller';
import { RepoServiceFactory } from '../database/database.factory';

@Module({
  controllers: [RepoController],
  providers: [RepoService, RepoServiceFactory],
})
export class RepoModule {}
