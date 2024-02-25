/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice/controllers/invoice.controller';
import { InvoiceService } from './invoice/services/invoice.service';
import { FileService } from 'src/file/services/file/file.service';

@Module({
    imports: [],
    controllers: [InvoiceController],
    providers: [InvoiceService, FileService],
})
export class DocumentsModule { }
