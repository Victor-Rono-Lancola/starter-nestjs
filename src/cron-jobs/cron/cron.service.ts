/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CurrencyService } from 'src/currency/controllers/currency.service';
@Injectable()
export class CronService {
    constructor(private currencyService: CurrencyService) { }

    @Cron(CronExpression.EVERY_5_SECONDS)
    handleCron() {
        // Implement your logic here
    }

    @Cron('0 0 * * *') // Run every day at midnight
    @Cron(CronExpression.EVERY_3_HOURS)
    handleDailyCron() {
        this.currencyService.getExchangeRates();
    }
}
