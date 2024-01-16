import { Injectable } from '@nestjs/common';
import { File, Storage } from 'megajs';

@Injectable()
export class AppService {
  private createMegaAdmin(): Promise<Storage> {
    return new Promise((resolve, reject) => {
      const storage = new Storage({
        email: process.env.MEGA_EMAIL_ADDRESS,
        password: process.env.MEGA_PASSWORD,
      });

      storage.on('ready', () => {
        resolve(storage);
      });

      storage.on('delete', (err) => {
        reject(err);
      });
    });
  }

  public async uploadFile(file: Express.Multer.File): Promise<any> {
    try {
      const storage = await this.createMegaAdmin();
      const fileStream = await storage.upload(
        {
          name: file.originalname,
          size: file.size,
        },
        file.buffer,
      ).complete;
      const link = await fileStream.link({ key: storage.key });
      console.log('Public link:', link);
      return { message: 'Upload initiated', link };
    } catch (error) {
      throw error;
    }
  }

  public async downloadFile(fileUrlObject: { fileUrl: string }): Promise<any> {
    try {
      // const [url, key] = fileUrl.split('#');
      const file = File.fromURL(fileUrlObject.fileUrl);
      await file.loadAttributes();
      // console.log('file name', file.name)
      // console.log('file size', file.size)
      // console.log('file type', file.type)
      // console.log('file timestamp', file.timestamp)
      console.log(await file.loadAttributes());
      const data = await file.downloadBuffer({
        start: 0,
      });
      // console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }
}
