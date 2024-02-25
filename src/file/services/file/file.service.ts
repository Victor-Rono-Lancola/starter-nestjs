/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { createWriteStream, mkdirSync } from 'fs';
const fs = require('fs');
import * as path from 'path';
import { Readable } from 'stream';
import { PEDEA_BASE_URL } from 'src/shared/data/api.data';
@Injectable()
export class FileService {
    fileUploadsEndpoint = `${PEDEA_BASE_URL}/uploads`;


    /**
     * Uploads a file and returns a promise resolving to the URL of the uploaded file.
     *
     * @param file - The file object from the request.
     * @param data - Any additional data associated with the file.
     * @returns A promise resolving to an object containing the URL of the uploaded file.
     */
    async uploadFile(
        file: Express.Multer.File,
        data: any,
    ): Promise<{ url: string }> {
        return new Promise<{ url: string }>((resolve, reject) => {
            resolve({ url: `${this.fileUploadsEndpoint}/${file.filename}` });
        });
    }


    /**
     * Updates a file by first deleting the existing file at the provided URL,
     * then uploading the new file and data, and returning a promise resolving
     * to the URL of the newly uploaded file.
     *
     * @param fileURLToDelete - The URL of the existing file to delete.
     * @param file - The new file object to upload.
     * @param data - Any additional data to associate with the new file.
     * @returns A promise resolving to an object containing the URL of the newly uploaded file.
     */
    async updateFile(
        fileURLToDelete: string,
        file: Express.Multer.File,
        data: any,
    ): Promise<{ url: string }> {
        return new Promise<{ url: string }>((resolve, reject) => {
            this.deleteFileByURL(fileURLToDelete).then((res) => {
                if (res) {
                    this.uploadFile(file, data).then((uploaded) => {
                        resolve(uploaded);
                    });
                } else {
                    reject('Failed to delete file');
                }
            });
        });
    }

    /**
     * Deletes the file at the provided URL.
     *
     * @param fileUrl - The URL of the file to delete.
     * @returns A promise resolving to a boolean indicating if the file was deleted.
     */
    async deleteFileByURL(fileUrl: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const filePath = this.getFilePath(fileUrl); // Adjust as needed
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err: any) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            } else {
                resolve(false);
            }
        });
    }

    /**
     * Gets the file path on disk for the given file path.
     *
     * @param filePath - The relative path to the file.
     * @returns The absolute file path.
     */

    getFile(filePath: string) {
        const fileURL = join(__dirname, '../../../../', 'uploads', filePath);
        return fileURL;
    }

    private getFilePath(url: string) {
        const filePath = url.replace(`${PEDEA_BASE_URL}`, '');
        return filePath;
    }
}
