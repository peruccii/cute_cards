import { Email } from "./email"

describe('Email test', () => {

    it('should be able to create a email with valid format', () => {
        const email = new Email('email@example.com');
        expect(email).toBeTruthy()
    })

    it('should not be able to create a email with invalid format', () => {
        expect(() => {
            new Email('email.com.st');
        }).toThrow(Error);
    })

    it('should not be able to create a email with more than 55 characters', () => {
        expect(() => {
            new Email('email@example.br'.repeat(56));
        }).toThrow(Error);
    })

    it('should be able to create a email with 0 characters', () => {
        expect(() => {
            new Email('');
        }).toThrow(Error);
    })
})
