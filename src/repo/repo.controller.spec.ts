import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
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
      imports: [DatabaseModule.register()],
      controllers: [RepoController],
      providers: [RepoService],
    })
      .overrideProvider(IRepoService)
      .useValue(mockRepoService)
      .compile();

    controller = module.get<RepoController>(RepoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
