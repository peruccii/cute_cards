import { FirebaseRepository } from '@application/repositories/firebase-repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class Firebase implements FirebaseRepository {
  constructor(private configService: ConfigService) {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get('PROJECT_ID'),
          privateKey: this.configService
            .get('PRIVATE_KEY')
            .replace(/\\n/g, '\n'),
          clientEmail: this.configService.get('CLIENT_EMAIL'),
        }),
        storageBucket: this.configService.get('STORAGE_BUCKET_NAME'),
      });
    }
  }

  async uploadImages(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    const bucket = admin.storage().bucket();

    const urls: string[] = await Promise.all(
      files.map(async (file) => {
        const fileName = `${folder}/${Date.now()}_${file.originalname}`;
        const fileRef = bucket.file(fileName);

        await fileRef.save(file.buffer, { contentType: file.mimetype });

        return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      }),
    );

    return urls;
  }

  async delete(slug: string) {
    const bucket = admin.storage().bucket();

    const [files] = await bucket.getFiles({ prefix: slug });

    if (files.length === 0) {
      console.log(`Nenhum arquivo encontrado no diretório: ${slug}`);
      return;
    }

    const deletePromises = files.map((file) => file.delete());
    await Promise.all(deletePromises);
  }

  async getImgUrls(slug: string): Promise<string[]> {
    const bucket = admin.storage().bucket();

    const [files] = await bucket.getFiles({ prefix: slug });

    const urls = files.map((file) => {
      return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    });

    return urls;
  }
}
