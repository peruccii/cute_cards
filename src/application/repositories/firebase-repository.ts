export abstract class FirebaseRepository {
  abstract uploadImages(
    imagesUrl: Express.Multer.File[],
    slug: string,
  ): Promise<string[]>; // custom promise

  abstract delete(slug: string);

  abstract getImgUrls(slug: string): Promise<string[]>;
}
