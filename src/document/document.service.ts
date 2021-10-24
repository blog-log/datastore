import { Injectable } from '@nestjs/common';
import { IDocumentService } from '../database/document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { SearchDocumentDto } from './dto/search-document.dto';

@Injectable()
export class DocumentService {
  constructor(private readonly provider: IDocumentService) {}

  async create(createDocumentDto: CreateDocumentDto) {
    await this.provider.create(createDocumentDto);

    return {
      status: 200,
      message: 'success',
      data: createDocumentDto,
    };
  }

  async search(searchDocumentDto: SearchDocumentDto) {
    const data = await this.provider.search(searchDocumentDto);

    return {
      status: 200,
      message: 'success',
      data: data,
    };
  }

  async remove(id: string) {
    await this.provider.remove(id);

    return {
      status: 200,
      message: 'success',
      data: {
        id,
      },
    };
  }
}
