import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRepoDto } from '../../repo/dto/create-repo.dto';
import { SearchRepoDto } from '../../repo/dto/search-repo.dto';
import { In, Repository } from 'typeorm';
import { IRepoService } from '../repo.service';
import { Repo } from './entities/repo.entity';

@Injectable()
export class RepoService implements IRepoService {
  constructor(
    @InjectRepository(Repo)
    private repoRepository: Repository<Repo>,
  ) {}

  async create(createRepoDto: CreateRepoDto) {
    await this.repoRepository.save(createRepoDto);
  }

  async search(searchRepoDto: SearchRepoDto): Promise<Repo[]> {
    return await this.repoRepository.find({
      where: { id: In(searchRepoDto.repos) },
    });
  }

  async remove(id: string) {
    await this.repoRepository.delete(id);
  }
}
