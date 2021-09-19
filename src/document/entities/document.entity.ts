import { IsNotEmpty } from 'class-validator';

export class Document {
  @IsNotEmpty()
  public id: string; // uid for document
  @IsNotEmpty()
  public title: string; // user friendly title of document
  @IsNotEmpty()
  public repo: string; // valid git url
  @IsNotEmpty()
  public branch: string; // name of git branch document originates from
  @IsNotEmpty()
  public path: string; // path relative to root of repo to where document is
}
