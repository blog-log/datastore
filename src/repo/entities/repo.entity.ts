import { IsNotEmpty, IsOptional } from 'class-validator';

export class Repo {
  @IsNotEmpty()
  public id: string; // uid for document
  @IsOptional()
  public warning: any; // user warning information
  @IsOptional()
  public error: any; // user error information
}
