import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Repo {
  @PrimaryColumn()
  public id: string; // uid for document
  @Column('text', { array: true, nullable: true })
  public warning: string[]; // user warning information
  @Column('text', { array: true, nullable: true })
  public error: string[]; // user error information
}
