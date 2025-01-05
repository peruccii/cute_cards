import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ImageUploadProcessorBull } from '@application/usecases/image-upload-processor.bulll';
import { ImageUploadServiceBull } from '@application/usecases/image-upload-service.bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image-upload-queue',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  providers: [ImageUploadServiceBull, ImageUploadProcessorBull],
  exports: [ImageUploadServiceBull],
})
export class ImageUploadModuleBull {}
