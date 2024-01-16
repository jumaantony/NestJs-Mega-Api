import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { MediaUpload } from './decorators/file-upload.decorators';

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

  @Post('download')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
        },
      },
    },
  })
  @Header('Content-Type', 'application/jpeg')
  @Header('Content-Disposition', 'attachment; filename=download.jpeg')
  public async downloadFile(@Body() fileUrlObject: { fileUrl: string }) {
    const data = await this.appService.downloadFile(fileUrlObject);
    const readstream = new StreamableFile(data);
    // console.log(readstream)
    readstream.getHeaders();
    // console.log(readstream.getStream());
    return readstream;
  }
}
