import { IsOptional } from 'class-validator';

export class SearchDocumentDto {
  @IsOptional()
  public repos?: string[]; // list of valid repos to search for
}
