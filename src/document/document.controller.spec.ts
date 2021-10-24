import { Test, TestingModule } from '@nestjs/testing';
import { IDocumentService } from '../database/document.service';
import { DocumentServiceFactory } from '../database/database.factory';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity';

describe('DocumentController', () => {
  let controller: DocumentController;
  const mockDocumentService: IDocumentService = {
    create: () => '',
    search: (): Promise<Document[]> => Promise.resolve([]),
    remove: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [DocumentService, DocumentServiceFactory],
    })
      .overrideProvider(DocumentServiceFactory)
      .useValue(mockDocumentService)
      .compile();

    controller = module.get<DocumentController>(DocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
