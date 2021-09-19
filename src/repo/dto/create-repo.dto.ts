import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRepoDto {
  @IsNotEmpty()
  public id: string; // uid for document
  @IsOptional()
  public error: any; // user error information
}
