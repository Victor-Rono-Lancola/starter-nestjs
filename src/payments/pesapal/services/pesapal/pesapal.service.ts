/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { take } from 'rxjs';
import {
    pesapalConsumerKey,
    pesapalConsumerSecret,
    pesapalAccessTokenURL,
    pesapalIPNURL,
    pesapalSetIPN,
    pesapalBaseUrl,
} from '../../controllers/pesapal/configs/pesapal.config';
import { v4 } from 'uuid';

@Injectable()
export class PesapalService {
    headers: any = null;
    constructor(private httpClient: HttpService) {
        this.getHeaders().then((res) => {
            this.headers = res;
        });
    }

    // initiatePayment(payload: any) { }

    /**
     * Gets the headers required to access Pesapal
     *
     * @return {*}
     * @memberof PesapalService
     */
    getHeaders() {
        return new Promise<any>((resolve, reject) => {
            this.getAccessToken().then((token) => {
                // Headers
                const headers: any = {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    // Add other headers as needed
                };

                resolve(headers);
            });
        });
    }

    getAccessToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const body = {
                consumer_key: pesapalConsumerKey,
                consumer_secret: pesapalConsumerSecret,
            };
            this.httpClient
                .post<any>(pesapalAccessTokenURL, body, { headers: this.headers })
                .pipe(take(1))
                .subscribe({
                    next: (data: any) => {
                        resolve(data.token);
                    },
                    // error: (err) => { },
                });
        });
    }

    registerIpn() {
        return new Promise<any>((resolve, reject) => {
            const body = {
                url: pesapalIPNURL,
                ipn_notification_type: 'GET',
            };

            this.getHeaders().then((headers) => {
                this.httpClient
                    .post<any>(pesapalSetIPN, body, { headers })
                    .pipe(take(1))
                    .subscribe({
                        next: (data) => {
                            console.log(data)
                        },
                        error: (err) => {
                            console.log({ err });
                        },
                    });
            });
        });
    }

    getIpn() {
        const url = pesapalBaseUrl + '/URLSetup/GetIpnList';
        this.getHeaders().then((headers) => {
            this.httpClient
                .get<any>(url, { headers })
                .pipe(take(1))
                .subscribe({
                    next: (data) => {
                        console.log(data);

                    },
                    // error: (err) => { },
                });
        });
    }

    submitOrder(phone: string, amount: string) {
        // let phone_number = phone;

        // if (phone.startsWith('0')) {
        //   phpne_number = ''
        // }

        const body = {
            id: v4(),
            currency: 'UGX',
            amount,
            description: 'Pedea Online payment',
            callback_url: pesapalIPNURL,
            notification_id: '5c9c6e21-2d6f-4ebd-b2da-dde4149fa71c',
            billing_address: {
                // email: organizationEmailsData.billingEmail,
                phone_number: phone,
            },
        };

        this.getHeaders().then((headers) => {
            this.httpClient
                .post<any>(`${pesapalBaseUrl}/Transactions/SubmitOrderRequest`, body, {
                    headers,
                })
                .pipe(take(1))
                .subscribe({
                    next: (data) => {
                        console.log(data);

                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
        });
    }
}
