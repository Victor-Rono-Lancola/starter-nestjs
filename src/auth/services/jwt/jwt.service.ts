/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { RtdbService } from 'src/firebase/rtdb/rtdb/rtdb.service';
import { createNotification } from 'src/shared/functions/notifications.functions';
@Injectable()
export class JwtService {
    constructor(
        private nestJwtService: NestJwtService,
        private rtdbService: RtdbService,
    ) { }
    async generateToken(payload: any): Promise<string | null> {
        return new Promise<string | null>((resolve, reject) => {
            const email = payload.email;
            if (!email || !payload.id) {
                // return error 401
                resolve((null));

                return;
            }
            this.rtdbService.getItem(payload.id, 'users').then(user => {
                if (!user || !user.generateToken) {
                    // return error 401
                    resolve((null));
                    return;
                }

                this.rtdbService.updateItem(payload.id, { generateToken: false }, 'users').then(res => {

                    resolve(this.nestJwtService.sign(payload));
                })
            })

        })
    }



    async verifyToken(token: string) {
        return this.nestJwtService.verify(token);
    }
}
