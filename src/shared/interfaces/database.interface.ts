/* eslint-disable prettier/prettier */
export interface DatabaseItemInterface {
    // required
    createdBy: string;

    createdAt?: string;
    id: string;
    imageURLs?: string[];
    documentURLs?: string[];
    authorizedUsers?: string[];
    description?: string;
    uniqueId?: string;
    deleted?: boolean;
    deletedBy?: string;
    updatedBy?: string;
    updatedAt?: string;
    status?: DBStatusTypes;
    outOfStock?: boolean;
}

export type DBStatusTypes =
    | 'Active'
    | 'Approved'
    | 'Pending'
    | 'Unavailable'
    | 'Hidden';

export type FirebaseCollectionTypes =
    | 'users'
    | 'products'
    | 'shopping-carts'
    | 'organizations'
    | 'categories'
    | 'orders'
    | 'fuel-vendors'
    | 'fuel-prices'
    | 'countries'
    | 'petrol-stations'
    | 'fuel-depots'
    | 'currency'
    | 'bank-accounts';
