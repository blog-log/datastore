import { CreateRepoDto } from '../repo/dto/create-repo.dto';
import { SearchRepoDto } from '../repo/dto/search-repo.dto';
import { Repo } from '../repo/entities/repo.entity';

export abstract class IRepoService {
  abstract create(createRepoDto: CreateRepoDto);

  abstract search(searchRepoDto: SearchRepoDto): Promise<Repo[]>;

  abstract remove(id: string);
}
