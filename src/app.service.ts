import { Injectable } from '@nestjs/common';
import { Storage } from 'megajs';

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
      console.log(process.env.MegaEmailAddress);
      const storage = await this.createMegaAdmin();
      const fileStream = await storage.upload(
        {
          name: file.originalname,
          size: file.size,
        },
        file.buffer,
      ).complete;
      return { message: 'Upload complete' };
    } catch (error) {
      throw error;
    }
  }
}
