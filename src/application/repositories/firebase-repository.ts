export abstract class FirebaseRepository {
    abstract uploadImages(imagesUrl: Express.Multer.File[], email: string): Promise<string[]> // custom promise
}
