import { makeInvite } from "@test/factories/invite-factory"
import { UploadImagesToFirebase } from "./upload-images-to-firebase"
import { Readable } from "stream";

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

    it('should be able to upload image(s) to firebase storage', async () => {

        const uploadService = new UploadImagesToFirebase()

        const invite = makeInvite()

        const imagesUrls = await uploadService.uploadImages([mockFile, mockFile_2], invite.email.value)

        expect(Array.isArray(imagesUrls)).toBe(true);

        expect(imagesUrls).toEqual(
            expect.arrayContaining([expect.stringContaining('storage')])
        );
    })
})
