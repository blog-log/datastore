import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoController } from './repo.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [RepoController],
  providers: [RepoService],
})
export class RepoModule {}
