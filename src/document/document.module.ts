import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule.register()],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
