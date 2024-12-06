import { makeInvite } from "@test/factories/invite-factory"
import { Email } from "./fieldsValidations/email"

describe('INVITE TEST', () => {
    it('should be able to create a invite', () => {
        const invite = makeInvite()
        expect(invite).toBeTruthy()
    })

    it('should be not able to create a invite because email is invalid', () => {
        expect(() => {
            makeInvite({ email: new Email('@') })
        }).toThrow(Error)
    })
})
