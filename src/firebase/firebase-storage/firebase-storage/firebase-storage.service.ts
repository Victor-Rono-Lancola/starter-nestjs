/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { Observable } from 'rxjs';
import { firebaseConfig, serviceAccount } from 'src/config/firebase.config';
import { FirebaseCollectionTypes } from 'src/shared/interfaces/database.interface';
@Injectable()
export class FirebaseStorageService {
    private readonly firebaseApp: admin.app.App;
    private storage = this.getStorage();

    constructor() { }

    private getStorage() {
        return admin.storage().bucket(firebaseConfig.storageBucket).storage.bucket(firebaseConfig.databaseURL);
    }


    // private uploadTask(filePath: string, file: File): Observable<string> {

    //     return new Observable<string>((subscriber) => {
    //         const fileRef = this.storage// Replace with your storage path

    //         const uploadTask = fileRef.put(file);

    //         uploadTask.on(
    //             'state_changed',
    //             snapshot => {
    //                 // Observe state change events such as progress, pause, and resume
    //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                 // console.log('Upload is ' + progress + '% done');

    //                 switch (snapshot.state) {
    //                     case 'paused':
    //                         // console.log('Upload is paused');
    //                         break;
    //                     case 'running':
    //                         // console.log('Upload is running');
    //                         break;
    //                 }
    //             },
    //             error => {
    //                 // Handle unsuccessful uploads
    //                 console.error('Error:', error);
    //             },
    //             () => {
    //                 // Handle successful uploads on complete
    //                 uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
    //                     // console.log('File available at:', downloadURL);
    //                     // Do something with the download URL
    //                     subscriber.next(downloadURL);
    //                 });
    //             }
    //         );
    //     });

    // }
}
