import { IsOptional } from 'class-validator';

export class SearchRepoDto {
  @IsOptional()
  public repos: string[]; // list of valid repos to search for
}
