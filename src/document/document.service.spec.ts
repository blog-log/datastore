import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreService } from '../firestore/firestore.service';
import { DocumentService } from './document.service';

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentService, FirestoreService],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
