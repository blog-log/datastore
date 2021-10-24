import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from '../../document/dto/create-document.dto';
import { SearchDocumentDto } from '../../document/dto/search-document.dto';
import { In, Repository } from 'typeorm';
import { IDocumentService } from '../document.service';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService implements IDocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}
  async create(createDocumentDto: CreateDocumentDto) {
    await this.documentRepository.save(createDocumentDto);
  }
  async search(searchDocumentDto: SearchDocumentDto): Promise<Document[]> {
    return await this.documentRepository.find({
      where: { repo: In(searchDocumentDto.repos) },
    });
  }
  async remove(id: string) {
    await this.documentRepository.delete(id);
  }
}
