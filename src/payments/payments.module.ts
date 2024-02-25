import { Module } from '@nestjs/common';
import { PesapalService } from './pesapal/services/pesapal/pesapal.service';
import { PesapalController } from './pesapal/controllers/pesapal/pesapal.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
    controllers: [PesapalController],
    providers: [PesapalService],
    imports: [HttpModule],
})
export class PaymentsModule { }
