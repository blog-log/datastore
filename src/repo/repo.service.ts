import { Injectable } from '@nestjs/common';
import { IRepoService } from '../database/repo.service';
import { CreateRepoDto } from './dto/create-repo.dto';
import { SearchRepoDto } from './dto/search-repo.dto';

@Injectable()
export class RepoService {
  constructor(private readonly provider: IRepoService) {}

  async create(createRepoDto: CreateRepoDto) {
    await this.provider.create(createRepoDto);

    return {
      status: 200,
      message: 'success',
      data: createRepoDto,
    };
  }

  async search(searchRepoDto: SearchRepoDto) {
    const data = await this.provider.search(searchRepoDto);

    return {
      status: 200,
      message: 'success',
      data: data,
    };
  }

  async remove(id: string) {
    await this.provider.remove(id);

    return {
      status: 200,
      message: 'success',
      data: {
        id,
      },
    };
  }
}
