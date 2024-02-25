/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
    constructor(private currencyService: CurrencyService) { }

    @Get('')
    getCurrency() {
        return this.currencyService.getExchangeRatesFromDB();
    }
}
