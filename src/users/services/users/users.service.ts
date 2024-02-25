/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { RtdbService } from 'src/firebase/rtdb/rtdb/rtdb.service';
import { FirebaseCollectionTypes } from 'src/shared/interfaces/database.interface';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
    collection: FirebaseCollectionTypes = 'users';
    constructor(private rtdbService: RtdbService) {

    }

    /**
 * Creates a new user with the given payload. 
 * Generates a UUID for the user ID if not provided.
 * Saves the user to the 'users' collection in Firebase.
*/
    createUser(payload: any) {
        const id = payload.id || v4();
        return this.rtdbService.createItem(id, payload, this.collection);
    }

    /**
     *Gets all user documents from the 'users' collection in Firebase Realtime Database.
     *
     * @return {*} 
     * @memberof UsersService
     */
    getUsers() {
        return this.rtdbService.getAllItems(this.collection);
    }

    /**
     * Gets a user document with the given ID from the 'users' collection in Firebase Realtime Database.
     * @param {string} id
     * @return {*} 
     * @memberof UsersService
     */
    getUserById(id: string) {
        return this.rtdbService.getItem(id, this.collection);
    }

    /**
* Gets user documents from the 'users' collection
* that match the given key-value pair.
*
* @param key The field to query on
* @param value The value to match
* @returns The matching user documents
*/
    getUsersByKey(key: string, value: any) {
        return this.rtdbService.getItemsByField(key, value, this.collection);
    }

    /**
     * Updates a user document with the given ID in the 'users' collection
     * in Firebase Realtime Database, using the provided payload.
     *
     * @param id The ID of the user document to update
     * @param payload The update payload containing fields to update
     * @returns A promise resolving to the updated user document
     */
    updateUser(id: string, payload: any) {
        return this.rtdbService.updateItem(id, payload, this.collection);
    }

    /**
* Deletes the user document with the given ID from the 'users' collection in Firebase Realtime Database.
*
* @param {string} id The ID of the user document to delete
* @returns A promise that resolves when the delete operation is complete
*/
    deleteUser(id: string) {
        return this.rtdbService.deleteItem(id, this.collection);
    }

}
