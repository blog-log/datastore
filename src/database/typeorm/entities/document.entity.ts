import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryColumn()
  public id: string; // uid for document
  @Column()
  public title: string; // user friendly title of document
  @Column()
  public repo: string; // valid git url
  @Column()
  public branch: string; // name of git branch document originates from
  @Column()
  public path: string; // path relative to root of repo to where document is
}
