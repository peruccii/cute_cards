import { UrlMusicInvalidError } from '@application/usecases/errors/url_music-invalid-error';

export class UrlMusic {
  private readonly url_music: string;

  get value(): string {
    return this.url_music;
  }

  private validateUrlMusic(url_music: string): boolean {
    const urlMusicRegex = /^https:\/\/\S+$/;
    return urlMusicRegex.test(url_music);
  }

  constructor(url_music: string) {
    const isUrlMusicValid = this.validateUrlMusic(url_music);

    if (!isUrlMusicValid) throw new UrlMusicInvalidError();

    this.url_music = url_music;
  }
}
