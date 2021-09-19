import { Injectable } from '@nestjs/common';
import {
  FirestoreQuery,
  FirestoreService,
} from '../firestore/firestore.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { SearchDocumentDto } from './dto/search-document.dto';

@Injectable()
export class DocumentService {
  private collection = 'pages';

  constructor(private readonly firestoreService: FirestoreService) {}

  async create(createDocumentDto: CreateDocumentDto) {
    const pagesRef = this.firestoreService.client.collection(this.collection);

    await pagesRef.doc(createDocumentDto.id).set(createDocumentDto);

    return {
      status: 200,
      message: 'success',
      data: createDocumentDto,
    };
  }

  async search(searchDocumentDto: SearchDocumentDto) {
    let pagesRef: FirestoreQuery = this.firestoreService.client.collection(
      this.collection,
    );

    if (searchDocumentDto.repos?.length > 0) {
      // repo has value add where clause
      pagesRef = pagesRef.where('repo', 'in', searchDocumentDto.repos);
    }

    const snapshot = await pagesRef.get();
    const data = snapshot.docs.map((doc) => doc.data());

    return {
      status: 200,
      message: 'success',
      data: data,
    };
  }

  async remove(id: string) {
    const pagesRef = this.firestoreService.client.collection(this.collection);

    await pagesRef.doc(id).delete();

    return {
      status: 200,
      message: 'success',
      data: {
        id,
      },
    };
  }
}
