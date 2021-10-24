import { CreateDocumentDto } from '../document/dto/create-document.dto';
import { SearchDocumentDto } from '../document/dto/search-document.dto';
import { Document } from '../document/entities/document.entity';

export abstract class IDocumentService {
  abstract create(createRepoDto: CreateDocumentDto);

  abstract search(searchRepoDto: SearchDocumentDto): Promise<Document[]>;

  abstract remove(id: string);
}
