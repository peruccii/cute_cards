import { MessageLengthError } from "@application/usecases/errors/message-length-error";

export class Message {
    private readonly message: string

    get value(): string {
        return this.message;
    }

    private validateMessageLength(message: string): boolean {
        return message.length >= 5 && message.length <= 307;
    }

    constructor(message: string) {
        const isMessageValid = this.validateMessageLength(message)

        if (!isMessageValid) throw new MessageLengthError();

        this.message = message;
    }
}
