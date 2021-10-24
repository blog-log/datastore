import { Test, TestingModule } from '@nestjs/testing';
import { DocumentServiceFactory } from '../database/database.factory';
import { IDocumentService } from '../database/document.service';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity';

describe('DocumentService', () => {
  let service: DocumentService;
  const mockDocumentService: IDocumentService = {
    create: () => '',
    search: (): Promise<Document[]> => Promise.resolve([]),
    remove: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentService, DocumentServiceFactory],
    })
      .overrideProvider(DocumentServiceFactory)
      .useValue(mockDocumentService)
      .compile();

    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
