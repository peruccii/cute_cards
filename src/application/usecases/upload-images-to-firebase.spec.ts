import { makeInvite } from "@test/factories/invite-factory"
import { UploadImagesToFirebase } from "./upload-images-to-firebase"
import { Readable } from "stream";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import * as dotenv from 'dotenv';

describe('FIREBASE UPLOAD IMAGES TEST', () => {

    const mockFile: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'test-image.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: Buffer.from('mock file content'),
        size: 1234,
        destination: 'mock/destination',
        filename: 'mock-filename.png',
        path: 'mock/destination/mock-filename.png',
        stream: Readable.from('mock file content'),
    };

    const mockFile_2: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'test-image_2.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: Buffer.from('mock file content_2'),
        size: 1234,
        destination: 'mock/destination',
        filename: 'mock-filename.png',
        path: 'mock/destination/mock-filename.png',
        stream: Readable.from('mock file content_2'),
    };

    let uploadImage: UploadImagesToFirebase;

    beforeEach(async () => {
        dotenv.config();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UploadImagesToFirebase,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockImplementation((key: string) => {
                            if (key === 'STORAGE_BUCKET_NAME') { // verifica se a key usada em "UploadImagesToFirebase" coincide com essa usado no mock
                                return process.env.STORAGE_BUCKET_NAME;
                            }
                            return null;
                        }),
                    },
                },
            ],
        }).compile();

        uploadImage = module.get<UploadImagesToFirebase>(UploadImagesToFirebase);
    
    });


    it('should be able to upload image(s) to firebase storage', async () => {

        const invite = makeInvite()

        const imagesUrls = await uploadImage.uploadImages([mockFile, mockFile_2], invite.email.value)

        expect(Array.isArray(imagesUrls)).toBe(true);

        expect(imagesUrls).toEqual(
            expect.arrayContaining([expect.stringContaining('storage')])
        );
    })
})
