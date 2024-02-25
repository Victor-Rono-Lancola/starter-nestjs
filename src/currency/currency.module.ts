/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './controllers/currency.service';
import { HttpModule } from '@nestjs/axios';
import { RtdbService } from 'src/firebase/rtdb/rtdb/rtdb.service';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, RtdbService],
  imports: [HttpModule],
})
export class CurrencyModule { }
