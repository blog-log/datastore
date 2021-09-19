import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { FirestoreService } from '../firestore/firestore.service';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, FirestoreService],
})
export class DocumentModule {}
