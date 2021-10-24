import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { DocumentServiceFactory } from '../database/database.factory';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, DocumentServiceFactory],
})
export class DocumentModule {}
