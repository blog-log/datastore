import { DocumentFirestoreService } from './firestore/document.firestore.service';
import { RepoFirestoreService } from './firestore/repo.firestore.service';
import { IRepoService } from './repo.service';
import { IDocumentService } from './document.service';

export const RepoServiceFactory = {
  provide: IRepoService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? RepoFirestoreService
      : RepoFirestoreService,
};

export const DocumentServiceFactory = {
  provide: IDocumentService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DocumentFirestoreService
      : DocumentFirestoreService,
};
