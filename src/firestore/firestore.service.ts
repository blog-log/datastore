import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';

export type FirestoreQuery =
  | FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
  | FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;

@Injectable()
export class FirestoreService {
  public client: Firestore;

  constructor() {
    const app =
      admin.apps[0] ??
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });

    this.client = app.firestore();
  }
}
