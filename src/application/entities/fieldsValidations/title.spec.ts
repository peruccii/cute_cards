import { Title } from "./title"

describe('Title test', () => {
    it('should be able to create a title text', () => {
        const title = new Title('This is a title message text.');
        expect(title).toBeTruthy()
    })
})
