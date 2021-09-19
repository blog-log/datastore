import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoController } from './repo.controller';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [RepoController],
  providers: [RepoService, FirestoreService],
})
export class RepoModule {}
