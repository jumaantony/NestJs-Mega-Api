import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { MediaUpload } from './decorators/file-upload.decorators';
import { join } from 'path';
import { writeFileSync } from 'fs';

@ApiTags('Mega File Upload')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @MediaUpload('featureImage')
  public async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.appService.uploadFile(file);
  }
}
