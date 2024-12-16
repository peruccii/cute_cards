import { TitleLengthError } from '@application/usecases/errors/title-length-error';

export class Title {
  private readonly title: string;

  get value(): string {
    return this.title;
  }

  private validateTitleLength(title: string): boolean {
    return title.length >= 5 && title.length <= 55;
  }

  constructor(title: string) {
    const isTitleValid = this.validateTitleLength(title);

    if (!isTitleValid) throw new TitleLengthError();

    this.title = title;
  }
}
