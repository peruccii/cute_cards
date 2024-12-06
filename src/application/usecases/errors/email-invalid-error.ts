export class EmailInvalidError extends Error {
    constructor() {
        super('Email is not valid.')
    }
}
