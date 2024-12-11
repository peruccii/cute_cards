export class ResendSendMailError extends Error {
    constructor() {
        super('Email was not send')
    }
}
