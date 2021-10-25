import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDocumentService } from './document.service';
import { DocumentFirestoreService } from './firestore/document.service';
import { RepoFirestoreService } from './firestore/repo.service';
import { IRepoService } from './repo.service';
import { DocumentService } from './typeorm/document.service';
import { Document } from './typeorm/entities/document.entity';
import { Repo } from './typeorm/entities/repo.entity';
import { RepoService } from './typeorm/repo.service';
import { DatabaseType, EnvironmentVariables } from '../config/schema';
import { validate } from '../config/validator';
import { DatabaseType as TypeormDatabaseType } from 'typeorm';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const config = validate();

    switch (config.DATABASE_TYPE) {
      case DatabaseType.Firebase:
        return FirebaseModule;
      case DatabaseType.Cockroachdb:
      case DatabaseType.Mongodb:
      case DatabaseType.Mssql:
      case DatabaseType.Mysql:
      case DatabaseType.Postgres:
        return TypeormModule(config);
      default:
        console.error(
          `Database Type ${process.env.DATABASE_TYPE} not supported.`,
        );
        throw new Error('Database Type not supported.');
    }
  }
}

const FirebaseModule: DynamicModule = {
  module: DatabaseModule,
  providers: [
    {
      provide: IRepoService,
      useClass: RepoFirestoreService,
    },
    {
      provide: IDocumentService,
      useClass: DocumentFirestoreService,
    },
  ],
  exports: [IRepoService, IDocumentService],
};

const TypeormModule = (config: EnvironmentVariables): DynamicModule => {
  return {
    module: DatabaseModule,
    imports: [
      TypeOrmModule.forRoot({
        type: config.DATABASE_TYPE as TypeormDatabaseType,
        url: config.DATABASE_URI,
        entities: [Repo, Document],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Repo, Document]),
    ],
    providers: [
      {
        provide: IRepoService,
        useClass: RepoService,
      },
      {
        provide: IDocumentService,
        useClass: DocumentService,
      },
    ],
    exports: [TypeOrmModule, IRepoService, IDocumentService],
  };
};
