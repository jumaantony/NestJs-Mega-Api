import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

export function MediaUpload(fileFieldName: string) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fileFieldName)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileFieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
