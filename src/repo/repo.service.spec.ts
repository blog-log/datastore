import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
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
      imports: [DatabaseModule.register()],
      providers: [RepoService],
    })
      .overrideProvider(IRepoService)
      .useValue(mockRepoService)
      .compile();

    service = module.get<RepoService>(RepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
