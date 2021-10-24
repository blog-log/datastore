import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRepoDto {
  @IsNotEmpty()
  public id: string; // uid for document
  @IsOptional()
  public warning: string[]; // user warning information
  @IsOptional()
  public error: string[]; // user error information
}
