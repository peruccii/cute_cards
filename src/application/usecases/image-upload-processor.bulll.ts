import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';

@Injectable()
@Processor('image-upload-queue')
export class ImageUploadProcessorBull {
  constructor() {}

  @Process('upload')
  async handleUpload(job: Job<{ files: string[] }>) {
    const { files } = job.data;
    return files;
  }
}
