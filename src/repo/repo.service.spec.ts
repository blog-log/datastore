import { Test, TestingModule } from '@nestjs/testing';
import { RepoServiceFactory } from '../database/database.factory';
import { IRepoService } from '../database/repo.service';
import { Repo } from './entities/repo.entity';
import { RepoService } from './repo.service';

describe('RepoService', () => {
  let service: RepoService;
  const mockRepoService: IRepoService = {
    create: () => '',
    search: (): Promise<Repo[]> => Promise.resolve([]),
    remove: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepoService, RepoServiceFactory],
    })
      .overrideProvider(RepoServiceFactory)
      .useValue(mockRepoService)
      .compile();

    service = module.get<RepoService>(RepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
