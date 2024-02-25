/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebaseConfig, serviceAccount } from 'src/config/firebase.config';
import { RtdbService } from 'src/firebase/rtdb/rtdb/rtdb.service';
import { FirebaseCollectionTypes } from 'src/shared/interfaces/database.interface';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';
import { createNotification } from 'src/shared/functions/notifications.functions';

@Injectable()
export class AuthService {
    private readonly firebaseApp: admin.app.App;
    private readonly firebaseAuth: admin.auth.Auth;
    constructor(private rtdbService: RtdbService, private jwtService: JwtService) {
        this.firebaseAuth = admin.auth();
    }



    async verifyToken(idToken: string): Promise<any> {
        try {
            const decodedToken = await this.firebaseAuth.verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            throw error;
        }
    }

    /**
   * Generates a JWT token containing the provided payload.
   *
   * @param {any} payload - The data to encode in the JWT token.
   * @returns {Promise<string>} A promise that resolves with the generated JWT token.
   */
    async generateToken(payload: any) {

        return new Promise<string | null>(async (resolve, reject) => {
            const token = await this.jwtService.generateToken(payload);
            // if (!token) {
            //    resolve(null);
            // } 
            resolve(token);
        })

        // return this.firebaseAuth.tok
    }


    /**
   * Gets a user by their email address.
   *
   * @param email - The email address of the user to retrieve.
   * @returns A Promise resolving to the user object if found, or null if not found.
   */
    async getUserByEmail(email: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.rtdbService
                .getItemsByField('email', email, 'users')
                .then((users) => {
                    const user = users[0] || null;
                    resolve(user);
                });
        });
    }

    /**
  * Logs a user in and returns a user object and JWT token.
  *
  * @param payload - The login payload containing the user's email and password.
  * @returns A promise resolving to an object containing the logged-in user and JWT token.
  */
    async login(payload: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const email = payload.email;
            // const password = payload.password;
            const id = payload.id;

            if (!email || !id) {
                resolve({
                    notification: createNotification('error', 'Unable to get email'),
                });
                return;
            }
            const userExists = await this.getUserByEmail(email);
            if (!userExists) {
                resolve({
                    notification: createNotification(
                        'warning',
                        `${email} does not exist in our records`,
                    ),
                });
                return;
            }

            // Promise.all(promises).then((res) => {
            this.generateToken(payload).then((res) => {
                if (!res) {
                    const error: any = new Error('Access Denied');
                    error.statusCode = 401;
                    reject(error);
                }

                const user = userExists || null;
                const token = res;
                const notification = createNotification('success', 'Login Success');
                resolve({ data: user, token, notification });
            });
        });
    }


    /**
* Signs up a new user.
*
* @param payload - The signup payload containing the user's email, password, etc.
* @returns A promise resolving to an object containing the new user object, JWT token, and a notification.
*/
    async signup(payload: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const email = payload.email;
            // if (!email) {
            if (!email || !payload.id) {
                resolve({
                    notification: createNotification('error', 'Unable to get email'),
                });
                return;
            }

            const userExists = await this.getUserByEmail(email);
            if (userExists) {
                resolve({
                    notification: createNotification('warning', 'User already exists'),
                });
                return;
            }

            const promises = [
                this.rtdbService.createItem(payload.id, payload, 'users'),
                this.generateToken(payload),
            ];

            Promise.all(promises).then((res) => {
                const user = res[0] || null;
                const token = res[1] || null;
                const notification = createNotification(
                    'success',
                    'Sign up successful',
                );
                resolve({ data: user, token, notification });
            });
        });
    }

    /**
   * Resets the password for a user with the given email address.
   *
   * @param payload - Object containing the email address of the user to reset the password for.
   * @returns Promise resolving to an object containing:
   * - data - Response from the password reset email sending service.
   * - notification - Notification message about the result of the operation.
   */
    async resetPassword(payload: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const email = payload.email;
            if (!email) {
                resolve({
                    notification: createNotification('error', 'Unable to get email'),
                });
                return;
            }
            const userExists = await this.getUserByEmail(email);
            if (!userExists) {
                resolve({
                    notification: createNotification(
                        'warning',
                        `${email} does not exist in our records`,
                    ),
                });
                return;
            }

            this.sendPasswordResetEmail(email).then((res) => {
                resolve({
                    data: res,
                    notification: createNotification(
                        'success',
                        'Password reset successfully',
                    ),
                });
            });
        });
    }

    checkIfEmailExists(payload: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            let value = true;
            const email = payload.email;
            if (!email) {
                resolve({
                    notification: createNotification('error', 'Unable to get email'),
                });
                return;
            }
            const userExists = await this.getUserByEmail(email);
            if (!userExists) value = false;
            resolve({
                data: value
            });
        });
    }


    private async sendPasswordResetEmail(email: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            const passwordResetLink = await this.firebaseAuth.generatePasswordResetLink(email);
            // send email
            console.log(passwordResetLink);
            resolve(true)
        })
    }


    // signup(payload: any) {
    //     const promises = [
    //         this.registerUser(payload),
    //         this.generateToken(payload)
    //     ]
    // }

    // checkIfUserExists()
}
