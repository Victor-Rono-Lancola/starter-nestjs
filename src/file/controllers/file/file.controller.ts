/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join, normalize, resolve } from 'path';
import { FileService } from 'src/file/services/file/file.service';

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: any,
    ): Promise<{ url: string }> {
        // file.filename = this.fileService.createFilePath(undefined, file);
        // file.originalname = this.fileService.createFilePath(undefined, file);
        return this.fileService.uploadFile(file, data);
    }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    updateFile(fileUrlToDelete: string, file: Express.Multer.File, data: any) {
        return this.fileService.updateFile(fileUrlToDelete, file, data);
    }

    @Post('delete')
    @UseInterceptors(FileInterceptor('file'))
    deleteFile(@Body() data: any): Promise<boolean> {
        const url: string = data.url;
        console.log(data);
        return this.fileService.deleteFileByURL(url);
    }

    @Get('uploads/:filePath')
    getFile(@Param('filePath') filePath: string, @Res() res: any) {
        const fileURL = this.fileService.getFile(filePath);
        // Send the file as a response
        return res.sendFile(fileURL);
    }
}
