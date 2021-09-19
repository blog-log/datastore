import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreService } from '../firestore/firestore.service';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';

describe('RepoController', () => {
  let controller: RepoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepoController],
      providers: [RepoService, FirestoreService],
    }).compile();

    controller = module.get<RepoController>(RepoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
