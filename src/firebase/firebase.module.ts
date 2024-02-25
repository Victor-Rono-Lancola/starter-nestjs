/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore/firestore/firestore.service';
import { RtdbService } from './rtdb/rtdb/rtdb.service';
import { FirebaseStorageService } from './firebase-storage/firebase-storage/firebase-storage.service';
import { FirebaseService } from './firebase/firebase/firebase.service';
import { RtdbController } from './rtdb/rtdb.controller';
import * as admin from 'firebase-admin';
import { serviceAccount } from 'src/config/firebase.config';
@Module({
  providers: [
    FirestoreService,
    RtdbService,
    FirebaseStorageService,
    FirebaseService,

  ],
  controllers: [RtdbController],
})
export class FirebaseModule { }
