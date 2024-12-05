import { makeInvite } from "@test/factories/invite-factory"

describe('INVITE TEST', () => {
    it('should be able to create a invite', () => {
        const invite = makeInvite()

        expect(invite).toBeTruthy()
    })
})
