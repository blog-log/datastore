import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
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
    process.env['NODE_ENV'] = 'test';
    process.env['DATABASE_TYPE'] = 'firebase';
    process.env['DATABASE_URI'] = 'fake-db-uri';

    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule.register()],
      providers: [DocumentService],
    })
      .overrideProvider(IDocumentService)
      .useValue(mockDocumentService)
      .compile();

    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
