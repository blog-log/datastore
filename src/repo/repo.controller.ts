import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { RepoService } from './repo.service';
import { CreateRepoDto } from './dto/create-repo.dto';
import { SearchRepoDto } from './dto/search-repo.dto';

@Controller('repo')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Post()
  create(@Body() createRepoDto: CreateRepoDto) {
    return this.repoService.create(createRepoDto);
  }

  @Post('/search')
  search(@Body() searchRepoDto: SearchRepoDto) {
    return this.repoService.search(searchRepoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repoService.remove(id);
  }
}
