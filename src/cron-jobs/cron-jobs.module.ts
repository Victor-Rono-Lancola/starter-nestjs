/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CronService } from './cron/cron.service';
import { CurrencyService } from 'src/currency/controllers/currency.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { RtdbService } from 'src/firebase/rtdb/rtdb/rtdb.service';

@Module({
  providers: [CronService, CurrencyService, RtdbService],
  imports: [ScheduleModule.forRoot(), HttpModule]

  // imports:[Currency]
})
export class CronJobsModule { }
