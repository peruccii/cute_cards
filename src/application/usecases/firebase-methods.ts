import { Email } from '@application/entities/fieldsValidations/email';
import { FirebaseRepository } from '@application/repositories/firebase-repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class Firebase implements FirebaseRepository {
  constructor(private configService: ConfigService) {
    const serviceAccountPath =
      'C:/Users/peruc/Desktop/projects/cute_cards_nestjs/src/application/secrets/serviceAccountKey.json'; // TODO: move to env variable
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        storageBucket: this.configService.get('STORAGE_BUCKET_NAME'),
      });
    }
  }

  async uploadImages(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    const bucket = admin.storage().bucket();

    const urls = await Promise.all(
      files.map(async (file) => {
        const fileName = `${folder}/${Date.now()}_${file.originalname}`;
        const fileRef = bucket.file(fileName);

        await fileRef.save(file.buffer, { contentType: file.mimetype });

        return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      }),
    );

    return urls;
  }

  async delete(emailUser: string) {
    const bucket = admin.storage().bucket();
    bucket.file(emailUser).delete();
  }
}
