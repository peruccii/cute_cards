import { SubTitle } from "./subTitle"

describe('SubTitle test', () => {
    it('should be able to create a sub title text', () => {
        const subTitle = new SubTitle('This is a sub title message text.');
        expect(subTitle).toBeTruthy()
    })
})
