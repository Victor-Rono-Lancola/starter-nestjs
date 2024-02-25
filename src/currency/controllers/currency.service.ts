/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { Observable, take } from 'rxjs';
import { EXCHANGE_RATES_URL } from 'src/config/exchange-rates.config';
import { RtdbService } from 'src/firebase/rtdb/rtdb/rtdb.service';

@Injectable()
export class CurrencyService {
    constructor(private httpService: HttpService, private rtdbService: RtdbService) { }


    /**
* Fetches current exchange rates from an API endpoint and returns them as an Observable.
* The HTTP request is made only once and the result is cached.
* The exchange rates are also saved to the database via the rtdbService.
*/
    getExchangeRates() {
        return new Observable<any>((subscriber) => {
            this.httpService
                .get(EXCHANGE_RATES_URL)
                .pipe(take(1))
                .subscribe({
                    next: (res: any) => {
                        // const currencyConversions = JSON.parse(res.data);
                        // console.log(currencyConversions);

                        subscriber.next(res.data);
                        this.saveExchangeRates(res.data.conversion_rates);
                    },
                    error: (err) => { },
                    complete: () => {
                        subscriber.complete();
                    },
                });
        });
    }



    /**
       * Saves the given exchange rates to the realtime database under the 'conversions' key.
       * Uses the rtdbService to create the item in the database.
       */

    saveExchangeRates(exchangeRates: any) {
        const conversions = 'conversions';
        this.rtdbService
            .createItem(conversions, exchangeRates, 'currency')
            .then((res) => { })
            .catch((err) => {
                console.log(err);
            });
    }


    /**
  * Gets exchange rates from the realtime database.
  * @returns The exchange rates object from the 'conversions' key in the 'currency' collection.
  */
    getExchangeRatesFromDB() {
        return this.rtdbService.getItem('conversions', 'currency');
    }
}
