import { Injectable } from '@nestjs/common';
import {
  FirestoreQuery,
  FirestoreService,
} from '../firestore/firestore.service';
import { CreateRepoDto } from './dto/create-repo.dto';
import { SearchRepoDto } from './dto/search-repo.dto';

@Injectable()
export class RepoService {
  private collection = 'repos';

  constructor(private readonly firestoreService: FirestoreService) {}

  async create(createRepoDto: CreateRepoDto) {
    const reposRef = this.firestoreService.client.collection(this.collection);

    await reposRef.doc(createRepoDto.id).set(createRepoDto);

    return {
      status: 200,
      message: 'success',
      data: createRepoDto,
    };
  }

  async search(searchRepoDto: SearchRepoDto) {
    let reposRef: FirestoreQuery = this.firestoreService.client.collection(
      this.collection,
    );

    if (searchRepoDto.repos?.length > 0) {
      // repo has value add where clause
      reposRef = reposRef.where('id', 'in', searchRepoDto.repos);
    }

    const snapshot = await reposRef.get();
    const data = snapshot.docs.map((doc) => doc.data());

    return {
      status: 200,
      message: 'success',
      data: data,
    };
  }

  async remove(id: string) {
    const reposRef = this.firestoreService.client.collection(this.collection);

    await reposRef.doc(id).delete();

    return {
      status: 200,
      message: 'success',
      data: {
        id,
      },
    };
  }
}
