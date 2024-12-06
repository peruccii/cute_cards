import { MessageLengthError } from "@application/usecases/errors/message-length-error";
import { Message } from "./message"

describe('Message test', () => {
    it('should be able to create a message', () => {
        const message = new Message('This is a message text.');
        expect(message).toBeTruthy()
    })

    it('should be not able to create a message with less than 5 characters', () => {
        expect(() => new Message('You.')).toThrow(MessageLengthError);
    })

    it('should be not able to create a message with more than 307 characters', () => {
        expect(() => new Message('a'.repeat(308))).toThrow(MessageLengthError);
    })
})
