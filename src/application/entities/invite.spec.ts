import { makeInvite } from "@test/factories/invite-factory"
import { Email } from "./fieldsValidations/email"
import { UrlMusic } from "./fieldsValidations/url_music"

describe('INVITE TEST', () => {
    it('should be able to create a invite', () => {
        const invite = makeInvite()
        expect(invite).toBeTruthy()
    })

    it('should be not able to create a invite because url_music is invalid', () => {
        expect(() => {
            makeInvite({ url_music: new UrlMusic('@') })
        }).toThrow(Error)
    })
})
