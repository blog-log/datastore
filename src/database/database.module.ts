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
import { config } from 'dotenv';

export enum DatabaseType {
  Firebase = 'firebase',
  Typeorm = 'typeorm',
}

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    config();

    switch (process.env.DATABASE_TYPE) {
      case DatabaseType.Firebase:
        return FirebaseModule;
      case DatabaseType.Typeorm:
        return TypeormModule;
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

const TypeormModule: DynamicModule = {
  module: DatabaseModule,
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
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
