import { IsEnum, IsOptional } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

// for now only support firebase and subset of typeorm dbs
export enum DatabaseType {
  Firebase = 'firebase',
  Mysql = 'mysql',
  Postgres = 'postgres',
  Cockroachdb = 'cockroachdb',
  Mssql = 'mssql',
  Mongodb = 'mongodb',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsEnum(DatabaseType)
  DATABASE_TYPE: DatabaseType;

  @IsOptional() // only required for typeorm db type
  DATABASE_URI: string;
}
