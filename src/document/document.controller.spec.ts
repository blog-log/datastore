import { Test, TestingModule } from '@nestjs/testing';
import { IDocumentService } from '../database/document.service';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity';
import { DatabaseModule } from '../database/database.module';

describe('DocumentController', () => {
  let controller: DocumentController;
  const mockDocumentService: IDocumentService = {
    create: () => '',
    search: (): Promise<Document[]> => Promise.resolve([]),
    remove: () => '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule.register()],
      controllers: [DocumentController],
      providers: [DocumentService],
    })
      .overrideProvider(IDocumentService)
      .useValue(mockDocumentService)
      .compile();

    controller = module.get<DocumentController>(DocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
