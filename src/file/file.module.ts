/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileController } from './controllers/file/file.controller';
import { FileService } from './services/file/file.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${uniqueSuffix}-${file.originalname}`);
                },
            }),
        }),

    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule { }
