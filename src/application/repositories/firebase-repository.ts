export abstract class FirebaseRepository {
    abstract uploadImages(imagesUrl: string[], email: string): Promise<string[]> // custom promise
}
