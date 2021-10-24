import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { IDocumentService } from '../document.service';
import { CreateDocumentDto } from '../../document/dto/create-document.dto';
import { SearchDocumentDto } from '../../document/dto/search-document.dto';
import { Document } from '../../document/entities/document.entity';

export type FirestoreQuery =
  | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
  | FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;

@Injectable()
export class DocumentFirestoreService implements IDocumentService {
  private collection = 'pages';
  private client: Firestore;

  constructor() {
    const app =
      admin.apps[0] ??
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });

    this.client = app.firestore();
  }

  async create(createDocumentDto: CreateDocumentDto) {
    const pagesRef = this.client.collection(this.collection);

    await pagesRef.doc(createDocumentDto.id).set(createDocumentDto);

    return;
  }

  async search(searchDocumentDto: SearchDocumentDto): Promise<Document[]> {
    let pagesRef: FirestoreQuery = this.client.collection(this.collection);

    if (searchDocumentDto.repos?.length > 0) {
      // repo has value add where clause
      pagesRef = pagesRef.where('repo', 'in', searchDocumentDto.repos);
    }

    const snapshot = await pagesRef.get();
    const data: Document[] = snapshot.docs.map((doc) => doc.data() as Document);

    return data;
  }

  async remove(id: string) {
    const pagesRef = this.client.collection(this.collection);

    await pagesRef.doc(id).delete();

    return;
  }
}
