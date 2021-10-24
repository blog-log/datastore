import { Test, TestingModule } from '@nestjs/testing';
import { RepoServiceFactory } from '../database/database.factory';
import { IRepoService } from '../database/repo.service';
import { Repo } from './entities/repo.entity';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';

describe('RepoController', () => {
  let controller: RepoController;
  const mockRepoService: IRepoService = {
    create: () => '',
    search: (): Promise<Repo[]> => Promise.resolve([]),
    remove: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepoController],
      providers: [RepoService, RepoServiceFactory],
    })
      .overrideProvider(RepoServiceFactory)
      .useValue(mockRepoService)
      .compile();

    controller = module.get<RepoController>(RepoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
