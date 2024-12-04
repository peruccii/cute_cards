export class Message {
    private readonly message: string

    public get value(): string {
        return this.message;
    }

    private validateMessageLength(message: string): boolean {
        return message.length >= 5 && message.length >= 55;
    }

    constructor(message: string) {
        const isMessageValid = this.validateMessageLength(message)

        if (!isMessageValid) throw new Error("Message length error.");

        this.message = message;
    }
}
