import { Controller, Post, UploadedFile, UseInterceptors, Get, Query, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(@Inject('UPLOAD_SERVICE') private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileName = await this.uploadService.uploadFile(file);
    return { fileName };
  }

  @Get('download')
  async getFileUrl(@Query('fileName') fileName: string) {
    const url = await this.uploadService.getFileUrl(fileName);
    return { url };
  }
}
