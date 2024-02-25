/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig, serviceAccount } from 'src/config/firebase.config';
import { FirebaseCollectionTypes } from 'src/shared/interfaces/database.interface';
@Injectable()
export class RtdbService {
    private readonly firebaseApp: admin.app.App;
    private rtdb = this.getDatabase();
    // constructor() {

    // }

    private getAuth() {
        return this.firebaseApp.auth();
    }

    private getDatabase() {
        return admin.database();
    }

    async checkIfExists(id: string, collection: FirebaseCollectionTypes) {
        const snapshot = await this.rtdb.ref(`${collection}/${id}`).once('value');
        const item = snapshot.val();
        console.log(item);
        return item;
    }

    /**
   * Gets all items from the provided Firebase collection.
   * @param collection Name of the Firebase collection to get items from.
   * @returns Promise resolving to an array of all items in the collection.
   */
    async getAllItems(collection: FirebaseCollectionTypes): Promise<any[]> {
        const snapshot = await this.rtdb.ref(collection).once('value');
        const items = snapshot.val();
        return items ? Object.values(items) : [];
    }

    /**
* Gets a single item from the provided Firebase collection by its ID.
*
* @param id - The ID of the item to get.
* @param collection - The name of the Firebase collection to get the item from.
* @returns A promise resolving to the item data if found, or rejecting with NotFoundException if not found.
*/
    async getItem(id: string, collection: FirebaseCollectionTypes): Promise<any> {
        const snapshot = await this.rtdb.ref(`${collection}/${id}`).once('value');
        const item = snapshot.val() || null;

        if (!item) {
            // throw new NotFoundException('Item not found');

        }

        return item;
    }


    /**
* Gets items from the provided Firebase collection filtered by the given field and value.
*
* @param field - The field to filter by.
* @param value - The value to match for the filter.
* @param collection - The name of the Firebase collection to get items from.
* @returns A promise resolving to an array of items matching the filter.
*/
    async getItemsByField(
        field: string,
        value: any,
        collection: FirebaseCollectionTypes,
    ): Promise<any[]> {
        const snapshot = await this.rtdb
            .ref(collection)
            .orderByChild(field)
            .equalTo(value)
            .once('value');
        const items = snapshot.val();
        return items ? Object.values(items) : [];
    }

    /**
* Creates a new item in the provided Firebase collection.
* @param id - The ID of the item to create.
* @param itemDto - The data for the new item to create.
* @param collection - The name of the Firebase collection to create the item in.
* @returns A promise resolving to the created item data, including the generated ID.
*/
    async createItem(
        id: string,
        itemDto: any,
        collection: FirebaseCollectionTypes,
    ): Promise<any> {
        itemDto.id = id;
        const newItemRef = this.rtdb.ref(collection).child(id);
        await newItemRef.set(itemDto);
        return { id: id, ...itemDto };
    }

    /**
* Updates an existing item in the provided Firebase collection.
*
* @param id - The ID of the item to update.
* @param itemDto - The data to update the item with.
* @param collection - The name of the Firebase collection containing the item.
* @returns A promise resolving to the updated item data.
*/
    async updateItem(
        id: string,
        itemDto: any,
        collection: FirebaseCollectionTypes,
    ): Promise<any> {
        const itemRef = this.rtdb.ref(`${collection}/${id}`);

        const snapshot = await itemRef.once('value');
        const existingItem = snapshot.val();

        if (!existingItem) {
            throw new NotFoundException('Item not found');
        }

        await itemRef.set({ ...existingItem, ...itemDto });
        return { id, ...itemDto };
    }

    /**
* Deletes an existing item from the provided Firebase collection.
*
* @param id - The ID of the item to delete.
* @param collection - The name of the Firebase collection containing the item.
* @returns A promise resolving to a message that the item was deleted.
*/
    async deleteItem(
        id: string,
        collection: FirebaseCollectionTypes,
    ): Promise<any> {
        const itemRef = this.rtdb.ref(`${collection}/${id}`);

        const snapshot = await itemRef.once('value');
        const existingItem = snapshot.val();

        if (!existingItem) {
            throw new NotFoundException('Item not found');
        }

        await itemRef.remove();
        return { message: 'Item deleted successfully' };
    }


}
