import { TitleLengthError } from '@application/usecases/errors/title-length-error';
import { Title } from './title';

describe('Title test', () => {
  it('should be able to create a title text', () => {
    const title = new Title('This is a title message text.');
    expect(title).toBeTruthy();
  });

  it('should be not able to create a  title with less than 5 characters', () => {
    expect(() => new Title('You.')).toThrow(TitleLengthError);
  });

  it('should be not able to create a  title with more than 307 characters', () => {
    expect(() => new Title('a'.repeat(56))).toThrow(TitleLengthError);
  });
});
