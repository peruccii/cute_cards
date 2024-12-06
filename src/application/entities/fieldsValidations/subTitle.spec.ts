import { SubTitleLengthError } from "@application/usecases/errors/subtitle-length-error";
import { SubTitle } from "./subTitle"

describe('SubTitle test', () => {
    it('should be able to create a sub title text', () => {
        const subTitle = new SubTitle('This is a sub title message text.');
        expect(subTitle).toBeTruthy()
    })

    it('should be not able to create a sub title with less than 5 characters', () => {
        expect(() => new SubTitle('You.')).toThrow(SubTitleLengthError);
    })

    it('should be not able to create a sub title with more than 307 characters', () => {
        expect(() => new SubTitle('a'.repeat(56))).toThrow(SubTitleLengthError);
    })
})
