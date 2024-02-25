import { Body, Controller, Post } from '@nestjs/common';

@Controller('pesapal')
export class PesapalController {
    @Post('')
    initiatePayment(@Body() payload: any) { }
}
