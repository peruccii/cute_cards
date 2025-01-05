import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ImageUploadServiceBull {
  constructor(
    @InjectQueue('image-upload-queue') private readonly imageQueue: Queue,
  ) {}

  async addUploadTask(files: Express.Multer.File[], email: string) {
    const job = await this.imageQueue.add(
      'upload',
      {
        files,
        email,
      },
      {
        attempts: 3,
        backoff: 5000,
        timeout: 1000 * 60 * 60 * 24,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
    return job.id;
  }
}
