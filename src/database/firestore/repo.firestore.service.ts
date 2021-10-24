import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { CreateRepoDto } from 'src/repo/dto/create-repo.dto';
import { SearchRepoDto } from 'src/repo/dto/search-repo.dto';
import { Repo } from 'src/repo/entities/repo.entity';
import { IRepoService } from '../repo.service';

export type FirestoreQuery =
  | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
  | FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;

@Injectable()
export class RepoFirestoreService implements IRepoService {
  private collection = 'repos';
  private client: Firestore;

  constructor() {
    const app =
      admin.apps[0] ??
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });

    this.client = app.firestore();
  }

  async create(createRepoDto: CreateRepoDto) {
    const reposRef = this.client.collection(this.collection);

    await reposRef.doc(createRepoDto.id).set(createRepoDto);

    return;
  }

  async search(searchRepoDto: SearchRepoDto): Promise<Repo[]> {
    let reposRef: FirestoreQuery = this.client.collection(this.collection);

    if (searchRepoDto.repos?.length > 0) {
      // repo has value add where clause
      reposRef = reposRef.where('id', 'in', searchRepoDto.repos);
    }

    const snapshot = await reposRef.get();
    const data: Repo[] = snapshot.docs.map((doc) => doc.data() as Repo);

    return data;
  }

  async remove(id: string) {
    const reposRef = this.client.collection(this.collection);

    await reposRef.doc(id).delete();

    return;
  }
}
